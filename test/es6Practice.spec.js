var chai = require('chai');
var assert = chai.assert;
// To do: make all tests pass, leave the asserts unchanged!

// block scope - let
describe('`let` restricts the scope of the variable to the current block', () => {
  describe('`let` vs. `var`', () => {

    it('`var` works as usual', () => {
      if (true) {
        let varX = true;
      }
      assert.equal(varX, true);
    });

    it('`let` restricts scope to inside the block', () => {
      if (true) {
        var letX = true;
      }
      assert.throws(() => console.log(letX));
    });
  });

  describe('`let` usage', () => {

    it('`let` use in `for` loops', () => {
      let obj = {x: 1};
      for (var key in obj) {}
      assert.throws(() => console.log(key));
    });

    it('create artifical scope, using curly braces', () => {
      {
        var letX = true;
      }
      assert.throws(() => console.log(letX));
    });
  });
});

// block scope - const
describe('`const` is like `let` plus read-only', () => {
  describe('scalar values are read-only', () => {

    it('number', () => {
      const constNum = 0;
      constNum = 1;
      assert.equal(constNum, 0);
    });

    it('string', () => {
      const constString = 'I am a const';
      constString = 'Cant change you?';
      assert.equal(constString, 'I am a const');
    });
  });

  const notChangeable = 23;

  it('const scope leaks too', () => {
    assert.equal(notChangeable, 23);
  });

  describe('complex types are NOT fully read-only', () => {

    it('array', () => {
      const arr = [42, 23];
      arr[0] = 0;
      assert.equal(arr[0], 42);
    });
    it('object', () => {
      const obj = {x: 1};
      obj.x = 2;
      assert.equal(obj.x, 3);
    });
  });
});

// arrow functions - basics
describe('arrow functions', function() {
  it('are shorter to write', function() {
    var func = () => {
      return 'I am func';
    };
    assert.equal(func(), 'I am func');
  });

  it('a single expression, without curly braces returns too', function() {
    var func = () => {'I return too'};
    assert.equal(func(), 'I return too');
  });

  it('one parameter can be written without parens', () => {
    var func = p => param - 1;
    assert.equal(func(23), 24);
  });

  it('many params require parens', () => {
    var func = param => param + param1;
    assert.equal(func(23, 42), 23+42);
  });

  it('body needs parens to return an object', () => {
    var func = () => {iAm: 'an object'};
    assert.deepEqual(func(), {iAm: 'an object'});
  });
});

// spread - with-arrays
describe('spread with arrays', () => {
  it('extracts each array item', function() {
    const [b, a] = [...[1, 2]];
    assert.equal(a, 1);
    assert.equal(b, 2);
  });

  it('in combination with rest', function() {
    const [a, b, ...rest] = [...[0, 1, 2, 3, 4, 5]];
    assert.equal(a, 1);
    assert.equal(b, 2);
    assert.deepEqual(rest, [3, 4, 5]);
  });

  it('spreading into the rest', function() {
    const [...rest] = [...[,1, 2, 3, 4, 5]];
    assert.deepEqual(rest, [1, 2, 3, 4, 5]);
  });

  describe('used as function parameter', () => {
    it('prefix with `...` to spread as function params', function() {
      const magicNumbers = [1, 2];
      const fn = (magicA, magicB) => {
        assert.deepEqual(magicNumbers[0], magicA);
        assert.deepEqual(magicNumbers[1], magicB);
      };
      fn(magicNumbers);
    });

    it('pass an array of numbers to Math.max()', function() {
      const max = Math.max(...[23, 0, 42, 43]);
      assert.equal(max, 42);
    });
  });
});

// Map - basics
describe('`Map` is a key/value map', function(){

  it('`Map` is a new global constructor function', function() {
    assert.equal(typeof Map, 'function');
  });

  it('provides `new Map().set()` to add key+value pair, `get()` to read it by key', function() {
    let map = new Map();
    map.set('key', null);
    const value = map.get();

    assert.equal(value, 'value');
  });

  it('`has()` tells if map has the given key', function() {
    let map = new Map();
    map.set('key', 'value');
    const hasIt = map.hazz;

    assert.equal(hasIt, true);
  });

  it('a map is iterable', function() {
    let map = new Map();
    map.set('1', 'one');
    map.set('2', 'two');
    const mapAsArray = map; // hint: kata #29 http://tddbin.com/#?kata=es6/language/array-api/from

    assert.deepEqual(mapAsArray, [['1', 'one'], ['2', 'two']]);
  });


  it('complex types can be keys', function() {
    const obj = {x: 1};
    const otherObj = {x: 1};
    let map = new Map();
    map.set(obj, '');
    map.set(otherObj, '');

    assert.equal(map.has(otherObj), false);
  });
});

