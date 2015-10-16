import React, {
  AppRegistry,
} from 'react-native';
import CardsApp from './containers/CardsApp';
import {Provider} from 'react-redux/native';
import configureStore from './store/configureStore';

const store = configureStore();

class AppProvider extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {() => <CardsApp />}
      </Provider>
    );
  }
}
AppRegistry.registerComponent('cardular', () => AppProvider);
