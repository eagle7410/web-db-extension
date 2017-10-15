/**
 * Created by igor on 10/13/17.
 */
import QueryBuilder from "./QueryBuilder";
import DriverInterface from "../DriverInterface";

export default class IndexedDb extends DriverInterface {
	constructor(params = {}) {
		super();
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
	 *
	 * @param objectTables {object}
	 * @returns {Promise}
	 */
	init(objectTables) {
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
	 *
	 * @param table {string}
	 * @param setFields {string}
	 * @param where {string| null}
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
	 *
	 * @param table {string}
	 * @param where {string}
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

	close () {
		this._db.close();
		this._db = null;
	}
}
