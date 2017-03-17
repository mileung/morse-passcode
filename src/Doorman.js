
import React from 'react';
import {
  View,
  PanResponder
} from 'react-native';

import Circle from './Circle';

export default class Doorman extends React.Component {
  static propTypes = {
    ...View.propTypes,
    onPress: React.PropTypes.func,
    onRelease: React.PropTypes.func,
    passcode: React.PropTypes.arrayOf(React.PropTypes.array),
    leeway: React.PropTypes.number,
    onFail: React.PropTypes.func,
    onSuccess: React.PropTypes.func,
    ripple: React.PropTypes.bool
  }

  static defaultProps = {
    onPress: () => {},
    onRelease: () => {},
    passcode: [[]],
    leeway: 500,
    onFail: () => {},
    onSuccess: () => {},
    ripple: true
  }

  state = {
    circles: []
  }

  componentWillMount() {
    this.endDelay = this.getEndDelay()
    this.input = []
    this.currentEvent = []
    this.firstEventTime = null
    this.lastEventTime = null
    this.endTimer = null
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, { x0, y0 }) => {
        let { onPress, ripple } = this.props;
        let now = Date.now();
        onPress(x0, y0);

        if (!this.firstEventTime) {
          this.firstEventTime = now
        }

        if (ripple) {
          this.createCircle(x0, y0);
        }

        this.currentEvent.push(now - this.firstEventTime);
        clearTimeout(this.endTimer);
      },
      onPanResponderRelease: (evt, { x0, y0, dx, dy}) => {
        let now = Date.now();
        this.props.onRelease(x0 + dx, y0 + dy);
        this.currentEvent.push(now - this.firstEventTime);
        this.input.push(this.currentEvent);
        this.currentEvent = [];
        this.endTimer = setTimeout(this.checkInput, this.endDelay);
      }
    });
  }

  render() {
    return (
      <View
        {...this.props}
        {...this._panResponder.panHandlers}
        >
        {this.props.children}
        {this.state.circles}
      </View>
    );
  }

  createCircle = (x, y) => {
    let circles = this.state.circles;
    circles.push(
      <Circle
        key={this.state.circles.length}
        x={x}
        y={y}
      />
    );

    this.setState({ circles });
  }

  checkInput = () => {
    let { passcode, leeway, onSuccess, onFail } = this.props;
    let passed = false;

    if (this.input.length == passcode.length) {
      for (let i = 0; i < passcode.length; i++) {
        let inputEvent = this.input[i];
        let passcodeEvent = passcode[i];
        let pressTimeDifference = Math.abs(inputEvent[0] - passcodeEvent[0]);
        let releaseTimeDifference = Math.abs(inputEvent[1] - passcodeEvent[1]);
        if ((pressTimeDifference > leeway) || (releaseTimeDifference > leeway)) {
          break;
        } else if (i == passcode.length - 1) {
          passed = true;
        }
      }
    }

    if (passed) {
      onSuccess(this.input);
    } else {
      onFail(this.input);
    }

    this.firstEventTime = null;
    this.input = [];
  }

  getEndDelay = () => {
    let longestPauseInPasscode = 0; // pause being the time between releasing and pressing again
    let { passcode, leeway } = this.props;

    for (let i = 1; i < passcode.length; i++) {
      let event = passcode[i - 1];
      let nextEvent = passcode[i];
      let pause = nextEvent[0] - event[1];
      if (pause > longestPauseInPasscode) {
        longestPauseInPasscode = pause;
      }
    }

    return longestPauseInPasscode + leeway;
  }
}
