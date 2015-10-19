import React, {
  Navigator,
  StyleSheet,
  View,
} from 'react-native';

import CardsContainer from './Cards';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf333',
  }
});

export default class App extends React.Component {

  renderScene = (route, navigator) => {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 2, backgroundColor: 'red'}} />
        <View style={{flex: 7, padding: 10}}>
          <CardsContainer />
        </View>
        <View style={{flex: 1}} />
      </View>
    );
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'cardList'}}
        renderScene={this.renderScene}
      />
    );
  }
}
