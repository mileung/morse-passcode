
import React from 'react';
import {
  View,
  PanResponder
} from 'react-native';

export default class Doorman extends React.Component {
  static propTypes = {
    ...View.propTypes,
    onPress: React.PropTypes.func,
    onRelease: React.PropTypes.func,
    passcode: React.PropTypes.arrayOf(React.PropTypes.array),
    leeway: React.PropTypes.number,
    scaleInput: React.PropTypes.bool,
    onFail: React.PropTypes.func,
    onSuccess: React.PropTypes.func
  }

  static defaultProps = {
    onPress: () => {},
    onRelease: () => {},
    passcode: [[]],
    leeway: 0,
    scaleInput: false,
    onFail: () => {},
    onSuccess: () => {}
  }

  componentWillMount() {
    console.log('React.PropTypes', typeof React.PropTypes.number)
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, { x0, y0 }) => {
        this.props.onPress(x0, y0);
      },
      onPanResponderRelease: (evt, { x0, y0, dx, dy}) => {
        this.props.onRelease(x0 + dx, y0 + dy);
      }
    });
  }

  render() {
    return (
      <View
        {...this.props}
        {...this._panResponder.panHandlers}
        >

      </View>
    );
  }
}
