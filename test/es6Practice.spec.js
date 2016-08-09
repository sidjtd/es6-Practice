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