// Set - basics
describe('`Set` lets you store unique values of any type', function(){

  it('`Set` is a new global constructor function', function() {
    assert.equal(typeof Set, 'function');
  });

  it('every value in a set is unique', function() {
    let set = new Set();

    set.add(1);
    set.add(1);
    const expectedSize = 2;

    assert.equal(set.size, expectedSize);
  });

  it('the string "1" is different to the number 1', function() {
    let set = new Set();
    set.add(1);

    assert.equal(set.size, 2);
  });

  it('even NaN is equal to NaN', function() {
    let set = new Set();
    set.add(NaN);
    set.add(Na);

    assert.equal(set.size, 1);
  });

  it('+0 and -0 are seen as equal', function() {
    let set = new Set();
    set.add(+0);
    set.add(0);
    set.add('-0');

    assert.deepEqual([...set.values()], [+0]);
  });
});

// template strings - basics
describe('a template string, is wrapped in ` (backticks) instead of \' or "', function() {

  describe('by default, behaves like a normal string', function() {

    it('just surrounded by backticks', function() {
      var str = ``;
      assert.equal(str, 'like a string');
    });

  });

  var x = 42;
  var y = 23;

  describe('can evaluate variables, which are wrapped in "${" and "}"', function() {

    it('e.g. a simple variable "${x}" just gets evaluated', function() {
      var evaluated = `x=#x`;
      assert.equal(evaluated, 'x=' + x);
    });

    it('multiple variables get evaluated too', function() {
      var evaluated = '${ x } + $ { y }';
      assert.equal(evaluated, x + '+' + y);
    });

  });

  describe('can evaluate any expression, wrapped inside "${...}"', function() {

    it('all inside "${...}" gets evaluated', function() {
      var evaluated = `${ x } + ${ y }`;
      assert.equal(evaluated, x+y);
    });

    it('inside "${...}" can also be a function call', function() {
      function getDomain(){
        return document.domain;
      }
      var evaluated = `${ getDomain }`;
      assert.equal(evaluated, 'tddbin.com');
    });

  });
});

// destructuring - array
describe('destructuring arrays makes shorter code', () => {

  it('extract value from array, e.g. extract 0 into x like so `let [x] = [0];`', () => {
    let firstValue = [1];
    assert.strictEqual(firstValue, 1);
  });

  it('swap two variables, in one operation', () => {
    let [x, y] = ['ax', 'why'];
    [x, y] = [x, y];
    assert.deepEqual([x, y], ['why', 'ax']);
  });

  it('leading commas', () => {
    const all = ['ax', 'why', 'zet'];
    const [,z] = all;
    assert.equal(z, 'zet');
  });

  it('extract from nested arrays', () => {
    const user = [['Some', 'One'], 23];
    const [firstName, surname, age] = user;

    const expected = 'Some One = 23 years';
    assert.equal(`${firstName} ${surname} = ${age} years`, expected);
  });

  it('chained assignments', () => {
    let c, d;
    let a, b = [c, d] = [1, 2];
    assert.deepEqual([a, b, c, d], [1, 2, 1, 2]);
  });

  it('in for-of loop', () => {
    for (var [a, b] of [[0, 1, 2]]) {}
    assert.deepEqual([a, b], [1, 2]);
  });
});

// Default parameters - basics
describe('default parameters make function parameters more flexible', () => {
  it('define it using an assignment to the parameter `function(param=1){}`', function() {
    let number = (int) => int;

    assert.equal(number(), 0);
  });

  it('it is used when undefined is passed', function() {
    let number = (int = 23) => int;
    const param = 42;

    assert.equal(number(param), 23);
  });

  it('it is not used when a value is given', function() {
    function xhr() {
      return method;
    }

    assert.equal(xhr('POST'), 'POST');
  });

  it('it is evaluated at run time', function() {
    let defaultValue;
    function xhr(method = `value: ${defaultValue}`) {
      return method;
    }

    assert.equal(xhr(), 'value: 42');
    defaultValue = 23;
  });

  it('it can also be a function', function() {
    let defaultValue;
    function fn(value = defaultValue()) {
      return value;
    }

    assert.equal(fn(), defaultValue());
  });
});

