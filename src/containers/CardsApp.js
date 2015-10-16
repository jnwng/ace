import React, {
  StyleSheet,
  View
} from 'react-native';
import {connect} from 'react-redux/native';
import {bindActionCreators} from 'redux';

import Cards from '../components/Cards';
import * as CardActions from '../actions/cards';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

class CardsApp extends React.Component {
  render() {
    const {cards, dispatch} = this.props;
    const actions = bindActionCreators(CardActions, dispatch);

    return (
      <View style={styles.container}>
        <Cards cards={cards} actions={actions} />
      </View>
    );
  }
}

CardsApp.propTypes = {
  cards: React.PropTypes.array,
  dispatch: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {cards} = state;

  return {
    cards
  };
}

export default connect(mapStateToProps)(CardsApp);
