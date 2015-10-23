import React, {
  Navigator,
  StyleSheet,
} from 'react-native';

import CardsContainer from './Cards';
import StacksContainer from './Stacks';

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default class App extends React.Component {

  renderScene = (route, navigator) => {
    // We need a navigation bar at the top
    // and a card counter at the bottom
    switch (route.name) {
      case 'cardList':
        return <CardsContainer navigator={navigator} />;
      case 'stackList':
      default:
        return <StacksContainer navigator={navigator} />;
    }
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'stackList'}}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromBottom;
        }}
      />
    );
  }
}
