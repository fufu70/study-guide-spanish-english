const data = require('spanish-english-json');
const SentenceQuestion = require('./sentence-question.js');
const WordQuestion = require('./word-question.js');

const QuestionGenerator = function() {

	function getRandomSentence(seed = Math.random) {
		const index = Math.floor(data.sentences.length * seed())
		return data.sentences[index];
	}

	function getSentenceQuestion(questionLang = 'en', answerLang = 'es', answers = 4, sentence = undefined, seed = Math.random) {
		if (!sentence?.en || !sentence?.es) {
			sentence = getRandomSentence(seed);
		}
		const answer = sentence[answerLang];

		const answerKey = [];
		const answerIndex = Math.floor(seed() * answers);
		for (let i = 0; i < answers; i ++) {
			if (answerIndex === i) {
				answerKey.push(answer);
			} else {
				answerKey.push(getRandomSentence(seed)[answerLang]);
			}
		}

		return SentenceQuestion({questionLang, answerLang, sentence, answerKey})
	}

	function getRandomWord(list, questionLang, answerLang, seed = Math.random) {
		const words = data.words[questionLang + "_" + answerLang].list;
		const index = Math.floor(words.length * seed())
		let randomWord = words[index];
		if (randomWord.translation.length === 0) {
			randomWord = getRandomWord(list, questionLang, answerLang, seed);
		}
		return randomWord;
	}

	function getRandomAnswer(list, questionLang, answerLang, seed) {
		const randomWord = getRandomWord(list, questionLang, answerLang, seed);
		const randomIndex = Math.floor(randomWord.translation.length * seed())
		let randomAnswer = randomWord.translation[randomIndex];

		if (!randomAnswer) {
			randomAnswer = getRandomAnswer(list, questionLang, answerLang, seed);
		}
		return randomAnswer;
	}

	function getQuestion(dictionary, questionLang = 'en', answerLang = 'es', answers = 4, word = undefined, seed = Math.random) {
		const list = dictionary.list;
		const map = dictionary.map;
		if (typeof word == 'string') {
			word = map[word];
		}
		if (!word) {
			word = getRandomWord(list, questionLang, answerLang, seed);
		}
		const index = Math.floor(word.translation.length * seed())
		const answer = word.translation[index];

		const answerKey = [];
		const answerIndex = Math.floor(seed() * answers);
		for (let i = 0; i < answers; i ++) {
			if (answerIndex === i) {
				answerKey.push(answer);
			} else {
				answerKey.push(getRandomAnswer(list, questionLang, answerLang, seed));
			}
		}

		return WordQuestion({
			questionLang, 
			answerLang,
			word,
			answer,
			answerKey
		});
	}

	function getWordQuestion(questionLang = 'en', answerLang = 'es', answers = 4, word = undefined, seed = Math.random) {
		const dictionary = data.words[questionLang + "_" + answerLang];
		return getQuestion(dictionary, questionLang, answerLang, answers, word, seed);
	}

	function getVerbQuestion(questionLang = 'en', answerLang = 'es', answers = 4, word = undefined, seed = Math.random) {
		const dictionary = data.verbs[questionLang + "_" + answerLang];
		return getQuestion(dictionary, questionLang, answerLang, answers, word, seed);
	}

	function getRandomQuestion(questionLang = 'en', answerLang = 'es', answers = 4, seed = Math.random) {
		const questionType = Math.floor(seed() * 3);

		switch(questionType) {
			case 0:
				return getSentenceQuestion(questionLang, answerLang, answers, undefined, seed);
			case 1:
				return getVerbQuestion(questionLang, answerLang, answers, undefined, seed);
			case 2:
				return getWordQuestion(questionLang, answerLang, answers, undefined, seed);
		}
	}

	return {
		getSentenceQuestion: getSentenceQuestion,
		getWordQuestion: getWordQuestion,
		getVerbQuestion: getVerbQuestion,
		getRandomQuestion: getRandomQuestion
	}
}();

module.exports = QuestionGenerator