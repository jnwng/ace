import React, {
  AppRegistry,
} from 'react-native';
import AceApp from './containers/AceApp';
import {Provider} from 'react-redux/native';
import configureStore from './store/configureStore';

const store = configureStore();

class AppProvider extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {() => <AceApp />}
      </Provider>
    );
  }
}
AppRegistry.registerComponent('ace', () => AppProvider);
AppRegistry.registerComponent('main', () => AppProvider);
