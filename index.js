const data = require('spanish-english-json');
const QuestionGenerator = require('./src/question-generator.js');
const Lookup = require('./src/lookup.js');

module.exports = {
	lookup: Lookup.find,
	QuestionGenerator: QuestionGenerator,
	data: data
};