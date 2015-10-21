import React, {
  Text,
  View,
  StyleSheet
} from 'react-native';
import Button from '../common/Button';
import Card from '../Card';

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    backgroundColor: 'black',
  }
});

export default class QuestionCard extends React.Component {

  static propTypes = {
    card: React.PropTypes.any
  }

  render() {
    var choices = [1, 2, 3, 4];
    // Let's show a question, and four choices.

    return (
      <Card {...this.props}>
        <View>
          <Text>Some question</Text>
        </View>
        {choices.map((choice, index) =>
          <Button key={index}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={styles.checkbox} />
              <Text style={{flex: 1}}>
                {index} answer
              </Text>
            </View>
          </Button>
        )}
      </Card>
    );
  }
}
