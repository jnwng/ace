import React, {
  Text,
  StyleSheet,
  View
} from 'react-native';
import Button from './common/Button';
import Swipable from './common/Swipable';

var styles = StyleSheet.create({
  card: {
    backgroundColor: '#eee',
    borderWidth: 3,
    borderRadius: 3,
    borderColor: '#000',
    width: 300,
    height: 300,
    padding: 10,
    top: 0
  },

  starred: {
    color: '#FFEB3B'
  }
});

export default class Card extends React.Component {

  static propTypes = {
    card: React.PropTypes.shape(Card.shape),
    children: React.PropTypes.any,
    toggleStar: React.PropTypes.func
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
      <Swipable style={styles.card}>
        <View>
          <Button onPress={this.props.toggleStar.bind(this, card.id)}>
            <Text style={starred && styles.starred}>★</Text>
          </Button>
        </View>
        <View>
          {this.props.children}
        </View>
      </Swipable>
    );
  }
}
