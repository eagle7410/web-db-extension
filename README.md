# web-db-extension
Database in browser.

### Script for include ./dist/brower.database.min.js 
Example file in ./dist/index.html

### Install by bower
```
bower install web-db-extension
```
### Install by npm 
```
npm install web-db-extension --save
```
### Api 
[Api description](https://github.com/eagle7410/web-db-extension/blob/master/Api.md)

### Example:
```js
let count = 0;

let doit = async (db, $setTo) => {

	let setResult = (selector, mess, isOk, noCount) => {

		let $block = $setTo.find(selector);

		$block
			.text(mess)
			.addClass(isOk ? 'success' : 'error');

		if (!noCount)
			$block.before($('<b/>', {
				text: `TEST #${++count}`,
				class: 'test_number'
			}));
	};

	let constant = db.queryConst();

	let fieldsTableTets = {
		id: {
			type: constant.TYPE_INT,
			pk: {
				order: constant.ASC
			}
		},
		text: {
			type: constant.TYPE_TEXT,
			require: true,
			unique: true
		},
		comment: {
			type: constant.TYPE_CHAR + '(20)'
		}
	};

	const arInsert = [[1, 'text1'], [2, 'text2', 'ZZZ']];

	let isOK, res, isEmpty;

	try {
		await db.drop();

		await db.init({test: fieldsTableTets});

		setResult('.connect_status', 'CONNECT OK', true);

		isEmpty = await db.isEmpty();

		setResult('.db_empty', 'DATABASE IS EMPTY ' + (isEmpty ? 'YES' : 'NO'), !isEmpty);

		await db.insert('test', ['id', 'text', 'comment'], arInsert);

		setResult('.insert_to_test_table', 'INSERT INTO `test`', true);

		res = await db.getByPk('test', 1);
		isOK = res.id === 1 && res.text === 'text1' && res.comment === null;

		setResult('.get_by_pk', `GET BY PK ${isOK ? 'OK' : 'NO' }`, isOK);

		res = await db.getByRequire('test', 'text', 'text2');
		isOK = res.id === 2 && res.text === 'text2' && res.comment === 'ZZZ';

		setResult('.get_by_require', `GET BY REQUIRE INDEX ${isOK ? 'OK' : 'NO' }`, isOK);

		res = await db.getAll('test');

		if (!res || !res.length) throw new Error('Empty table after insert');

		let sumIds = res.reduce((prev, next) => (prev.id || 0) + (next.id || 0));
		isOK = sumIds === 3;
		setResult('.get_all', `GET ALL ${isOK ? 'OK' : 'NO' }`, isOK);

		await db.updateByPk('test', 1, {comment: 'UPDATE'});
		res = await db.getByPk('test', 1);
		isOK = res.id === 1 && res.text === 'text1' && res.comment === 'UPDATE';

		setResult('.update_by_pk', `UPDATE BY PK ${isOK ? 'OK' : 'NO' }`, isOK);

		await db.upInsert('test', {id: 2, text: 'UPDATE'});

		res = await db.getByPk('test', 2);
		isOK = res.id === 2 && res.text === 'UPDATE' && !res.comment;

		setResult('.up_insert_update', `UPDATE OR INSERT (update) ${isOK ? 'OK' : 'NO' }`, isOK);

		await db.upInsert('test', {id: 3, text: 'INSERT'});
		res = await db.getByPk('test', 3);
		isOK = res.id === 3 && res.text === 'INSERT';

		setResult('.up_insert_insert', `UPDATE OR INSERT (insert) ${isOK ? 'OK' : 'NO' }`, isOK);

		await db.removeByPk('test', 3);
		res = await db.getByPk('test', 3);
		isOK = !res;

		setResult('.remove_by_pk', `REMOVE BY PK ${isOK ? 'OK' : 'NO' }`, isOK);

		await db.removeAll('test');
		res = await db.getAll('test');
		isOK = !Boolean(res.length);

		setResult('.remove_all', `REMOVE ALL (insert) ${isOK ? 'OK' : 'NO' }`, isOK);

		db.close();

		await db.drop();

		await db.init();

		isOK = await db.isEmpty();

		setResult('.check_drop_db', `CHECK DROP DATABAE ${isOK ? 'OK' : 'NO' }`, isOK);

		db.close();

		setResult('.the_end', 'THE END', true, true);

	} catch (e) {
		if (e) {
			setResult('.error', e.message || 'NULL MESSAGE');
		}
		console.log('error ', e);
		throw new Error(e);
	}
};
const differentDrive = async () => {

};

$(function () {
    "use strict";
    let db = new BrowserDataBaseClass();
    let $frame = $('#frame');
  
		doit(db, $frame);
  
});
```  
### Version
1.0.0   
   
---
### People

Author and developer is [Igor Stcherbina](https://github.com/eagle7410)
---
### License  
MIT

**Free Software**

