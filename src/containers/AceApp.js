import React, {
  Navigator,
  StyleSheet,
  View,
} from 'react-native';

import CardsContainer from './Cards';

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default class App extends React.Component {

  renderScene = (route, navigator) => {
    return (
      <CardsContainer />
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
