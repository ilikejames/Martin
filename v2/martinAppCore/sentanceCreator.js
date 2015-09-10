
var _ = require('lodash');


var VOWELS = "aeiou";
var CONSONENTS = "qwrtypsdfghjklzxcvbnm";


function getMadeUpWord() {

	// really silly method to generate a word. Alternates between vowels and consonents

	var count = _.random(1,10),
		using = count == 1 ? 0 : Math.round(Math.random()),	// random start bit, or a vowel if only one letter
		word = '';

	for(var i = 0; i < count; i++) {
		var tmp = using == 0 ? VOWELS : CONSONENTS;
		using = using ^ 1; // flip the bit so next time we use the other list of letters
		word += tmp.substr(Math.floor(Math.random()*tmp.length),1);
	}

	return word;
}


function getSentance(minSize, maxSize) {

	minSize = minSize === undefined ? 1 : minSize;
	maxSize = maxSize === undefined ? 10 : maxSize;

	var count = _.random(minSize, maxSize);
	var words = _.times(count, getMadeUpWord);	

	// name placeholder
	words.push('%s');	

	words = _.shuffle(words);

	//capitalize first letter
	words[0] = words[0].substr(0,1).toUpperCase() + words[0].substr(1);	 

	return  words.join(' ') + '.';
}


module.exports.create = getSentance;

