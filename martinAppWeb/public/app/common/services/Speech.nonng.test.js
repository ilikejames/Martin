(function() {
	
	describe('Speech.js', function() {


		var Speech = require('./Speech.js');
		var mock;

		beforeEach(function() {

			mock = {
				onstart : function() {},
				onend : function() {},
				onboundary : function() {}
			};

		});

		

		it('Should emit the correct events', function(done) {

			var speech = new Speech(mock, 'text');

			spyOn(speech, 'emit');

			mock.onend({type : 'end' });
			mock.onstart({type : 'start' });
			mock.onboundary({type : 'boundary', charIndex: 5 });

			setTimeout(function() {
				expect(speech.emit.calls.argsFor(0)[0]).toEqual('onEnd');
				expect(speech.emit.calls.argsFor(1)[0]).toEqual('onStart');
				expect(speech.emit.calls.argsFor(2)[0]).toEqual('onBoundary');
				done();
			}, 100);

		});

		it('Should use fake boundary calling when event not available', function(done) {

			var speech = new Speech(mock, 'This is test text');

			spyOn(speech, 'emit');

			mock.onstart({type : 'start' });

			setTimeout(function() {
				expect(speech.emit.calls.argsFor(0)[0]).toEqual('onStart');
				expect(speech.emit.calls.argsFor(1)[0]).toEqual('onBoundary');
				expect(speech.emit.calls.argsFor(1)[1].isFake).toEqual(true);
				done();
			}, 300);

		});

		it('Should should return the current word and what has been spoken', function(done){ 

			var speech = new Speech(mock, 'This is test text');

			spyOn(speech, 'emit');

			mock.onstart({type : 'start' });
			mock.onboundary({type : 'boundary', charIndex: 5});

			setTimeout(function( ) {
				expect(speech.emit.calls.argsFor(1)[0]).toEqual('onBoundary');
				expect(speech.emit.calls.argsFor(1)[1].word).toEqual('is');
				expect(speech.emit.calls.argsFor(1)[1].spoken).toEqual('This is');
				done();
			}, 100);

		
		});


	});


})();