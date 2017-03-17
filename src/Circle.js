import React from 'react';
import {
  Animated,
  View
} from 'react-native';

export default class Circle extends React.Component {
  static propTypes = {
    toSize: React.PropTypes.number, // preferable the size of the Doorman View
    color: React.PropTypes.string,
    initialOpacity: React.PropTypes.number,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    zIndex: React.PropTypes.number,
    onInvisible: React.PropTypes.func
  }

  static defaultProps = {
    toSize: 1500,
    color: '#ccc',
    initialOpacity: 0.5,
    x: 0,
    y: 0,
    zIndex: null,
    onInvisible: () => {}
  }

  componentWillMount() {
    this.size = new Animated.Value(0);
    this.opacity = new Animated.Value(this.props.initialOpacity);
  }

  render() {
    let { zIndex, color, x, y } = this.props;

    return (
      <View
        style={{ // this is the equivalent of transform-origin: 50% 50%
        zIndex,
        top: y,
        left: x,
        height: 0,
        width: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
        }}>
        <Animated.View
          style={{
            height: this.size,
            width: this.size,
            borderRadius: this.size,
            opacity: this.opacity,
            backgroundColor: color,
          }}
        />
      </View>
    );
  }

  componentDidMount() {
    let { duration, toSize } = this.props;
    Animated.timing(this.size, {
      // duration,
      toValue: toSize
    }).start();
  }

  fadeOut = () => {
    console.log('fadeOut')
    let { duration, onInvisible } = this.props;
    Animated.timing(this.opacity, {
      // duration,
      toValue: 0
    }).start(() => {
      onInvisible();
      console.log('onInvisible')
    });
  }
}
