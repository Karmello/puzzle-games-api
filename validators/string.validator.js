module.exports = {
  noSpecialChars: {
    type: 'special_chars_found',
    message: 'no special chars allowed',
    validator: function(string) {
      let regex = /([`\-=[\]\\;',./~!@#$%^&*()+{}|:"<>?_])/;
      return string.search(regex) === -1;
    }
  },
  noMultipleWords: {
    type: 'multiple_words_found',
    message: 'no multiple words allowed',
    validator: function(string) {
      return string.search(/([ ])/) === -1;
    }
  },
  length: function(min, max) {
    return {
      type: 'wrong_length',
      message: 'length should be between ' + min + ' and ' + max,
      validator: function(string) {
        return string.length >= min && string.length <= max;
      }
    }
  }
}