export default class Query {

	select(table, fields, where, limit, offset) {
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

	insertValues(fields, arInsert) {
		const insertSerial = (insert) => {
			let res = {};

			fields.forEach((field, inx) => res[field] = insert[inx] || null);

			return res;
		};

		if (Array.isArray(arInsert[0])) {
			return arInsert.map(insertSerial);
		}

		return insertSerial(arInsert);
	}
}
