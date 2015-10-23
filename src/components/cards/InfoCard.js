import React, {
  Text,
  View,
  StyleSheet
} from 'react-native';
import Card from '../Card';

export default class InfoCard extends React.Component {

  static propTypes = {
    index: React.PropTypes.number,
    text: React.PropTypes.string,
    card: React.PropTypes.any
  }

  render() {
    return (
      <Card {...this.props}>
        <Text>{this.props.card.content}</Text>
      </Card>
    );
  }
}
