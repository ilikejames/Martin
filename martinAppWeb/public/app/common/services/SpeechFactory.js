(function(window, undefined) {
	
	'use strict';

	var Speech = require('./Speech.js');



	window.addEventListener('beforeunload', function() {
		window.speechSynthesis.cancel();
	});

	if (!window.speechSynthesis) {
		console.error('No window.speechSynthesis available');
		return;
	}

	var attempts = 0;


	module.exports = function SpeechFactory($window, $q, $timeout) {

		function speak(text,voice) {

			var d = $q.defer();

			getVoicesWhenReady(function(err, voices) {
				if(err) {
					return d.reject(err);
				}

				var utterance = new SpeechSynthesisUtterance(),
					speech = new Speech(utterance, text);

				utterance.voice = voice || voices[0];
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
				return $timeout(angular.bind(this, callback, null, voices), 1);
			}

			if(attempts<3) {
				attempts++;
				//console.log('reattempting:', attempts);
				$timeout(angular.bind(this, getVoicesWhenReady, callback) ,100);
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
		};

		return {
			getVoices : getVoices,
			speak : speak
		}


	};

})(window);