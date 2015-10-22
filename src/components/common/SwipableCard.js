import React, {
  Animated,
  PanResponder,
  View
} from 'react-native';

function clamp(value, min, max) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  } else {
    return value;
  }
}

const SWIPE_THRESHOLD = -120;

export default class Swipable extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    style: View.propTypes.style,
    shouldAnimateEntrance: React.PropTypes.bool,
    shouldAnimateExit: React.PropTypes.bool,

    onSwipeComplete: React.PropTypes.func,
  }

  static defaultProps = {
    onSwipeComplete: () => {}
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({

      onMoveShouldSetPanResponder: (e, gestureState) => {
        return gestureState.dy < 0;
      },

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderTerminationRequest: () => {
        // If we are ever the responder, we shouldn't release it until
        // the user releases the card (which is implicit since release will trigger the whole lifecycle)
        return false;
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (this.state.pan.y._value < SWIPE_THRESHOLD) {
          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98
          }).start(this.resetState);
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start();
        }
      }
    });
  }

  componentDidMount() {
    if (this.props.shouldAnimateEntrance) {
      this.animateEntrance();
    }
  }

  constructor(props) {
    super(props);

    var startValue;
    if (props.shouldAnimateEntrance) {
      var x = Math.random() < 0.5 ? -50 : 200;
      startValue = new Animated.ValueXY({x, y: -250});
    } else {
      startValue = new Animated.ValueXY();
    }

    this.state = {
      pan: startValue
    };
  }

  animateEntrance() {
    Animated.spring(this.state.pan, {
      toValue: {x: 0, y: 0},
      friction: 10
    }).start();
  }

  animateExit() {
    Animated.spring(this.state.pan, {
      toValue: {x: 350, y: -500},
      friction: 10
    }).start();
  }

  resetState = () => {
    // i dont think we actually need the next two lines
    this.state.pan.setValue({x: 0, y: 0});
    this.props.onSwipeComplete();
  }

  render() {
    var {pan} = this.state;
    var [translateX, translateY] = [pan.x, pan.y];

    var rotate = pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['-30deg', '0deg', '30deg']
    });

    var animatedCardStyles = {
      transform: [{translateX}, {translateY}, {rotate}],
    };

    return (
      <Animated.View
        style={[this.props.style, animatedCardStyles]}
        {...this._panResponder.panHandlers}>
        {this.props.children}
      </Animated.View>
    );

  }
}
