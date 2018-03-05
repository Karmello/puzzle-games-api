module.exports = {
  noSpecialChars: {
    type: 'special_chars_found',
    message: 'no special chars allowed',
    validator: function(string) {
      let regex = /([`\-=[\]\\;',./~!@#$%^&*()+{}|:"<>?_])/;
      if (string.search(regex) != -1) { return false; } else { return true; }
    }
  },
  noMultipleWords: {
    type: 'multiple_words_found',
    message: 'no multiple words allowed',
    validator: function(string) {
      if (string.search(/([ ])/) != -1) { return false; } else { return true; }
    }
  },
  length: function(min, max) {
    return {
      type: 'wrong_length',
      message: 'length should be between ' + min + ' and ' + max,
      validator: function(string) {
        if (string.length < min || string.length > max) { return false; } else { return true; }
      }
    }
  }
};