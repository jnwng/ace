{
  cards: {
    someFooId: {
      id: '52312~0',
      type: 'lecture'
      metadata: {
        notes: {
          someNoteId: true,
          someNoteId2: true,
        },
        starCount: 0,
        links: {
          someFooId2: true
        }
      }
    }
  },
  cardContent: {
    someFooId: {
      text: 'some Text'
    },
    someAssessQuestion: {
      question: 'some question',
      correctAnswer: 'someANswerId',
      answers: {
        answerId: {
          text: 'someText'
        },
        someAnswerId: {
          text: 'someText'
        }
      }
    }
  },
  userCardContent: {
    randomId: {
      text: 'user-generated content'
    }
  },
  notes: {
    someNoteId: {
      text: 'someText',
      author: bob,
    },
    someNoteId: {
      text: 'someOtherText'
      author: fred
    }
  },
  users: {
    fred: {
      stars: {},
      notes: {
        someNoteId: true
      },
      userCardContent: {
        someFooId: randomId
      }
    },
    bob: {
      stars: {
        someFooId: true
      },
      notes: {
        someNoteId: true
      }
    }
  }
}
