/*
Zhanwen "Phil" Chen
FCI coding challenge
Problem 1: 500 Words

Use radix search to optimize frequent lookups that are O(length(word))

To run,
0. Make sure dictionary.txt and Trie.js are in the same directory
1. Install node.js (https://nodejs.org/en/).
  Latest version recommended. Minimum 6.4.0
2. In terminal, $ node Words.js
3. You can see the result in '500Words.txt' in the same directory
*/

'use strict';

const path = require('path');
const {Trie} = require('./Trie');
const fs = require('fs');


// helper method to generate a random word of length : length
const alphabet = "abcdefghijklmnopqrstuvwxyz"; // the alphabet
const generateRandomWord = (length) =>
  Array(length).join().split(',').map(() =>
    alphabet.charAt(Math.floor(Math.random() * alphabet.length))).join('');


// helper method to generate random ints
const getRandomIntInclusive = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;


// class definition for main program
class Words {
  constructor(filename) {
    this.filename = filename;
    this.trie = new Trie();
    this.legalWords = [];
    this.allowDuplicates = false;
  };

  // transform dictionary.txt into a radix tree
  buildTree() {
    try {
      var array = fs.readFileSync(this.filename).toString()
                    .replace(/\r\n/g,'\n').split('\n'); // 'var' to hoist up
    } catch (e) {
      console.log(`Unable to read dictionary from ${this.filename}`);
    } finally {
      array.forEach( (item) => {
        this.trie.add(item);
        // console.log(`added ${item} to the trie`);
      });
    }
  };


  // look up generated random word in the dictionary (radix search)
  addWord(randomWord) {
    if (this.trie.contains(randomWord)) {
      this.legalWords.push(randomWord);
      // console.log(`Found and added ${randomWord} to the dictionary.
      //               Dictionary now has ${this.wordCount} words.`);
    }
    // else {
    //   console.log(`Failed to find ${randomWord} in the dictionary`);
    // }

    // remove from the dictionary so it won't match again
    if (!this.allowDuplicates) this.trie.remove(randomWord);
  };

  run() {
    this.buildTree();
    let randomString = '';
    while (this.legalWords.length < 500) {
      randomString = generateRandomWord(getRandomIntInclusive(3,10));
      // console.log(`generated ${randomString}`);
      this.addWord(randomString);
    }
  };
};

// invoke anonymous main function
(() => {
  // Assuming dictionary.txt is in the same directory
  const words = new Words(path.join(__dirname, 'dictionary.txt'));
  words.run();
  const legalWords = words.legalWords;

  const saveFilePath = path.join(__dirname, '500Words.txt');

  console.log(`All legal words are saved in ${saveFilePath}`);
  console.log(legalWords);

  const saveFile = fs.createWriteStream(saveFilePath);
  saveFile.on('error', (err) => {
    console.log(`Unable to save data to ${saveFilePath}`)
  });
  legalWords.forEach((word) => {
    saveFile.write(word + '\n');
  });
  saveFile.end();
})();
