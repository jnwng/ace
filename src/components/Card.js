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
    borderWidth: 1,
    borderColor: 'rgba(74,80,67, 0.5)',
    borderBottomWidth: 2,
    borderRightWidth: 2,

    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  starred: {
    color: '#FFEB3B'
  },

  hint: {
    height: 30,
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

    return (
      <SwipableCard style={styles.card} onSwipeComplete={this.props.showNextCard}>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
          <View style={{flex: 1}}>
            <View>
              <Text style={starred && styles.starred}>★</Text>
            </View>
            <View>
              {this.props.children}
            </View>
          </View>
          <Button style={styles.hint} onPress={showLinkedCards.bind(this, card)}>
            <Text>Hints</Text>
          </Button>
        </View>
      </SwipableCard>
    );
  }
}
