const SentenceQuestion = function(params) {
	function getCorrectAnswers(params) {
		return [params.sentence[params.answerLang]];
	}

	function isCorrect(p, answer) {
		if (typeof p === 'string') {
			answer = p;
			p = params;
		}
		return getCorrectAnswers(p).indexOf(answer) > -1;
	}

	function phraseQuestion(params) {
		const value = params.sentence[params.questionLang]
		let question = `What option best matches the following? "${value}"`;
		if (params.questionLang == 'es') {
			question = `¿Qué coincide mejor con lo siguiente? "${value}"`;
		}
		return question;
	}

	function phraseCorrectAnswer(params, answer) {
		const otherCorrectAnswers = getCorrectAnswers(params).reduce((acc, curr) => {
			if (answer !== curr) {
				acc.push(curr);
			}
			return acc;
		}, [])

		if (params.questionLang == 'es') {
			let phrase = `¡Correcto!`;
			if (otherCorrectAnswers.length > 0) {
				phrase += ` También podrías haber seleccionado ${otherCorrectAnswers.join(", ")}`;
			}
			return phrase;
		}
		if (params.questionLang == 'en') {

			let phrase = `Correct!`;
			if (otherCorrectAnswers.length > 0) {
				phrase += ` You could've also answered with ${otherCorrectAnswers.join(", ")}`;
			}
			return phrase;
		}
	}

	function phraseWrongAnswer(params) {
		if (params.questionLang == 'es') {
			return `¡Lo Siento! Deberías haber respondido con ${getCorrectAnswers(params).join(", ")}`;
		}
		if (params.questionLang == 'en') {
			return `Sorry! You should've answered with ${getCorrectAnswers(params).join(", ")}`;
		}
	}

	function getResponse(answer) {
		return isCorrect(params,  answer) ?
			phraseCorrectAnswer(params, answer) : phraseWrongAnswer(params);
	}

	return {
		isCorrect: isCorrect,
		question: phraseQuestion(params),
		getResponse: getResponse,
		...params
	}
}

module.exports = SentenceQuestion;