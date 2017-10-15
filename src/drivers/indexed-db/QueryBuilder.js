export default class Query {
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
