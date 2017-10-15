import WebSQL from './drivers/web-sql/WebSQL'
import IndexedDb from './drivers/indexed-db/IndexedDb'
import DriverInterface from './drivers/DriverInterface'

/**
 * Class for work this browsers databases.
 * @class
 */
class DBSQL {
	constructor(driver) {
		const that = this;

		let constant = DBSQL.driverConst();

		switch (driver) {
			case constant.WebSQL:
				that._driver = new WebSQL();
				break;
			case constant.IndexedDb:
				that._driver = new IndexedDb();
				break;
			default :
				if (!window.indexedDB) {
					// проверяем существования префикса.
					window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
					// НЕ ИСПОЛЬЗУЙТЕ "var indexedDB = ..." вне функции.
					// также могут отличаться и window.IDB* objects: Transaction, KeyRange и тд
					window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
					window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

					if (!window.indexedDB)
						that._driver = new WebSQL();
					else
						that._driver = new IndexedDb();

				}
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
	 *
	 * @returns {Boolean}
	 */
	isOpen() {
		return this._driver.isOpen;
	}

	/**
	 *
	 * @param params
	 * @returns {Promise}
	 */
	init(params) {
		return this._driver.init(params)
	}


	/**
	 *
	 * @param table {string}
	 * @returns {Promise}
	 */
	dropSafe(table) {
		return this._driver.dropSafe(table);
	}

	/**
	 *
	 * @param table string
	 * @param fields {{fieldName : object,..}| null}
	 * @returns {Promise}
	 */
	createTable(table, fields) {
		this._driver.createTable(table, fields);
	}

	/**
	 *
	 * @param table
	 * @param fields
	 * @param where
	 * @param limit
	 * @param offset
	 * @returns {Promise}
	 */
	select(table, fields, where, limit, offset) {
		return this._driver.select(table, fields, where, limit, offset);
	}

	/**
	 *
	 * @param table {string}
	 * @param fields {object}
	 * @param arInsert {array}
	 *
	 * @returns {Promise}
	 */
	insert(table, fields, arInsert) {
		return this._driver.insert(table, fields, arInsert);
	}

	/**
	 *
	 * @returns {Promise}
	 */
	isEmpty() {
		return this._driver.isEmpty();
	}

	/**
	 *
	 * @param table {string}
	 * @param setFields {object}
	 * @param where {string|null}
	 * @returns {Promise}
	 */
	update(table, setFields, where) {
		return this._driver.upInsert(table, setFields, where)
	}

	remove(table, where) {
		return this._driver.remove(table, where);
	}
}

window.DbSqlClass = WebSQL;

