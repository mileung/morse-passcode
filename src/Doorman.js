
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

  input = []

  currentEvent = []

  firstEventTime = null

  lastEventTime = null

  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, { x0, y0 }) => {
      let now = Date.now();
      this.props.onPress(x0, y0);
      if (!this.firstEventTime) {
        this.firstEventTime = now
      }
      this.currentEvent.push(now - this.firstEventTime);
    },
    onPanResponderRelease: (evt, { x0, y0, dx, dy}) => {
      let now = Date.now();
      this.props.onRelease(x0 + dx, y0 + dy);
      this.currentEvent.push(now - this.firstEventTime);
      this.input.push(this.currentEvent);
      this.currentEvent = [];
      console.log('THIS.INPUT', this.input)
    }
  });

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
