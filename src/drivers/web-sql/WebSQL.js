import QueryBuilder from "./QueryBuilder";
import DriverInterface from "../DriverInterface";

export default class WebSQL extends DriverInterface {
	constructor(params = {}) {
		super(params);

		const that = this;
		that._db = null;
		that._query = new QueryBuilder();
		that._tx = null;
		that._pks = {};
		that._tablesStruct = {};

		that._dbParams = {
			name: 'web_db',
			version: 1,
			nameDisplay: 'Database in browser',
			prevSize: 200000,
			...params
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
	 * Init database. If database is empty crete tables
	 *
	 * @param objectTables {object} Object structure tables. When key is name table, values is structure fields.
	 * @returns {Promise}
	 */
	init(objectTables = {}) {
		const that = this;

		return new Promise((ok, bad) => {

			that._collectPkFieldsAndTablesStruct(objectTables);

			that._db = openDatabase(
				that._dbParams.name,
				'0.0.' + that._dbParams.version,
				that._dbParams.nameDisplay,
				that._dbParams.prevSizes
			);

			if (!that._db) {
				return bad('Database not create');
			}

			that._db.transaction(tx => {
				that._tx = tx;

				that.isEmpty()
					.then(isEmpty => {

						if (!isEmpty) {
							return ok(that);
						}

						const createTables = async () => {
							try {

								Object.keys(objectTables).forEach(async (table) => {
									await that._createTable(table, objectTables[table])
								})


							} catch (e) {
								bad(e);
							}

							ok();
						};

						createTables();
					})
					.catch(bad);

			})
		})
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

			that._tx.executeSql(
				`INSERT INTO "${table}" (${fields.join(',')}) VALUES ${that._query.insertValues(arInsert, fields)}`,
				[],
				(tx, res) => ok(res),
				(tx, err) => bad(err)
			);
		})

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
			let pk = that._pks[table];

			if (!pk) {
				return bad(`Table "${table}" not have primary key.`);
			}

			that._select(table, '*', `${pk} = ${that._query.escapeFieldValue(pkValue)}`, 1)
				.then((res) => ok(res.length ? res[0] : null), bad);

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
			that._select(table, '*', `${indexRequire} = ${that._query.escapeFieldValue(indexValue)}`, 1)
				.then((res) => ok(res.length ? res[0] : null), bad);
		});
	}

	/**
	 * Get all record from table
	 * @param {string} table Table name
	 * @returns {Promise}
	 */
	getAll(table) {
		let that = this;

		return new Promise((ok, bad) => {
			that._select(table, '*').then(ok, bad);
		});
	}

	/**
	 *
	 * @returns {Promise}
	 */
	isEmpty() {
		let that = this;

		return new Promise((ok, bad) => {
			that._select('sqlite_master', '*', 'type="table" AND name NOT IN ("__WebKitDatabaseInfoTable__", "sqlite_sequence")', 1)
				.then(rows => ok(Boolean(!rows.length)))
				.catch(err => bad(err));
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
			let pk = that._pks[table];

			if (!pk) {
				return bad(`Table "${table}" not have primary key.`);
			}

			that._update(table, changeFields, `${pk} = ${that._query.escapeFieldValue(pkValue)}`)
				.then(ok, bad);

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
			let pk = that._pks[table];

			if (!pk) {
				return bad(`Table "${table}" not have primary key.`);
			}

			that.getByPk(table, newFields[pk])
				.then(res => {
					let fields = that._tablesStruct[table];

					if (res !== null) {

						for (let field of fields) {
							newFields[field] = newFields[field] || null;
						}

						return that.updateByPk(table, newFields[pk], newFields)
					}

					let values = [];

					for (let field of fields) {
						values.push(newFields[field] || null);
					}

					return that.insert(table, fields, values)

				})
				.then(ok)
				.catch(bad);
		});
	}

	/**
	 *
	 * @param {string} table Table name
	 * @param {*} pkValue Primary key value.
	 * @returns {Promise}
	 */
	removeByPk(table, pkValue) {
		let that = this;

		return new Promise((ok, bad) => {
			let pk = that._pks[table];

			if (!pk) {
				return bad(`Table "${table}" not have primary key.`);
			}

			that._remove(table, `${pk} = ${that._query.escapeFieldValue(pkValue)}`)
				.then(ok, bad)
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
			that._remove(table)
				.then(ok, bad);
		});
	}

	/**
	 * Drop database.
	 * @returns {Promise}
	 */
	drop() {
		let that = this;

		return new Promise((ok, bad) => {
			// empty string means: I do not care what version, desc, size the db is
			let db;

			db = openDatabase(
				that._dbParams.name,
				'0.0.' + that._dbParams.version,
				that._dbParams.nameDisplay,
				that._dbParams.prevSizes
			);

			function error(tx, err) {
				bad(err);
			}

			db.transaction(ts => {
				ts.executeSql(
					that._query.select('sqlite_master', '*', 'type="table" AND name NOT IN ("__WebKitDatabaseInfoTable__", "sqlite_sequence")'),
					[],
					(tx, res) => {
						if (!res.rows || !res.rows.length) {
							return ok();
						}

						let removeTables = async () => {
							try {
								for (let i = 0; i < res.rows.length; ++i) {
									let tableInfo = res.rows.item(i);

									if (tableInfo.type !== 'table') continue;

									await that._dropSafe(tableInfo.name, ts);
								}

								ok();
							} catch (e) {
								console.log('Err', e);
								bad(e);
							}
						};

						removeTables();
					},
					(tx, err) => bad(err)
				);
			});

		});
	}

	/**
	 * Select form table.
	 *
	 * @param {string} table
	 * @param fields
	 * @param where
	 * @param limit
	 * @param offset
	 * @returns {Promise}
	 * @private
	 */
	_select(table, fields, where, limit, offset) {
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
	 * Create table.
	 * @param table
	 * @param fields
	 * @returns {Promise}
	 * @private
	 */
	_createTable(table, fields = {}) {
		let that = this;

		return new Promise((ok, bad) => {

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
	 * @param tx
	 * @returns {Promise}
	 * @private
	 */
	_dropSafe(table, tx) {
		tx = tx || this._tx;

		return new Promise((ok, bad) => {
			tx.executeSql(
				`DROP TABLE IF EXISTS "${table}"`,
				[],
				() => ok(),
				(tx, err) => bad(err)
			);
		});
	}

	/**
	 *
	 * @param objectTables {object} Object structure tables. When key is name table, values is structure fields.
	 * @private
	 */
	_collectPkFieldsAndTablesStruct(objectTables) {
		const that = this;

		for (let table in objectTables) {

			that._tablesStruct[table] = [];

			for (let field in objectTables[table]) {

				that._tablesStruct[table].push(field);

				if (objectTables[table][field].pk) {
					that._pks[table] = field;
				}
			}
		}
	}

	/**
	 * Update table
	 * @param table
	 * @param setFields
	 * @param where
	 * @returns {Promise}
	 * @private
	 */
	_update(table, setFields, where) {
		let that = this;
		let updateString = Object.keys(setFields).map(
			field => `${field} = ${that._query.escapeFieldValue(setFields[field])}`
		).join(',');

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
	 * @param table
	 * @param where
	 * @returns {Promise}
	 * @private
	 */
	_remove(table, where) {
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


