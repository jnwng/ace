import React, {
  Text,
  View
} from 'react-native';
import {connect} from 'react-redux/native';
import {bindActionCreators} from 'redux';

import Cards from '../components/Cards';
import * as CardActions from '../actions/cards';
import Button from '../components/common/Button';

class CardsApp extends React.Component {

  static propTypes = {
    cards: React.PropTypes.array,
    actions: React.PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.actions.fetchCards();
  }

  render() {
    const {cards, actions} = this.props;

    return (
      <View style={{flex: 1}}>
        <Cards cards={cards} actions={actions} />
        <View style={{marginTop: 300, flex: 1, flexDirection: 'row'}}>
          <Button style={{position: 'absolute', bottom: 0}} onPress={actions.showLastCard}>
            <Text>Show Last Card</Text>
          </Button>
          <Button style={{position: 'absolute', bottom: 0}} onPress={actions.showNextCard}>
            <Text>Show Next Card</Text>
          </Button>
        </View>
      </View>
    );
  }
}

function mapStateToProps({cardsToShow: {currentIndex, cards}}) {
  return {
    cards: cards.slice(currentIndex)
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
