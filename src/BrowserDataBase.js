import WebSQL from './drivers/web-sql/WebSQL'
import IndexedDb from './drivers/indexed-db/IndexedDb'
import DriverInterface from './drivers/DriverInterface'

/**
 * Class for work this browsers databases.
 * @class
 */
class BrowserDataBaseClass {
	constructor(params = {}, driver) {
		const that = this;

		let constant = BrowserDataBaseClass.driverConst();

		switch (driver) {
			case constant.WebSQL:
				that._driver = new WebSQL(params);
				break;
			case constant.IndexedDb:
				that._driver = new IndexedDb(params);
				break;
			default :
				if (!window.indexedDB) {
					// проверяем существования префикса.
					window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
					// НЕ ИСПОЛЬЗУЙТЕ "var indexedDB = ..." вне функции.
					// также могут отличаться и window.IDB* objects: Transaction, KeyRange и тд
					window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
					window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

				}

				if (!window.indexedDB)
					that._driver = new WebSQL(params);
				else
					that._driver = new IndexedDb(params);
		}

		if (!(that._driver instanceof DriverInterface)) {
			throw new Error('Bad database driver');
		}

	}

	/**
	 * Constant drivers.
	 * @returns {{WebSQL : int, IndexedDb: int}}
	 */
	static driverConst() {
		return {
			...{
				WebSQL: 1,
				IndexedDb: 2
			}
		};
	}

	/**
	 * Query constants.
	 * @returns {{ASC: string, DESK: string, TYPE_INT: string, TYPE_INTEGER: string, TYPE_TINYINT: string, TYPE_SMALLINT: string, TYPE_MEDIUMINT: string, TYPE_BIGINT: string, TYPE_TEXT: string, TYPE_CHAR: string, TYPE_VARCHAR: string, TYPE_CHARACTER: string, TYPE_REAL: string, TYPE_DOUBLE_FLOAT: string, TYPE_DOUBLE: string, TYPE_DOUBLE_PRECISION: string, TYPE_DATETIME: string, TYPE_DATE: string, TYPE_BOOLEAN: string, TYPE_NUMERIC: string, TYPE_DECIMAL: string}}
	 */
	queryConst() {
		return this._driver.queryConst();
	}

	/**
	 * Check database be open
	 * @returns {boolean}
	 */
	isOpen() {
		this._driver.isOpen();
	}

	/**
	 * Drop database.
	 * @returns {Promise}
	 */
	drop() {
		this._driver.drop();
	}

	/**
	 * Init database. If database is empty crete tables
	 *
	 * @param objectTables {object} Object structure tables. When key is name table, values is structure fields.
	 * @returns {Promise}
	 */
	init(objectTables = {}) {
		return this._driver.init(objectTables);
	}

	/**
	 * Insert record to database.
	 * @param {string} table Table name
	 * @param {array} fields Array name fields.
	 * @param {array} arInsert Array values
	 * @returns {Promise}
	 */
	insert(table, fields, arInsert) {
		return this._driver.insert(table, fields, arInsert);
	}

	/**
	 * Check database have tables.
	 * @returns {Promise}
	 */
	isEmpty() {
		return this._driver.isEmpty();
	}

	/**
	 * Get all record from table
	 * @param {string} table Table name
	 * @returns {Promise}
	 */
	getAll(table) {
		return this._driver.getAll(table);
	}

	/**
	 * Get record by primary key value.
	 * @param {string} table Table name
	 * @param {*} pkValue Primary key value.
	 * @returns {Promise}
	 */
	getByPk(table, pkValue) {
		return this._driver.getByPk(table, pkValue);
	}

	/**
	 * Get record by require index.
	 * @param {string} table Table name
	 * @param {string}indexRequire Name index what be require.
	 * @param {*} indexValue Value index
	 * @returns {Promise}
	 */
	getByRequire(table, indexRequire, indexValue) {
		return this._driver.getByRequire(table, indexRequire, indexValue);
	}

	/**
	 * Update or insert record to table.
	 * @param {string} table Table name
	 * @param {object} newFields Object insert or update.
	 * @returns {Promise}
	 */
	upInsert(table, newFields) {
		return this._driver.upInsert(table, newFields);
	}

	/**
	 * Update record by primary key.
	 * @param {string} table Table name
	 * @param {*} pkValue Primary key value.
	 * @param {object} changeFields Object change fields with new values.
	 * @returns {Promise}
	 */
	updateByPk(table, pkValue, changeFields) {
		return this._driver.updateByPk(table, pkValue, changeFields);
	}

	/**
	 * Remove all records from table
	 * @param {string} table Table name
	 * @returns {Promise}
	 */
	removeAll(table) {
		return this._driver.removeAll(table);
	}

	/**
	 * Remove record by primary key.
	 * @param {string} table Table name
	 * @param {*} pkValue Primary key value.
	 * @returns {Promise}
	 */
	removeByPk(table, pkValue) {
		return this._driver.removeByPk(table, pkValue);
	}

	/**
	 * Close database.
	 */
	close() {
		this._driver.close()
	}
}

window.BrowserDataBaseClass = BrowserDataBaseClass;

