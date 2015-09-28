(function(window, undefined) {
	
	'use strict';

	var EventEmitter = require('../../../assets/vendor/eventEmitter/eventEmitter.js'),
		_ = require('../../../assets/vendor/lodash/lodash.js');
		


	var Speech = function(utterance, text) {

		this.utterance = utterance;
		this.text = text;

		var self = this,
			hasBoundary = false;


		function fakeBoundaryEvents(text) {
			var words = self.text.split(' ');

			_.each(words, function(itm, i) {

				setTimeout(function() {

					var data = {
						type : 'boundary',
						word : itm,
						spoken : words.slice(0, i+1).join(' '),
						isFake : true
					};
				
					self.emit('onBoundary', data);

				}, 400 * i);
			});

		}

		this.onEvent = function(evt) {
			var eventType = 'on' + evt.type.substr(0,1).toUpperCase() + evt.type.substr(1);
			self.emit(eventType, evt);
		};


		this.onStart = function(evt) {
			this.emit('onStart', evt);
			// timeout...if not a boundary, then default to trigger version.
			setTimeout(function() {
				if(self.hasBoundary) return;
				fakeBoundaryEvents(self.text);
			},250);
		};

		this.onBoundary = function(evt) {

			self.hasBoundary = true;

			if(evt.type!='boundary') return;

			var endOfWordIndex = self.text.indexOf(' ', evt.charIndex);
			endOfWordIndex = endOfWordIndex==-1 ? self.text.length : endOfWordIndex;

			var data = {
				type : 'boundary',
				word : this.text.substring(evt.charIndex, endOfWordIndex),
				spoken : this.text.substr(0, endOfWordIndex)
			};

			this.emit('onBoundary', data);

		};

		// bind the utterance events to this handlers or general onEvent method
		_.each(['End', 'Error', 'Mark', 'Boundary', 'Start'], function(itm) {
			self.utterance['on' + itm.toLowerCase()] = _.bind( self['on' + itm] || self.onEvent, self);
		});

	};

	// add event methods .on, .emit etc.
	angular.copy(EventEmitter.prototype, Speech.prototype);


	module.exports = Speech;


})(window);