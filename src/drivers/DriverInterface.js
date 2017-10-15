export default class DriverInterface {
	constructor(params = {}) {}
	/**
	 * Query constants.
	 * @returns {{ASC: string, DESK: string, TYPE_INT: string, TYPE_INTEGER: string, TYPE_TINYINT: string, TYPE_SMALLINT: string, TYPE_MEDIUMINT: string, TYPE_BIGINT: string, TYPE_TEXT: string, TYPE_CHAR: string, TYPE_VARCHAR: string, TYPE_CHARACTER: string, TYPE_REAL: string, TYPE_DOUBLE_FLOAT: string, TYPE_DOUBLE: string, TYPE_DOUBLE_PRECISION: string, TYPE_DATETIME: string, TYPE_DATE: string, TYPE_BOOLEAN: string, TYPE_NUMERIC: string, TYPE_DECIMAL: string}}
	 */
	queryConst() {
		return {
			ASC: '',
			DESK: '',
			TYPE_INT: '',
			TYPE_INTEGER: '',
			TYPE_TINYINT: '',
			TYPE_SMALLINT: '',
			TYPE_MEDIUMINT: '',
			TYPE_BIGINT: '',
			TYPE_TEXT: '',
			TYPE_CHAR: '',
			TYPE_VARCHAR: '',
			TYPE_CHARACTER: '',
			TYPE_REAL: '',
			TYPE_DOUBLE_FLOAT: '',
			TYPE_DOUBLE: '',
			TYPE_DOUBLE_PRECISION: '',
			TYPE_DATETIME: '',
			TYPE_DATE: '',
			TYPE_BOOLEAN: '',
			TYPE_NUMERIC: '',
			TYPE_DECIMAL: '',
		}
	}

	/**
	 * Check database be open
	 * @returns {boolean}
	 */
	isOpen() {
		return false;
	}

	/**
	 * Drop database.
	 * @returns {Promise}
	 */
	drop() {
		return new Promise((ok, bad) => ok(null));
	}

	/**
	 * Init database. If database is empty crete tables
	 *
	 * @param objectTables {object} Object structure tables. When key is name table, values is structure fields.
	 * @returns {Promise}
	 */
	init(objectTables = {}) {
		return new Promise((ok, bad) => ok(null));
	}

	/**
	 * Insert record to database.
	 * @param {string} table Table name
	 * @param {array} fields Array name fields.
	 * @param {array} arInsert Array values
	 * @returns {Promise}
	 */
	insert(table, fields, arInsert) {
		return new Promise((ok, bad) => ok(null));
	}

	/**
	 * Check database have tables.
	 * @returns {Promise}
	 */
	isEmpty() {
		return new Promise((ok, bad) => ok(null));
	}

	/**
	 * Get all record from table
	 * @param {string} table Table name
	 * @returns {Promise}
	 */
	getAll(table) {
		return new Promise((ok, bad) => ok(null));
	}

	/**
	 * Get record by primary key value.
	 * @param {string} table Table name
	 * @param {*} pkValue Primary key value.
	 * @returns {Promise}
	 */
	getByPk(table, pkValue) {
		return new Promise((ok, bad) => ok(null));
	}

	/**
	 * Get record by require index.
	 * @param {string} table Table name
	 * @param {string}indexRequire Name index what be require.
	 * @param {*} indexValue Value index
	 * @returns {Promise}
	 */
	getByRequire(table, indexRequire, indexValue) {
		return new Promise((ok, bad) => ok(null));
	}

	/**
	 * Update or insert record to table.
	 * @param {string} table Table name
	 * @param {object} newFields Object insert or update.
	 * @returns {Promise}
	 */
	upInsert(table, newFields) {
		return new Promise((ok, bad) => ok(null));
	}

	/**
	 * Update record by primary key.
	 * @param {string} table Table name
	 * @param {*} pkValue Primary key value.
	 * @param {object} changeFields Object change fields with new values.
	 * @returns {Promise}
	 */
	updateByPk(table, pkValue, changeFields) {
		return new Promise((ok, bad) => ok(null));
	}

	/**
	 * Remove all records from table
	 * @param {string} table Table name
	 * @returns {Promise}
	 */
	removeAll(table) {
		return new Promise((ok, bad) => ok(null));
	}

	/**
	 * Remove record by primary key.
	 * @param {string} table Table name
	 * @param {*} pkValue Primary key value.
	 * @returns {Promise}
	 */
	removeByPk(table, pkValue) {
		return new Promise((ok, bad) => ok(null));
	}

	/**
	 * Close database.
	 */
	close () {}
}
