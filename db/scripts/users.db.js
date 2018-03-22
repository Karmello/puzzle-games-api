db.getCollection('users').update({}, {
  $set: {
    uiState: {
      gamesPage: {
        category: 'chess',
        options: {
          BossPuzzle: { mode: 'NUM', dimension: '3' }
        }
      },
      gamePage: {
        infoExpanded: false,
        bestScoreExpanded: false
      }
    }
  }
}, { multi: true });