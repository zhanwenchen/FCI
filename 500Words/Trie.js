/*
Trie.js 
A JavaScript implementation of Radix Tree
Modified by Zhanwen Chen

Original Author: Benoit Vallon
Source: https://github.com/benoitvallon/computer-science-in-javascript/blob/master/data-structures-in-javascript/trie.es6.js
*/

function Node(data) {
  this.data = data;
  this.isWord = false;
  this.prefixes = 0;
  this.children = {};
}

class Trie {
  constructor() {
    this.root = new Node('');
  }

  add(word) {
    if(!this.root) return null;
    this._addNode(this.root, word);
  }

  _addNode(node, word) {
    if(!node || !word) return null;
    node.prefixes++;
    const letter = word.charAt(0);
    let child = node.children[letter];
    if(!child) {
      child = new Node(letter);
      node.children[letter] = child;
    }
    const remainder = word.substring(1);
    if(!remainder) child.isWord = true;
    this._addNode(child, remainder);
  }

  remove(word) {
    if(!this.root) return;
    if(this.contains(word)) this._removeNode(this.root, word);
  }

  _removeNode(node, word) {
    if(!node || !word) return;
    node.prefixes--;
    const letter = word.charAt(0);

    const child = node.children[letter];
    if(child) {
      const remainder = word.substring(1);
      remainder ?
        (child.prefixes === 1 ?
          delete node.children[letter] : this._removeNode(child, remainder)) :
        (child.prefixes === 0 ?
          delete node.children[letter] : child.isWord = false);
    }
  }

  contains (word) {
    return this.root ? this._contains(this.root, word) : false;
  }

  _contains(node, word) {
    if(!node || !word) return false;
    const letter = word.charAt(0);
    const child = node.children[letter];
    if(child) {
      const remainder = word.substring(1);
      return (!remainder && child.isWord) ?
        true :
        this._contains(child, remainder);
    } else {
      return false;
    }
  }
}

module.exports = {Trie}
