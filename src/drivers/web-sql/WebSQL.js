import QueryBuilder from "./QueryBuilder";
import DriverInterface from "../DriverInterface";

export default class WebSQL extends DriverInterface {
	constructor() {
		super();

		const that = this;
		that._db = null;
		that._query = new QueryBuilder();
		that._tx = null;
		that._dbParams = {
			name: 'web_db',
			version: 1,
			nameDisplay: 'Database in browser',
			prevSize: 200000,
		};
	}

	/**
	 *
	 * @returns {{ASC: number, DESK: number, TYPE_INT: string, TYPE_INTEGER: string, TYPE_TINYINT: string, TYPE_SMALLINT: string, TYPE_MEDIUMINT: string, TYPE_BIGINT: string, TYPE_TEXT: string, TYPE_CHAR: string, TYPE_VARCHAR: string, TYPE_CHARACTER: string, TYPE_REAL: string, TYPE_DOUBLE_FLOAT: string, TYPE_DOUBLE: string, TYPE_DOUBLE_PRECISION: string, TYPE_DATETIME: string, TYPE_DATE: string, TYPE_BOOLEAN: string, TYPE_NUMERIC: string, TYPE_DECIMAL: string}}
	 */
	queryConst() {
		return this._query.constant()
	}

	/**
	 *
	 * @returns {boolean}
	 */
	isOpen() {
		return Boolean(this._db !== null);
	}

	/**
	 *
	 * @param params
	 * @returns {Promise}
	 */
	init(params = {}) {
		const that = this;

		let option = {...that._dbParams, ...params};

		return new Promise((ok, bad) => {
			that._db = openDatabase(
				option.name,
				'0.0.' + option.version,
				option.nameDisplay,
				option.prevSizes
			);

			if (!that._db) {
				return bad('Database not create');
			}

			that._db.transaction(tx => {
				that._tx = tx;
				ok(that);
			})

		})
	}

	/**
	 *
	 * @param table {string}
	 * @returns {Promise}
	 */
	dropSafe(table) {
		let that = this;

		return new Promise((ok, bad) => {
			this._tx.executeSql(
				`DROP TABLE IF EXISTS "${table}"`,
				[],
				() => ok(),
				(tx, err) => bad(err)
			);
		});
	}

	/**
	 *
	 * @param table string
	 * @param fields {{fieldName : object,..}| null}
	 * @returns {Promise}
	 */
	createTable(table, fields = {}) {
		let that = this;

		return new Promise((ok, bad) => {

			if (!table) {
				return bad('No table name');
			}

			that._tx.executeSql(
				that._query.createTable(table, fields),
				[],
				(tx, res) => ok(res),
				(tx, err) => bad(err)
			);
		});
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
		let that = this;

		return new Promise((ok, bad) => {
			that._tx.executeSql(
				that._query.select(table, fields, where, limit, offset),
				[],
				(tx, res) => {
					let result = [];

					if (!res.rows) return [];

					let rows = res.rows;

					for (let i = 0; i < rows.length; ++i)
						result.push(rows.item(i));

					ok(result);
				},
				(tx, err) => bad(err)
			);
		});
	}

	/**
	 *
	 * @param table {string}
	 * @param fields {string}
	 * @param arInsert {array}
	 * @returns {Promise}
	 */
	insert(table, fields, arInsert) {
		let that = this;

		return new Promise((ok, bad) => {

			if (!arInsert.length) return ok();

			that._tx.executeSql(
				`INSERT INTO "${table}" (${fields.join(',')}) VALUES ${that._query.insertValues(arInsert)}`,
				[],
				(tx, res) => ok(res),
				(tx, err) => bad(err)
			);
		})

	}

	/**
	 *
	 * @returns {Promise}
	 */
	isEmpty() {
		let that = this;

		return new Promise((ok, bad) => {
			that.select('sqlite_master', '*', 'type="table" AND name NOT IN ("__WebKitDatabaseInfoTable__", "sqlite_sequence")', 1)
				.then(rows => {
					// TODO: clear
					console.log('rows', rows);
					ok(Boolean(!rows.length))
				})
				.catch(err => bad(err));
		});

	}

	/**
	 *
	 * @param table {string}
	 * @param setFields {string}
	 * @param where {string| null}
	 * @returns {Promise}
	 */
	upInsert(table, setFields, where) {
		let that = this;
		let updateString = Object.keys(setFields).map(field => `${field} = ${setFields[field]}`).join(',');

		updateString = `UPDATE ${table} SET ${updateString}`;

		if (where) updateString += ` WHERE ${where}`;

		return new Promise((ok, bad) => {
			that._tx.executeSql(
				updateString,
				[],
				(tx, res) => ok(res),
				(tx, err) => bad(err)
			);
		});
	}

	/**
	 *
	 * @param table {string}
	 * @param where {string}
	 * @returns {Promise}
	 */
	remove(table, where) {
		let that = this;
		let deleteString = `DELETE FROM ${table}`;

		if (where) deleteString += ' WHERE ' + where;

		return new Promise((ok, bad) => {
			that._tx.executeSql(
				deleteString,
				[],
				(tx, res) => ok(res),
				(tx, err) => bad(err)
			);
		});
	}
}


