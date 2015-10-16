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
    const {cards, actions} = this.props;

    return (
      <View style={styles.container}>
        <Cards cards={cards} actions={actions} />
      </View>
    );
  }
}

CardsApp.propTypes = {
  cards: React.PropTypes.array,
  actions: React.PropTypes.object.isRequired
};

function mapStateToProps({cards}) {
  return {
    cards
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CardActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsApp);
