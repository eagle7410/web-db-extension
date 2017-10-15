export default class DriverInterface {
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
	isOpen() {}
	init() {}
	dropSafe (table) {}
	createTable(table, fields = {}) {}
	select (table, fields, where, limit, offset) {}
	insert(table, fields, arInsert) {}
	isEmpty () {}
	upInsert (table, setFields, where) {}
	remove (table, where) {}
}
