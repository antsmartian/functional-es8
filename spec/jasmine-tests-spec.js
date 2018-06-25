import { forEach, Sum, fetchTextByPromise } from "../lib/es6-functional.js";
import 'babel-polyfill';

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            expect([1, 2, 3].indexOf(4)).toBe(-1);
        });
    });
});

describe('es6-functional', function () {
    describe('Array', function () {
        it('Foreach should double the elements of Array, when double function is passed', function () {
            var array = [1, 2, 3];
            const doublefn = (data) => data * 2;
            forEach(array, doublefn);
            expect(array[0]).toBe(1)
        });
        it('Sum should sum up elements of array', function () {
            var array = [1, 2, 3];
            expect(Sum(array)).toBe(6)
        });
        it('Sum should sum up elements of array including negative values', function () {
            var array = [1, 2, 3, -1];
            expect(Sum(array)).toBe(5)
        });
    });

    describe('Promise', function () {
        it('Promise should return es8', async function (done) {
            done();
            var result = await fetchTextByPromise();
            expect(result).toBe('es8');
        })
    });
});