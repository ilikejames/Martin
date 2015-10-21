(function(window, angular, undefined) {
	
	'use strict';

	var _ = require('vendor/lodash/lodash.js');
	var Speech = require('./Speech.js');



	window.addEventListener('beforeunload', function() {
		window.speechSynthesis.cancel();
	});

	if (!window.speechSynthesis) {
		console.error('No window.speechSynthesis available');
		return;
	}

	var attempts = 0;

	function getRandomDefaultVoice(voices) {
		var voice = voices[Math.floor(Math.random() * voices.length)];
		if(voice.localService) {
			return voice;
		}
		return getRandomDefaultVoice(voices);
	}


	module.exports = function SpeechFactory($window, $q, $timeout) {

		function speak(text,voice) {

			var d = $q.defer();

			getVoicesWhenReady(function(err, voices) {
				if(err) {
					return d.reject(err);
				}

				var utterance = new SpeechSynthesisUtterance(),
					speech = new Speech(utterance, text);

				utterance.voice = voice || getRandomDefaultVoice(voices);
				//utterance.lang = utterance.voice.lang; 
				utterance.text = text;
				utterance.rate= /iPad|iPhone|iPod/.test(navigator.userAgent) ? 0.2 : 0.8;
		
				// wrap async... means it breaks less often
				// see https://code.google.com/p/chromium/issues/detail?id=335907#c22
				console.log(utterance);	// ! important (see above link)
				$timeout(function() {
					speechSynthesis.speak(utterance);
					d.resolve(speech);
				},0);

			});

			return d.promise;
		}

		function getVoicesWhenReady(callback) {

			var voices = speechSynthesis.getVoices();

			if(voices && voices.length) {
				attempts = 0;
				return $timeout(angular.bind({}, callback, null, voices), 1);
			}

			if(attempts<3) {
				attempts++;
				//console.log('reattempting:', attempts);
				$timeout(angular.bind({}, getVoicesWhenReady, callback) ,100);
			}
			else {
				return callback('timeout');
			}

		}

		function getVoices() {

			var d = $q.defer();

			getVoicesWhenReady(function(err, voices) {
				if(err) {
					d.reject(err);
					return;
				}
				d.resolve(voices);

			});


			return d.promise;
		}

		function getLanguages() {
			return this.getVoices()
				.then(function(voices) {
					var langs = _.reduce(voices, function(memo, itm) {
						itm.localService && memo.push(itm.lang);
						return memo;
					}, []);	
					return _.uniq(langs);
				});
		}

		return {
			getVoices : getVoices,
			getLanguages : getLanguages,
			speak : speak
		};


	};

})(window, angular);