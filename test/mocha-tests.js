/*******Imports *********************************************************************************************************** */
import {
    forEach,
    Sum,
    fetchTextByPromise,
    httpLibrary
} from "../lib/es6-functional.js";

import {
    incrementCounter,
    store
} from "../lib/redux.js";

import 'babel-polyfill';

const sinon = require("sinon");

import { curryN } from "../lib/currying.js";

import { Container, MayBe, Some, Nothing, Either } from "../lib/functors.js";

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

var testObject = {};

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
        const fakeFunction = sinon.stub(testObject, "tenTimes");
        fakeFunction.withArgs(10).returns(10);
        var result = testObject.tenTimes(10);
        assert.equal(result, 10);
        assert.notEqual(result, 0);
    });
    it("Mock HTTP Call", function () {
        const getAsyncMock = sinon.mock(httpLibrary);
        getAsyncMock.expects("httpGetAsync").once().returns(null);
        httpLibrary.getAsyncCaller("", (usernames) => console.log(usernames));
        getAsyncMock.verify();
        getAsyncMock.restore();
    });
    it("HTTP Call", function () {
        httpLibrary.getAsyncCaller("https://jsonplaceholder.typicode.com/users");
    });
});

/*******Testing Currying, Monads and Functions *********************************************************************************************************** */

describe("Currying Tests", () => {
    it("should return a function", function(){
        let add = function(){}
        assert.equal(typeof curryN(add), 'function');
    });

    it("should throw if a function is not provided", function(){
        assert.throws(curryN, Error);
    });

    it("calling curried function and original function with same arguments should return the same value", function(){
        let multiply = (x,y,z) => x * y * z;
        
        let curriedMultiply = curryN(multiply);
        assert.equal(curriedMultiply(1,2,3), multiply(1,2,3));
        assert.equal(curriedMultiply(1)(2)(3), multiply(1,2,3));
        assert.equal(curriedMultiply(1)(2,3), multiply(1,2,3));

        curriedMultiply = curryN(multiply)(2);
        assert.equal(curriedMultiply(1,3), multiply(1,2,3));
    });
});

describe("Functors Tests", () => {
    it("should store the value", function(){
        let testValue = new Container(3);
        assert.equal(testValue.value, 3);
    });

    it("should implement of", function(){
        let testValue = Container.of(3);
        assert.equal(testValue.value, 3);
    });

    it("should implement map", function(){
        let double = (x) => x + x;
        assert.equal(typeof Container.of(3).map == 'function', true)
        let testValue = Container.of(3).map(double).map(double);
        assert.equal(testValue.value, 12);
    });

    it("may be should handle null", function(){
        let upperCase = (x) => x.toUpperCase();
        let testValue = MayBe.of(null).map(upperCase);
        assert.equal(testValue.value, null);
    });

    it("may be should chain", function(){
        let upperCase = (x) => x.toUpperCase();
        let testValue = MayBe.of("Chris").map(upperCase).map((x) => "Mr." + x);
        assert.equal(testValue.value, "Mr.CHRIS");
    });
});

describe("Monad Tests", () => {

    it("should implement join", function(){
        let mayBe = new MayBe(null);
        let testValue = typeof mayBe.join === 'function' ;
        assert.equal(testValue, true);
    });

    it("should implement chain", function(){
        let mayBe = new MayBe(null);
        let testValue = typeof mayBe.chain === 'function' ;
        assert.equal(testValue, true);
    });

    it("join should remove nesting", function(){
        let mayBe = new MayBe.of(MayBe.of(5));
        let testValue = mayBe.join().map((v)=>v + 4);
        assert.equal(testValue.value, 9);
    });

    it("calling chain should avoid using join after map", function(){
        let mayBe = new MayBe.of(MayBe.of(5));
        let testValue = mayBe.join().chain(v => v + 4);
        assert.equal(testValue, 9);
    });

});

/*******Testing Redux library *********************************************************************************************************** */


describe('reduxtests', () => {
    // test if state is empty initially
    it('is empty initially', () => {
        assert.equal(store.getState().counter, 0);
    });

    // test for state change once
    it('state change once', () => {
        global.document = null;
        incrementCounter();
        assert.equal(store.getState().counter, 1);
    });

    // test for state change twice
    it('state change twice', () => {
        global.document = null;
        incrementCounter();
        assert.equal(store.getState().counter, 2);
    });

    // test for listener count
    it('minimum 1 listener', () => {
        //Arrange
        global.document = null;
        store.subscribe(function () {
            console.log(store.getState());
        });

        //Act
        var hasMinOnelistener = store.currentListeners.length > 1;
        
        //Assert
        assert.equal(hasMinOnelistener, true);
    });
});
