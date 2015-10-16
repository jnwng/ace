var Firebase = require('firebase');

var firebaseRef = new Firebase('https://ace-coursera.firebaseio.com');

var cardsRef = firebaseRef.child('cards');

var firstCard = cardsRef.push();

firstCard.set({
  type: 'lecture',
  metadata: {
    lecture: {
      id: '75EsZ',
    }
  }
});

var contentRef = firebaseRef.child('cardContent');

contentRef.set({
  [firstCard.key()]: {
    text: 'some foo text'
  }
});

