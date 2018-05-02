import {
    forEach,
    Sum,
    fetchTextByPromise
} from "../lib/es6-functional.js";
import 'babel-polyfill';
import {
    resolve
} from "path";

/*********************************************************************************************************** */
var assert = require('assert');

/***SAMPLE TEST******************************************************************************************************** */

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(4));
        });
    });
});

/***TESTING FUNCTIONAL JS CODE******************************************************************************************************** */

describe('es6-functional', function () {
    describe('Array', function () {
        it('Foreach should double the elements of Array, when double function is passed', function () {
            var array = [1, 2, 3];
            const doublefn = (data) => data * 2;
            forEach(array, doublefn);
            assert.equal(array[0], 1)
        });
        it('Sum should sum up elements of array', function () {
            var array = [1, 2, 3];
            assert.equal(Sum(array), 6)
        });
        it('Sum should sum up elements of array including negative values', function () {
            var array = [1, 2, 3, -1];
            assert.notEqual(Sum(array), 6)
        });
    });

/***TESTING FUNCTIONAL JS CODE******************************************************************************************************** */

    describe('Promise/Async', function () {
        it('Promise should return es8', async function (done) {
            done();
            var result = await fetchTextByPromise();
            assert.equal(result, 'es8');
        })
    });
});

/***MOCKING******************************************************************************************************** */
