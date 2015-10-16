import React, {
  View
} from 'react-native';

export default class Note extends React.Component {
  render() {
    return (
      <View>
        <Text>
          {this.props.note}
        </Text>
      </View>
    );
  }
}

Note.propTypes = {
  note: React.PropTypes.string.isRequired
};
