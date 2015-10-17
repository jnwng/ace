import React, {
  View
} from 'react-native';
import Card from './Card';
import LectureCard from './cards/LectureCard';

export default class Cards extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object,
    cards: React.PropTypes.arrayOf(
      React.PropTypes.shape(Card.shape)
    )
  }

  render() {
    var {cards, actions} = this.props;

    return (
      <View>
        {cards.reverse().map((card, index) =>
          <LectureCard key={card.id} card={card} {...actions} />
        )}
      </View>
    );
  }
}
