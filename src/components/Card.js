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
    borderWidth: 3,
    borderRadius: 3,
    borderColor: '#000',
    padding: 10,

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
  }

  static shape = {
    type: React.PropTypes.string,
    notes: React.PropTypes.array,
    starred: React.PropTypes.bool
  }

  render() {
    var {card} = this.props;
    var {starred} = card;

    return (
      <SwipableCard style={styles.card} onSwipeComplete={this.props.showNextCard}>
        <View>
          <Button onPress={this.props.toggleStar.bind(this, card.id)}>
            <Text style={starred && styles.starred}>★</Text>
          </Button>
        </View>
        <View>
          {this.props.children}
        </View>
      </SwipableCard>
    );
  }
}
