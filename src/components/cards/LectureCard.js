import React, {
  Text,
  View,
  StyleSheet
} from 'react-native';
import Card from '../Card';

export default class LectureCard extends React.Component {

  static propTypes = {
    index: React.PropTypes.number,
    text: React.PropTypes.string,
    card: React.PropTypes.any
  }

  render() {
    return (
      <Card {...this.props}>
        <Text>Index: {this.props.card.index}</Text>
        <Text>Index: {this.props.card.index}</Text>
      </Card>
    );
  }
}
