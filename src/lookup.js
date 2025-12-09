const data = require('spanish-english-json');

const Lookup = function() {

	function getResponse(word, dictionaryResult, direction) {
		const translation = dictionaryResult.translation.reduce((acc, curr, index) => {
			if (index == 0)
				return `"${curr}"`
			if (index == dictionaryResult.translation.length  - 1) 
				return acc + `, or "${curr}"`
			return acc + `, "${curr}"`
		}, "");
		const meaning = dictionaryResult.type;
		if (direction === 'es_en') {
			return `The word "${word}" means "${meaning}", and translates to ${translation}`;
		} else if (direction === 'en_es') {

			return `La palabra "${word}" significa "${meaning}", y se traduce como ${translation}`
		}
	}


	return {
		find: (word) => {
			const spanish = data.words.en_es.map[word];
			const english = data.words.es_en.map[word]
			if (spanish != undefined) {
				return getResponse(word, spanish, 'en_es');
			} else if (english != undefined) {
				return getResponse(word, english, 'es_en');
			} else {
				return "Sorry, no translation exists :(";
			}
		}
	}
}();

module.exports = Lookup;