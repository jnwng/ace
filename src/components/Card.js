import React, {
  Text,
  StyleSheet,
  View
} from 'react-native';
import Button from './common/Button';
import SwipableCard from './common/SwipableCard';

var styles = StyleSheet.create({
  card: {
    backgroundColor: '#eee',
    borderRadius: 3,
    padding: 40,
    // shadowColor: '#4A5043',
    // shadowOpacity: 0.5,
    // shadowOffset: {
    //   height: 1,
    //   width: 0
    // },
    borderWidth: 1,
    borderColor: 'rgba(74,80,67, 0.5)',
    borderBottomWidth: 2,
    borderRightWidth: 2,

    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },

  starred: {
    color: '#FFEB3B'
  },

  hint: {
    height: 30,
    backgroundColor: '#FFCB47',
    position: 'absolute',
    bottom: -30
  }
});

export default class Card extends React.Component {

  static propTypes = {
    card: React.PropTypes.shape(Card.shape),
    children: React.PropTypes.any,
    toggleStar: React.PropTypes.func,
    showNextCard: React.PropTypes.func,
    showLinkedCards: React.PropTypes.func,
    shouldAnimateEntrance: React.PropTypes.bool,
    shouldInset: React.PropTypes.bool,
  }

  static shape = {
    type: React.PropTypes.string,
    notes: React.PropTypes.array,
    starred: React.PropTypes.bool
  }

  render() {
    var {card, showLinkedCards} = this.props;
    var {starred} = card;

    return (
      <SwipableCard
        style={styles.card}
        onSwipeComplete={this.props.showNextCard}
        shouldAnimateEntrance={this.props.shouldAnimateEntrance}
        shouldInset={this.props.shouldInset}>
        <View style={{flex: 1}}>
          {this.props.children}
        </View>
        {card.linkedCards &&
          <Button style={styles.hint} onPress={showLinkedCards.bind(this, card)}>
            <Text>Hints</Text>
          </Button>
        }
      </SwipableCard>
    );
  }
}
