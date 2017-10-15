export default class Query {

	/**
	 * @source https://www.tutorialspoint.com/sqlite/sqlite_data_types.htm
	 * @returns {{ASC: number, DESK: number, TYPE_INT: string, TYPE_INTEGER: string, TYPE_TINYINT: string, TYPE_SMALLINT: string, TYPE_MEDIUMINT: string, TYPE_BIGINT: string, TYPE_TEXT: string, TYPE_CHAR: string, TYPE_VARCHAR: string, TYPE_CHARACTER: string, TYPE_REAL: string, TYPE_DOUBLE_FLOAT: string, TYPE_DOUBLE: string, TYPE_DOUBLE_PRECISION: string, TYPE_DATETIME: string, TYPE_DATE: string, TYPE_BOOLEAN: string, TYPE_NUMERIC: string, TYPE_DECIMAL: string}}
	 */
	constant () {
		return {
			ASC  : 'ASC',
			DESK : 'DESK',

			TYPE_INT        : 'INT',
			TYPE_INTEGER    : 'INTEGER',
			TYPE_TINYINT    : 'TINYINT',
			TYPE_SMALLINT   : 'SMALLINT',
			TYPE_MEDIUMINT  : 'MEDIUMINT',
			TYPE_BIGINT     : 'BIGINT',

			TYPE_TEXT      : 'TEXT',
			TYPE_CHAR      : 'CHAR',
			TYPE_VARCHAR   : 'VARCHAR',
			TYPE_CHARACTER : 'CHARACTER',

			TYPE_REAL             : 'REAL',
			TYPE_DOUBLE_FLOAT     : 'FLOAT',
			TYPE_DOUBLE           : 'DOUBLE',
			TYPE_DOUBLE_PRECISION : 'DOUBLE PRECISION',

			TYPE_DATETIME : 'DATETIME',
			TYPE_DATE     : 'DATE',
			TYPE_BOOLEAN  : 'BOOLEAN',
			TYPE_NUMERIC  : 'NUMERIC',
			/**
			 * DECIMAL(10,5)
			 */
			TYPE_DECIMAL  : 'DECIMAL',
		}

	}

	createTable (table, fields = {}) {
		let that = this;
		let constant = that.constant();
		let fieldsAr = [];

		Object.keys(fields).map(fieldName => {

			let data = fields[fieldName];

			let field = fieldName +' ';

			data.auto = data.pk && data.auto === undefined ? true : data.auto;

			if (data.pk && data.auto) {
				data.type = constant.TYPE_INTEGER;
			}

			if (data.type) {
				field += data.type + ' ';
			}

			if (data.pk) {
				field += `PRIMARY KEY ${data.auto ? 'AUTOINCREMENT': ''} `;
			}

			if (data.require) {
				field += 'NOT NULL ';
			}

			if (data.unique) {
				field += 'UNIQUE ';
			}

			fieldsAr.push(field);
		});

		return `CREATE TABLE ${table}(${fieldsAr.join(',')});`;

	}

	select (table, fields, where, limit, offset) {
		let text = `SELECT ${fields} FROM ${table} `;

		if (where) {
			text += `WHERE ${where} `;
		}

		if (limit) {
			text += `LIMIT ${limit} `;
		}

		if (offset) {
			text += `LIMIT ${offset} `;
		}

		text += ';';

		return text;
	}

	insertValues (arInsert) {
		const insertSerial = (insert) => {
			return `(${insert.join(',')})`;
		};

		if (Array.isArray(arInsert[0])) {
            return arInsert.map(insertSerial).join(',');
		}

		return insertSerial(arInsert);
	}
}
