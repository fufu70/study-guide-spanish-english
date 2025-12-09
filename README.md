# Spanish and English Study Guide

This is Spanish to English and English to Spanish Study Guide to help english and spanish learners from both pasillos :)

## Installation

Simply run `npm install spanish-english-study-guide`, and require the library where you can access a quick `lookup` for spanish and english words, a `QuestionGenerator` which will generate questions, and the entire data set of `data`.


## Study Guide

```javascript
const studyGuide = require('./index.js')
console.log(studyGuide) // {
//   lookup: [Function: find],
//   QuestionGenerator: {
//     getSentenceQuestion: [Function: getSentenceQuestion],
//     getWordQuestion: [Function: getWordQuestion],
//     getVerbQuestion: [Function: getVerbQuestion],
//     getRandomQuestion: [Function: getRandomQuestion]
//   },
//   data: {
//     sentences: [
//       ... 13145 more items
//     ],
//     verbs: { en_es: [Object], es_en: [Object] },
//     words: { en_es: [Object], es_en: [Object] }
//   }
// }
```

### lookup

To quickly lookup a word you can use the `studyGuide.lookup` function which will determine if the word is spanish or english and try and match the language of the word with the translation e.g. if the word is english, it'll generate a translation in spanish.

```javascript
studyGuide.lookup('pasillo')
// 'The word "pasillo" means "{m}", and translates to "corridor"'
```

### QuestionGenerator

To study the question generator is there to generate a random question from the dataset. A random sentence, word, or verb question can be generated using the `getSentenceQuestion`, `getWordQuestion`, or `getVerbQuestion` respectively. To generate a random question from the lsit above just call `getRandomQuestion`. All questions will generate the same structure, the `question`, `answerKey`, a function to check if your supplied answer `isCorrect`, and a `getResponse` that tells you if the answer is correct and other information about the question:

```javascript
q = studyGuide.QuestionGenerator.getRandomQuestion();
// {
//   isCorrect: [Function: isCorrect],
//   question: 'What option best matches the following? "lump"',
//   getResponse: [Function: getResponse],
//   questionLang: 'en',
//   answerLang: 'es',
//   word: {
//     word: 'lump',
//     translation: [
//       'cúmulo {m}',
//       'agrupación {f}',
//       'acumulamiento {m}',
//       'amontonamiento {m}',
//       'prominencia {f}',
//       'cordillera {f} (de montañas)',
//       'terrón {m} (de azúcar)',
//       'mazacote {m}',
//       'trozo {m}',
//       'terrón {m}',
//       'grumo {m}',
//       'bulto {m}'
//     ],
//     type: '{n} (group, set, or unit)'
//   },
//   answer: 'terrón {m} (de azúcar)',
//   answerKey: [
//     'parte médico {m}',
//     'económicamente',
//     'atentamente',
//     'terrón {m} (de azúcar)'
//   ]
// }
q.isCorrect('terrón {m} (de azúcar)')
// true
q.getResponse('terrón {m} (de azúcar)')
// "Correct! You could've also answered with cúmulo {m}, agrupación {f}, acumulamiento {m}, amontonamiento {m}, prominencia {f}, cordillera {f} (de montañas), mazacote {m}, trozo {m}, terrón {m}, grumo {m}, bulto {m}"
```

## Dataset

Currently the library uses the [spanish-english-json](https://github.com/fufu70/spanish-english-json) dataset, currently consisting of 13,000 sentences and 8,900 words. 