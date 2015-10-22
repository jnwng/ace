import React, {
  ListView,
  View,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

var styles = StyleSheet.create({
  row: {
    flex: 1,
    height: 80,
    borderColor: 'black',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const demoRows = [{
  text: 'A Basic Stack',
  stackId: 1,
}, {
  text: 'A Stack with Hints',
  stackId: 2,
}, {
  text: 'A Stack with Something New',
  stackId: 3,
}, {
  text: 'A Stack of People',
  stackId: 4,
}];

export default class StacksContainer extends React.Component {

  static propTypes = {
    navigator: React.PropTypes.any
  }

  onRowPress = (stackId) => {
    this.props.navigator.push({
      name: 'cardList',
      stackId,
      sceneConfig: Navigator.SceneConfigs.FloatFromRight,
    });
  }

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(demoRows),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={({text, stackId}) => (
          <TouchableHighlight onPress={this.onRowPress.bind(stackId)}>
            <View style={styles.row}>
              <Text>{text}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    );
  }
}
