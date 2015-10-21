import React, {
  TouchableHighlight,
  StyleSheet,
  View
} from 'react-native';

var styles = StyleSheet.create({
  button: {
    padding: 10,
  },

  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  }
});

export default class Button extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    style: View.propTypes.style,
    onPress: React.PropTypes.func
  }

  render() {
    return (
      <TouchableHighlight style={[styles.wrapper, this.props.style]} onPress={this.props.onPress}>
        <View style={styles.button}>
          {this.props.children}
        </View>
      </TouchableHighlight>
    );
  }
}
