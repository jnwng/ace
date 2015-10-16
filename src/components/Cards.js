import React, {
  View
} from 'react-native';
import Card from './Card';
import LectureCard from './cards/LectureCard';

export default class Cards extends React.Component {
  render() {
    var {cards, actions} = this.props;

    return (
      <View>
        {cards.map(card =>
          <LectureCard key={card.id} card={card} {...actions} />
        )}
      </View>
    );
  }
}

Cards.propTypes = {
  actions: React.PropTypes.object,
  cards: React.PropTypes.arrayOf(
    React.PropTypes.shape(Card.shape)
  ),
};
