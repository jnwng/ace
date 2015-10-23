import React, {
  Text,
  TouchableHighlight,
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
    borderWidth: 2,
    borderColor: 'black',
    marginLeft: 5,
    marginRight: 5
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: '#8AA1B1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  success: {
    backgroundColor: '#B9D8C2',
  }
});

export default class QuestionCard extends React.Component {

  static propTypes = {
    card: React.PropTypes.any
  }

  onAnswerPress = (answerId) => {
    // TODO(jon): this should be an action
    this.setState({answerId});
  }

  onSubmitPress = () => {
    this.setState({success: true});
  }

  constructor(props) {
    super(props);
    this.state = {
      answerId: null,
    };
  }

  render() {
    var {card} = this.props;

    return (
      <Card {...this.props}>
        <View style={{marginBottom: 15}}>
          <Text>{card.prompt}</Text>
        </View>
        {Object.keys(card.answers).map((key, index) =>
          <TouchableHighlight onPress={this.onAnswerPress.bind(this, key)} key={key}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 10}}>
              <View style={styles.checkbox}>
                {key === this.state.answerId && <Text>✓</Text>}
              </View>
              <Text style={{flex: 1}}>
                {card.answers[key]}
              </Text>
            </View>
          </TouchableHighlight>
        )}
        <View style={{alignItems: 'center', marginTop: 15}}>
          {this.state.answerId && (
            <TouchableHighlight onPress={this.onSubmitPress}>
              <View style={[styles.button, this.state.success && styles.success]}>
                {this.state.success ?
                  <Text style={{color: 'white', fontSize: 18}}>Correct!</Text> :
                  <Text style={{color: 'white', fontSize: 18}}>Submit</Text>
                }
              </View>
            </TouchableHighlight>
          )}
        </View>
      </Card>
    );
  }
}
