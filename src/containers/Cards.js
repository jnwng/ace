import React, {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {connect} from 'react-redux/native';
import {bindActionCreators} from 'redux';

import Button from '../components/common/Button';
import LectureCard from '../components/cards/LectureCard';
import QuestionCard from '../components/cards/QuestionCard';
import * as CardActions from '../actions/cards';

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const DOWN_SWIPE_THRESHOLD = 40;

class CardsApp extends React.Component {

  static propTypes = {
    cards: React.PropTypes.array,
    actions: React.PropTypes.object.isRequired,
    showingLinkedCards: React.PropTypes.bool
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({

      onMoveShouldSetPanResponder: (e, gestureState) => {
        // Respond when we have a down-swipe.
        return gestureState.dy > 0;
      },

      onPanResponderRelease: (e, {dy}) => {
        if (dy > DOWN_SWIPE_THRESHOLD) {
          this.props.actions.showLastCard();
        }
      }
    });
  }

  componentDidMount() {
    this.props.actions.fetchCards();
  }

  render() {
    const {cards, actions} = this.props;

    return (
      <View style={styles.container}>
        <View style={{height: 40}}>
          {this.props.showingLinkedCards &&
            <Button onPress={actions.hideLinkedCards}>
              <Text style={{color: 'white'}}>
                X
              </Text>
            </Button>
          }
        </View>
        <Animated.View
          style={styles.container}
          {...this._panResponder.panHandlers}>
          {cards
            .slice(0, 2)
            .reverse()
            .map((card, index) =>
              // Do some dynamic stuff later
              // <QuestionCard key={card.id} card={card} {...actions} />
              <LectureCard key={card.id} card={card} {...actions} />
            )
          }
        </Animated.View>
      </View>
    );
  }
}

function mapStateToProps({cardsToShow: {currentIndex, cards, showingLinkedCards}}) {
  return {
    cards: cards.slice(currentIndex),
    showingLinkedCards,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CardActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsApp);
