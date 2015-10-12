
module.exports = function SenecaMock(Subclass) {

	this.fn = [];
	this.add = function(key, fn) {
		this.fn[key] = fn;
	};

	this.act = function(key, data, callback) {
		// not the best as its not a match to seneca wild matching... but good enough for test
		this.fn[key](data, callback);
	};

	Subclass.call(this);
		

	SenecaMock.prototype = Object.create(Subclass.prototype);

	return this;

}


