import { forEach, Sum, fetchTextByPromise, httpGetAsync, httpLibrary } from "../lib/es6-functional.js";
import 'babel-polyfill';
import { resolve } from "path";
import { EAFNOSUPPORT } from "constants";
const sinon = require("sinon")

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

var testObject= {};

testObject.doSomethingTo10 = (func) => {
    const x = 10;
    return func(x);
}

testObject.tenTimes = (x) => 10 * x;

describe("simple fake", function () {
    it("doSomethingTo10", function () {
        const fakeFunction = sinon.fake();
        testObject.doSomethingTo10(fakeFunction);
        assert.equal(fakeFunction.called, true);
    });
    it("10 Times", function () {
        const fakeFunction = sinon.stub(testObject, "doSomethingTo10");
        fakeFunction.withArgs(10).returns(10);
        var result = testObject.tenTimes(0);
        assert.equal(result, 0);
        assert.notEqual(result, 10);
    });
    it("Mock HTTP Call", function () {
        const getAsyncMock = sinon.mock(httpLibrary);
        getAsyncMock.expects("httpGetAsync").once().returns({ username : "sriks"});
        httpLibrary.getAsyncCaller("", (usernames) => console.log("Usernames: " + usernames));
        getAsyncMock.verify();
        getAsyncMock.restore();
    });
    it("HTTP Call", function () {
        httpLibrary.getAsyncCaller("https://jsonplaceholder.typicode.com/users");
    });
});
