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


