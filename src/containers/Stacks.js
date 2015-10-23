import React, {
  ListView,
  View,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux/native';
import {bindActionCreators} from 'redux';
import * as CardActions from '../actions/cards';

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

var stacks = require('../../testData.json').stacks;

// TODO(jon): load this via redux
const demoRows = Object.keys(stacks).map(key => {
  var stack = stacks[key];
  stack.stackId = key;
  return stack;
});

class StacksContainer extends React.Component {

  static propTypes = {
    navigator: React.PropTypes.any,
    actions: React.PropTypes.object
  }

  onRowPress = (stackId, e) => {
    var {showStack} = this.props.actions;
    showStack(stackId);

    this.props.navigator.push({
      name: 'cardList',
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
        renderRow={({name, stackId}) => (
          <TouchableHighlight onPress={this.onRowPress.bind(this, stackId)}>
            <View style={styles.row}>
              <Text>{name}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CardActions, dispatch)
  };
}

export default connect(
  () => ({}),
  mapDispatchToProps
)(StacksContainer);

