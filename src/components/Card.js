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
    padding: 10,
    // can't enable this because of performance
    // shadowColor: '#4A5043',
    // shadowOpacity: 0.5,
    // shadowOffset: {
    //   height: 1,
    //   width: 0
    // },
    borderBottomColor: 'rgba(74,80,67, 0.5)',
    borderBottomWidth: 2,
    borderRightColor: 'rgba(74,80,67, 0.5)',
    borderRightWidth: 2,

    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  starred: {
    color: '#FFEB3B'
  }
});

export default class Card extends React.Component {

  static propTypes = {
    card: React.PropTypes.shape(Card.shape),
    children: React.PropTypes.any,
    toggleStar: React.PropTypes.func,
    showNextCard: React.PropTypes.func,
    showLinkedCards: React.PropTypes.func,
  }

  static shape = {
    type: React.PropTypes.string,
    notes: React.PropTypes.array,
    starred: React.PropTypes.bool
  }

  render() {
    var {card, showLinkedCards} = this.props;
    var {starred} = card;
          // <Button onPress={this.props.toggleStar.bind(this, card.id)}>
          // </Button>

    return (
      <SwipableCard style={styles.card} onSwipeComplete={this.props.showNextCard}>
        <View>
          <Text style={starred && styles.starred}>★</Text>
        </View>
        <View>
          {this.props.children}
        </View>
        <Button onPress={showLinkedCards.bind(this, card)}>
          <Text>Hints</Text>
        </Button>
      </SwipableCard>
    );
  }
}
