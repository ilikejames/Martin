
(function(angular, undefined) {

	'use strict';

	angular.module('ilj.common.services')

	.service('TextService', function() {

		this.getWord = function() {
			// really silly method to generate a word

			var vowels="aeiou",
				consonents = "qwrtypsdfghjklzxcvbnm",
				selection = [
					vowels, consonents
				]

			var length = Math.floor(Math.random()*10)+1,
				using = length==1 ? 0 : Math.round(Math.random());

			var word = '';

			while(word.length<length) {
				var tmp = using == 0 ? vowels : consonents;
				using = using ^ 1; // flip the bit
				word+= tmp.substr(Math.floor(Math.random()*tmp.length),1);
			}

			return word;
		}

		this.getSentance = function(maxSize) {
			var words = _.times(Math.floor(Math.random()*maxSize)+1, this.getWord);
			// insert Martin somewhere
			words.push('Martin');
			words = _.shuffle(words);
			words[0] = words[0].substr(0,1).toUpperCase() + words[0].substr(1);
			return words.join(' ')+'. ';
		},

		this.getNumberOfSentances = function(number, maxSize) {
			var s = [];
			for(var i=0; i<number;i++) {
				s.push(this.getSentance(maxSize));
			}
			return s.join(' ');
		},

		this.getSentances = function() {
			var title = this.getSentance(6);
			var messages = [];
			var length = Math.floor(Math.random()*2)+2;

			// build a few bullet points
			while(messages.length < length) {
				var sentances = _.times(Math.floor(Math.random()*3)+2, this.getSentance.bind(this,6)).join(' ');
				messages.push(sentances);
			}

			var asString = title + '\n';
			asString+= _.map(messages,function(itm, key) {
				return (key+1) + '. ' + itm 
			}).join('\n');


			return {
				title: title,
				messages: messages,
				asString : asString
			};
		},

		this.getSentances2 = function() {
			return [
				'a. my title is longer than that my title',
				[
					'subitem 1',
					'subitem 2',
					'subitem 3'
				],
				'title 2',
				[	
					'subitem 4',
					'subitem 5',
					'subitem 6'
				]
			];
		}

	});



})(angular);
