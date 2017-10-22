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
			users: {
				_id: {
					type: constant.TYPE_INT,
					pk: {
						order: constant.ASC
					}
				},
				login: {
					type: constant.TYPE_CHAR + '(20)',
					require: true,
					unique: true
				},
				pass: {
					type: constant.TYPE_CHAR
				}
			},
			settings: {
				id: {
					type: constant.TYPE_INT,
					pk: {
						order: constant.ASC
					}
				},
				type: {
					type: constant.TYPE_CHAR + '(20)',
					require: true,
					unique: true
				},
				data: {type: constant.TYPE_TEXT}
			},
			categories: {
				id: {
					type: constant.TYPE_INT,
					pk: {
						order: constant.ASC
					}
				},
				name: {
					type: constant.TYPE_CHAR + '(100)',
					require: true,
					unique: true
				},
			},
			storage: {
				id: {
					type: constant.TYPE_INT,
					pk: {
						order: constant.ASC
					}
				},
				category: {
					type: constant.TYPE_INT,
					require: true
				},
				title: {
					type: constant.TYPE_CHAR,
					require: true,
					unique: true
				},
				login: {
					type: constant.TYPE_CHAR,
					require: true
				},
				pass: {
					type: constant.TYPE_CHAR
				},
				answer: {type: constant.TYPE_CHAR},
				desc: {type: constant.TYPE_TEXT}
			}
		};

		const arInsert = [[1, 'text1'], [2, 'text2', 'ZZZ']];

		let isOK, res, isEmpty;

		try {
			await db.drop();

			await db.init({test: fieldsTableTets});

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
	}
;

const differentDrive = async () => {
	let db = new BrowerDataBaseClass();
	let driveConst = BrowerDataBaseClass.driverConst();
	let $frame = $('#frame');
	let $setAuto = $('#auto');
	let $setWebsql = $('#web_sql');
	let $setInndexedDb = $('#index_db');

	$setAuto.html($frame.html());
	$setWebsql.html($frame.html());
	$setInndexedDb.html($frame.html());

	await doit(db, $setAuto);

	db = new BrowerDataBaseClass({}, driveConst.IndexedDb);
	await doit(db, $setInndexedDb);

	db = new BrowerDataBaseClass({}, driveConst.WebSQL);
	await doit(db, $setWebsql);
};

$(function () {
	"use strict";
	differentDrive();
});

