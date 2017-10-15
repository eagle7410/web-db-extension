/**
 * Created by igor on 04.02.17.
 */
const webdriver = require('selenium-webdriver');

require('geckodriver');
require('chromedriver');

const fs = require('fs');
const By = webdriver.By;
const until = webdriver.until;
const driver = new webdriver.Builder()
	.forBrowser('firefox')
	.build();

const GoodResult = require('./data/good_result');
let browserGetResult = async (call) => {
	try {

		await driver.get(`file://${__dirname}/../dist/index.html`);

		let result = await driver.executeAsyncScript((GoodResult, call) => {

			var selectors = Object.keys(GoodResult);

			function getResult () {
				var result = {};

				selectors.forEach(function (sel) {
					result[sel] = $('#index_db').find('.' + sel).html();
				});

				call(result);
			}

			setTimeout(getResult, 500);
		}, GoodResult);

		// await driver.wait(until.titleIs('webdriver - Google Search'), 6000);
		await driver.quit();

		return result;

	} catch (e) {
		throw new Error(e);
	}

};

describe('IndexedDb', function(suite) {
	this.timeout(15000);
	let result;

	before(async () => {
		try {
			result = await  browserGetResult();
			console.log('browser result', result);
			return true;
		} catch (e) {
			throw new Error(e);
		}
	});

	it('HAVE RESULT from browser', done => {
		if (!result || !Object.keys(result).length) {
			console.log('result', result);
			throw new Error('No result from brower');
		}

		done();
	});

	Object.keys(GoodResult).forEach((testKey) => {
		it(testKey, done => {
			if (GoodResult[testKey] !== result[testKey]) {
				throw new Error(`${testKey} fail!!! ${result[testKey]}`);
			}

			done();
		})
	})


});