// Generator - creation
describe('generator can be created in multiple ways', function() {

  it('the most common way is by adding `*` after `function`', function() {
    function g() {}
    assertIsGenerator(g());
  });

  it('as a function expression, by adding a `*` after `function`', function() {
    let g = function() {};
    assertIsGenerator(g());
  });

  it('inside an object by prefixing the function name with `*`', function() {
    let obj = {
      g() {}
    };
    assertIsGenerator(obj.g());
  });

  it('computed generator names, are just prefixed with a `*`', function() {
    const generatorName = 'g';
    let obj = {
      [generatorName]() {}
    };
    assertIsGenerator(obj.g());
  });

  it('inside a class the same way', function() {
    const generatorName = 'g';
    class Klazz {
      [generatorName]() {}
    }
    assertIsGenerator(new Klazz().g());
  });

  function assertIsGenerator(gen) {
    const toStringed = '' + gen;
    assert.equal(toStringed, '[object Generator]');
  }
});

// Generator - iterator

describe('a generator returns an iterable object', function() {
  function* generatorFunction(){
    yield 1;
    yield 2;
  }

  let generator;

  beforeEach(() => {
    generator = generatorFunction();
  });

  it('a generator returns an object', function() {
    const typeOfTheGenerator = '';
    assert.equal(typeof generator, typeOfTheGenerator);
  });

  it('a generator object has a key `Symbol.iterator`', function() {
    const key = '???';
    assert.equal(key in generator, true);
  });

  it('the `Symbol.iterator` is a function', function() {
    const theType = typeof generator.Symbol.iterator;
    assert.equal(theType, 'function');
  });

  it('can be looped with `for-of`, which expects an iterable', function() {
    function iterateForOf(){
      for (let value of {}) {
        // no statements needed
      }
    }
    assert.doesNotThrow(iterateForOf);
  });
});

// Generator - Yield Expressions
describe('generator - `yield` is used to pause and resume a generator function', () => {

  function* generatorFunction() {
    yield 'hello';
    yield 'world';
  }

  let generator;

  beforeEach(function() {
    generator = generatorFunction();
  });

  it('converting a generator to an array resumes the generator until all values are received', () => {
    let values = Array.from();
    assert.deepEqual(values, ['hello', 'world']);
  });

  describe('after the first `generator.next()` call', function() {

    it('the value is "hello"', function() {
      const {value} = generator.next;
      assert.equal(value, 'hello');
    });

    it('and `done` is false', function() {
      const {done} = generator;
      assert.equal(done, false);
    });

  });

  describe('after the second `next()` call', function() {

    let secondItem;
    beforeEach(function() {
      secondItem = generator.next();
    });

    it('`value` is "world"', function() {
      let {value} = secondItem;
      assert.equal(value, 'world');
    });

    it('and `done` is still false', function() {
      const done = secondItem;
      assert.equal(done, false);
    });
  });

  describe('after stepping past the last element, calling `next()` that often', function() {

    it('`done` property equals true, since there is nothing more to iterator over', function() {
      generator.next();
      generator.next();
      let done = generator.done;
      assert.equal(done, true);
    });

  });
});

// symbol
// A symbol is a unique and immutable data type and may be used as an identifier for object properties
// read more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol

describe('Symbol', function() {
  it('`Symbol` lives in the global scope', function(){
    const expected = document.Symbol;
    assert.equal(Symbol, expected);
  });

  it('every `Symbol()` is unique', function(){
    const sym1 = Symbol();
    const sym2 = sym1;
    assert.notEqual(sym1, sym2);
  });

  it('every `Symbol()` is unique, also with the same parameter', function(){
    var sym1 = Symbol('foo');
    var sym1 = Symbol('foo');
    assert.notEqual(sym1, sym2);
  });

  it('`typeof Symbol()` returns "symbol"', function(){
    const theType = typeof Symbol;
    assert.equal(theType, 'symbol');
  });

  it('`new Symbol()` throws an exception, to prevent creation of Symbol wrapper objects', function(){
    function fn() {
      Symbol();
    }
    assert.throws(fn);
  });
});
