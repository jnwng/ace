import React, {
  Text,
  TextInput,
  StyleSheet,
  View
} from 'react-native';
import Button from '../common/Button';

var styles = StyleSheet.create({
  textInput: {
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: '#888888'
  }
});

export class AddNoteButton extends React.Component {

  static propTypes = {
    addNote: React.PropTypes.func
  }

  onPress = () => {
    this.setState({
      showing: true,
    });
  }

  onAddNoteConfirm = () => {
    this.props.addNote({
      cardId: 'foo',
      text: this.state.text
    });
  }

  constructor() {
    super();
    this.state = {
      showing: false
    };
  }

  render() {
    return (
      <View>
        <Button>
          <Text onPress={this.onPress.bind(this)}> + Add a note</Text>
        </Button>
        {this.state.showing && (
          <View>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
            <Button onPress={this.onAddNoteConfirm.bind(this)}>
              <Text>Add</Text>
            </Button>
          </View>
        )}
      </View>
    );
  }
}

export default class Notes extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object,
    notes: React.PropTypes.array,
  }

  static defaultProps = {
    notes: []
  }

  render() {
    var {actions} = this.props;

    return (
      <View>
        {this.props.notes.map(note =>
          <View key={note.id}>
            <Text>{note.text}</Text>
          </View>
        )}
        <AddNoteButton addNote={actions.addNote} />
        <Text>49 other people took notes on this</Text>
      </View>
    );
  }
}
