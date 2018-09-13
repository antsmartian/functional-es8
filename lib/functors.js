const Container = function(val) {
  this.value = val;
}

Container.of = function(value) {
  return new Container(value);
} 

Container.prototype.map = function(fn){ 
  return Container.of(fn(this.value));
}

const MayBe = function(val) {
  this.value = val;
}

MayBe.of = function(val) {
  return new MayBe(val);
}

MayBe.prototype.isNothing = function() {
  return (this.value === null || this.value === undefined);
};

MayBe.prototype.map = function(fn) {
  return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value));
};

MayBe.prototype.join = function() {
  return this.isNothing() ? MayBe.of(null) : this.value;
};

MayBe.prototype.chain = function(f){
  return this.map(f).join();
};

const Nothing = function(val) {
  this.value = val;
};

Nothing.of = function(val) {
  return new Nothing(val);
};

Nothing.prototype.map = function(f) {
  return this;
};

const Some = function(val) {
  this.value = val;
};

Some.of = function(val) {
  return new Some(val);
};

Some.prototype.map = function(fn) {
  return Some.of(fn(this.value));
};

const Either = {
  Some : Some,
  Nothing: Nothing
};

export {
  Container, MayBe, Some, Nothing, Either
};