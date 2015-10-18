import React, {
  Text,
  View,
  StyleSheet
} from 'react-native';
import Card from '../Card';

var styles = StyleSheet.create({
  card: {
    // position: 'absolute',
    // alignItems: 'center'
  }
});

export default class LectureCard extends React.Component {

  static propTypes = {
    index: React.PropTypes.number,
    text: React.PropTypes.string,
    card: React.PropTypes.any
  }

  render() {
    return (
      <View style={styles.card}>
        <Card {...this.props}>
          <Text>Index: {this.props.card.index}</Text>
        </Card>
      </View>
    );
  }
}
