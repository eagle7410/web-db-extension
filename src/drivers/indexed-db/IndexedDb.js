/**
 * Created by igor on 10/13/17.
 */
import QueryBuilder from "./QueryBuilder";
import DriverInterface from "../DriverInterface";

export default class IndexedDb extends DriverInterface {
	constructor(params = {}) {
		super(params);
		const that = this;

		that._db = null;
		that._isEmpty = null;
		that._query = new QueryBuilder();
		that._dbParams = {
			name: 'web_db',
			version: 1,
		};

		that._dbParams = {...that._dbParams, ...params};
	}

	/**
	 *
	 * @returns {boolean}
	 */
	isOpen() {
		return Boolean(this._db !== null);
	}

	/**
	 * Drop database.
	 * @returns {Promise}
	 */
	drop() {
		let that = this;

		return new Promise((ok, bad) => {
			let req = window.indexedDB.deleteDatabase(that._dbParams.name);
			req.onsuccess = ok;
			req.onerror = () => bad("Couldn't delete database");
			req.onblocked = () => ok;
		})
	}

	_modeRewrite () {
		return 'readwrite';
	}

	/**
	 * Init database. If database is empty crete tables
	 *
	 * @param objectTables {object} Object structure tables. When key is name table, values is structure fields.
	 * @returns {Promise}
	 */
	init(objectTables = {}) {
		const that = this;

		return new Promise((ok, bad) => {
			const that = this;

			const req = window.indexedDB.open(that._dbParams.name, that._dbParams.version);

			req.onerror = bad;

			req.onupgradeneeded = function (event) {
				let db = event.target.result;

				Object.keys(objectTables || {}).forEach(table => {
					that._createTable(db, table, objectTables[table]);
				})
			};

			req.onsuccess = function (event) {
				that._db = event.target.result;
				that._isEmpty = Boolean(!that._db.objectStoreNames.length);
				that._db.onerror = bad;
				ok();
			};
		})
	}

	/**
	 *
	 * @param db
	 * @param table
	 * @param fields
	 * @private
	 */
	_createTable(db, table, fields) {
		let that = this;
		let fieldsIndexs = [];
		let store;

		Object.keys(fields).map(fieldName => {

			let data = fields[fieldName];

			let field = fieldName + ' ';

			data.auto = data.pk && data.auto === undefined ? true : data.auto;

			if (data.pk) {
				store = db.createObjectStore(table, {keyPath: fieldName});
			} else if (data.require) {
				fieldsIndexs[fieldName + '_inx'] = {field: fieldName};
			}

			if (data.unique) {
				fieldsIndexs[fieldName + '_uni'] = {
					field: fieldName,
					index: {unique: true}
				};
			}

		});

		if (!store) {
			store = db.createObjectStore(table);
		}

		Object.keys(fieldsIndexs).map(indexName => {
			let data = fieldsIndexs[indexName];
			store.createIndex(indexName, data.field, data.index);
		});
	}

	/**
	 * Insert record to database.
	 * @param {string} table Table name
	 * @param {array} fields Array name fields.
	 * @param {array} arInsert Array values
	 * @returns {Promise}
	 */
	insert(table, fields, arInsert) {
		let that = this;

		return new Promise((ok, bad) => {

			if (!arInsert.length) return ok();
			let arObjInsert = that._query.insertValues(fields, arInsert);

			let transaction = that._db.transaction(table, that._modeRewrite());
			let store = transaction.objectStore(table);

			if (Array.isArray(arObjInsert)) {
				arObjInsert.forEach(insert => store.add(insert));
			} else {
				store.add(arObjInsert);
			}

			transaction.oncomplete = ok;

			transaction.onerror = bad;

		})
	}

	/**
	 *
	 * @returns {Promise}
	 */
	isEmpty() {
		let that = this;
		return new Promise((ok, bad) => ok(that._isEmpty));
	}
	/**
	 * Get all record from table
	 * @param {string} table Table name
	 * @returns {Promise}
	 */
	getAll(table) {
		let that = this;

		return new Promise((ok, bad) => {

			let transaction = that._db.transaction(table);
			let store = transaction.objectStore(table);

			let request = store.getAll();
			request.onerror = bad;
			request.onsuccess = () => ok(request.result);
		});
	}

	/**
	 * Get record by primary key value.
	 * @param {string} table Table name
	 * @param {*} pkValue Primary key value.
	 * @returns {Promise}
	 */
	getByPk(table, pkValue) {
		let that = this;

		return new Promise((ok, bad) => {

			let transaction = that._db.transaction(table);
			let store = transaction.objectStore(table);

			let request = store.get(pkValue);
			request.onerror = bad;
			request.onsuccess = () => ok(request.result);
		});
	}

	/**
	 * Get record by require index.
	 * @param {string} table Table name
	 * @param {string}indexRequire Name index what be require.
	 * @param {*} indexValue Value index
	 * @returns {Promise}
	 */
	getByRequire(table, indexRequire, indexValue) {
		let that = this;

		return new Promise((ok, bad) => {

			let transaction = that._db.transaction(table);
			let store = transaction.objectStore(table);
			let index = store.index(indexRequire + '_inx');

			let request = index.get(indexValue);
			request.onerror = bad;
			request.onsuccess = () => ok(request.result);
		});
	}

	/**
	 * Update or insert record to table.
	 * @param {string} table Table name
	 * @param {object} newFields Object insert or update.
	 * @returns {Promise}
	 */
	upInsert(table, newFields) {
		let that = this;

		return new Promise((ok, bad) => {

			let transaction = that._db.transaction(table, that._modeRewrite());
			let store = transaction.objectStore(table);

			let request = store.put(newFields);
			request.onerror = bad;
			request.onsuccess = () => ok(request.result);
		});
	}

	/**
	 * Update record by primary key.
	 * @param {string} table Table name
	 * @param {*} pkValue Primary key value.
	 * @param {object} changeFields Object change fields with new values.
	 * @returns {Promise}
	 */
	updateByPk(table, pkValue, changeFields) {
		let that = this;

		return new Promise((ok, bad) => {
			that.getByPk(table, pkValue)
				.then(old => that.upInsert(table, {...old, ...changeFields}))
				.then(ok)
				.catch(bad);
		});
	}

	/**
	 * Remove all records from table
	 * @param {string} table Table name
	 * @returns {Promise}
	 */
	removeAll(table) {
		let that = this;

		return new Promise((ok, bad) => {

			let transaction = that._db.transaction(table, that._modeRewrite());
			let store = transaction.objectStore(table);

			let request = store.clear();
			request.onerror = bad;
			request.onsuccess = () => ok(request.result);
		});
	}
	/**
	 * Get record by primary key value.
	 * @param {string} table Table name
	 * @param {*} pkValue Primary key value.
	 * @returns {Promise}
	 */
	removeByPk(table, pkValue) {
		let that = this;

		return new Promise((ok, bad) => {

			let transaction = that._db.transaction(table, that._modeRewrite());
			let store = transaction.objectStore(table);

			let request = store.delete(pkValue);
			request.onerror = bad;
			request.onsuccess = () => ok(request.result);
		});
	}

	/**
	 * Close database.
	 */
	close () {
		this._db.close();
		this._db = null;
	}
}
