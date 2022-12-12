function MainBuilder(value) {
    this.value = value;
}
//methods of class MainBuilder
MainBuilder.prototype.plus = function(...n) {};

MainBuilder.prototype.minus= function(...n) {};

MainBuilder.prototype.multiply = function(n) {};

MainBuilder.prototype.divide= function(n) {};

MainBuilder.prototype.mod= function(n) {};

MainBuilder.prototype.remove = function(str) {};

MainBuilder.prototype.get = function() {};

MainBuilder.prototype.sub = function(from, n) {};

//static method
MainBuilder.random  = function(from, to) {
    if (typeof (from) !== 'number' || Number.isNaN(from) || typeof (to) !== 'number' || Number.isNaN(to)) {
        return 'Error: The values must be numbers!';
    }
    return Math.floor(Math.random() * (to - from)) + from;
}

//-----------ES6 Class----------//

class IntBuilder extends MainBuilder {
    constructor(int) {
    super(int);
    this.int = int;
    }

    plus(...n) {
        this.int = [...n].reduce(function(a, b) {
             return a + b;
            }, this.int);
        return this;
    }

    minus(...n) {
        this.int = [...n].reduce(function(a, b) {
            return a - b;
            }, this.int);
        return this;

    }

    multiply(n){
        this.int = this.int * n;
        return this;

    }

    divide(n){
        this.int = Math.trunc(this.int / n);
        return this;
    }

    mod(n){
        this.int = this.int % n;
        return this;
    }

    get() {
        return this.int;
    }

}

//-----------ES5 Class----------//

function StringBuilder(str) {
    MainBuilder.call(this, str);
    this.str = str;
}

StringBuilder.prototype = Object.create(MainBuilder.prototype);
StringBuilder.prototype.constructor = StringBuilder;

StringBuilder.prototype.plus = function(...str) {
    this.str = ''.concat(this.str, ...str);
    return this;
};

StringBuilder.prototype.minus = function(n) {
    this.str = this.str.slice(0, this.str.length-n);
    return this;
}
StringBuilder.prototype.multiply = function(n) {
    this.str = Array(n + 1).join(this.str);
    return this;
}

StringBuilder.prototype.divide = function(n) {
    var k = Math.floor(this.str.length / n);
    this.str = this.str.slice(0,k);
    return this;
}

StringBuilder.prototype.remove = function(str) {
    this.str = this.str.split(str).join('');
    return this;
}

StringBuilder.prototype.sub = function(from, n) {
    this.str = this.str.substring(from, n + 1);
    return this;
}

StringBuilder.prototype.get = function() {
    return this.str;
}


//Tests
let intBuilder = new IntBuilder(10);
console.log(intBuilder
  .plus(2, 3, 2)                     // 17;
  .minus(1, 2)                       // 14;
  .multiply(2)                       // 28;
  .divide(4)                         // 7;
  .mod(3)                            // 1;
  .get());                           // 1;

console.log(IntBuilder.random(10, 100));

let strBuilder = new StringBuilder('Hello');
console.log(strBuilder
  .plus(' all', '!')                  // 'Hello all!'
  .minus(4)                           // 'Hello '
  .multiply(3)                        // 'Hello Hello Hello '
  .divide(4)                          // 'Hell';
  .remove('l')                        // 'He';
  .sub(1,1)                           // 'e';
  .get());                            // -> 'e';
