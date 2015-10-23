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
import InfoCard from '../components/cards/InfoCard';
import QuestionCard from '../components/cards/QuestionCard';
import * as CardActions from '../actions/cards';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8AA1B1',
    padding: 10,
    paddingTop: 25,
    paddingBottom: 100
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
    };
  }

  renderCard = (card, index) => {
    const {actions, showingLinkedCards, cards} = this.props;
    // Lazy way to handle rendering a react component with the same id twice.
    // Ignore the base card of the stack,
    // since that will be shared across the render of the stacked and the linked cards
    // May be obviated by a switch in how we render our linked cards.
    var key = card.id + (showingLinkedCards && index !== cards.length - 1 ? 'linked' : '');

    const config = {
      key,
      card,
      // There are performance issues when animating more than just a few cards.
      // Ultimately we only need to render the top two (since those are the only visible cards).
      shouldAnimateEntrance: this.state.shouldAnimateEntrance && index < 2,
      shouldInset: index !== 0,
      ...actions
    };

    switch (card.type) {
      case 'question':
        return <QuestionCard {...config} />;
      case 'info':
      default:
        return <InfoCard {...config} />;
    }
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
            .map(this.renderCard)
            // There's no concept of z-index in RN - use render order to determine layering instead.
            .reverse()
          }
        </Animated.View>
      </View>
    );
  }
}

function mapStateToProps({cardStore: {cardsToShow: {currentIndex, cards, showingLinkedCards}}}) {
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
