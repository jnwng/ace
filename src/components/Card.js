import React, {
  Text,
  TouchableHighlight,
  StyleSheet,
  View
} from 'react-native';

var styles = StyleSheet.create({
  button: {
    backgroundColor: '#eeeeee',
    padding: 10,
  },
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  card: {
    borderWidth: 3,
    borderRadius: 3,
    borderColor: '#000',
    width: 300,
    height: 300,
    padding: 10
  },

  starred: {
    color: '#FFEB3B'
  }
});

class Button extends React.Component {
  render() {
    return (
      <TouchableHighlight style={styles.wrapper} onPress={this.props.onPress}>
        <View style={styles.button}>
          {this.props.children}
        </View>
      </TouchableHighlight>
    );
  }
}

Button.propTypes = {
  children: React.PropTypes.node,
  onPress: React.PropTypes.func
};

export default class Card extends React.Component {
  render() {
    var {card} = this.props;
    var {starred} = card;

    return (
      <View style={styles.card}>
        <View>
          <Button onPress={this.props.toggleStar.bind(this, card.id)}>
            <Text style={starred && styles.starred}>★</Text>
          </Button>
        </View>
        {this.props.children}
      </View>
    );
  }
}

Card.shape = {
  type: React.PropTypes.string,
  notes: React.PropTypes.array,
  starred: React.PropTypes.bool
};

Card.propTypes = {
  card: React.PropTypes.shape(Card.shape),
  children: React.PropTypes.any,
  toggleStar: React.PropTypes.func
};
