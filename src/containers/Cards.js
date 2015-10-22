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
    backgroundColor: '#8AA1B1',
    padding: 10
  },

  showingLinkedCards: {
    backgroundColor: '#4A5043'
  }
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

  // TODO(jon): clean up this logic and better understand when we want (or don't want) to animate in.
  componentWillReceiveProps(nextProps) {
    if (!this.props.showingLinkedCards && nextProps.showingLinkedCards) {
      // In this case, this is the first time we're showing linked cards.
      this.setState({shouldAnimateEntrance: true});
    } else if (this.props.showingLinkedCards && !nextProps.showingLinkedCards) {
      // In this case, we're coming back from showing linked cards
      this.setState({shouldAnimateEntrance: false});
    } else if (this.props.cards.length < nextProps.cards.length) {
      // Naively, this we're going backwards or we're adding for the first time.
      this.setState({shouldAnimateEntrance: true});
    } else {
      this.setState({shouldAnimateEntrance: false});
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      shouldAnimateEntrance: false,
      shouldAnimateExit: false
    };
  }

  render() {
    const {cards, actions, showingLinkedCards} = this.props;

    return (
      <View style={[styles.container, showingLinkedCards && styles.showingLinkedCards]}>
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
            // .slice(0, 2)
            .reverse()
            .map((card, index) => {
              var realIndex = cards.length - 1 - index;
              // rendering the slice is problematic because of the first card in the stack disappearing when the hints appear
              // Do some dynamic stuff later
              // <QuestionCard key={card.id} card={card} {...actions} />
              return (
                <LectureCard
                  key={card.id}
                  card={card}
                  shouldAnimateEntrance={this.state.shouldAnimateEntrance}
                  shouldAnimateExit={this.state.shouldAnimateExit}
                  isShowing={realIndex < 2}
                  {...actions} />
              );

            })
          }
        </Animated.View>
        <View style={{height: 80}} />
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
