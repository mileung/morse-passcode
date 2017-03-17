
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
    ripple: React.PropTypes.bool,
    rippleDuration: React.PropTypes.number,
    fadeOutDuration: React.PropTypes.number,
    rippleColor:React.PropTypes.string,
    initialOpacity: React.PropTypes.number
  }

  static defaultProps = {
    onPress: () => {},
    onRelease: () => {},
    passcode: [[]],
    leeway: 500,
    onFail: () => {},
    onSuccess: () => {},
    ripple: true,
    rippleDuration: 500,
    fadeOutDuration: 200,
    rippleColor: '#ccc',
    initialOpacity: 0.5
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
    this.checkInputTimer = null
    this.removeCircleTimer = null;
    this.circleSize = 0;
    this.lastReleaseTime = 0;

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

        if (this.removeCircleTimer) {
          clearTimeout(this.removeCircleTimer);
        }

        this.currentEvent.push(now - this.firstEventTime);
        clearTimeout(this.checkInputTimer);
      },
      onPanResponderRelease: (evt, { x0, y0, dx, dy}) => {
        this.lastReleaseTime = Date.now();
        this.props.onRelease(x0 + dx, y0 + dy);
        this.currentEvent.push(this.lastReleaseTime - this.firstEventTime);
        this.input.push(this.currentEvent);
        this.currentEvent = [];
        this.checkInputTimer = setTimeout(this.checkInput, this.endDelay);
        this.refs[this.state.circles.length - 1].fadeOut()
      }
    });
  }

  render() {
    let { rippleDuration, fadeOutDuration, rippleColor } = this.props;
    return (
      <View
        {...this.props}
        {...this._panResponder.panHandlers}
        onLayout={this.setCircleSize}
        >
        {this.props.children}
        {this.state.circles.map(({ x, y }, i) => {
          return (
            <Circle
              key={i}
              ref={`${i}`}
              x={x}
              y={y}
              rippleDuration={rippleDuration}
              fadeOutDuration={fadeOutDuration}
              color={rippleColor}
              toSize={this.circleSize}
            />
          );
        })}
      </View>
    );
  }

  createCircle = (x, y) => {
    let circles = this.state.circles;
    circles.push({ x, y });
    this.setState({ circles });
  }

  checkInput = () => {
    let { passcode, leeway, onSuccess, onFail, fadeOutDuration } = this.props;
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

    if (Date.now() - this.lastReleaseTime >= fadeOutDuration && this.input.length === this.state.circles.length) {
      this.setState({ circles: [] });
    } else {
      this.removeCircleTimer = setTimeout(() => this.setState({ circles: [] }), fadeOutDuration - this.endDelay);
    }

    this.firstEventTime = null;
    this.input = [];
  }

  getEndDelay = () => {
    let longestPauseInPasscode = 0; // pause being the time between releasing and pressing again
    let { passcode, leeway, rippleDuration, fadeOutDuration } = this.props;

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

  setCircleSize = ({ nativeEvent }) => {
    let { layout } = nativeEvent;
    let viewDiagonalLength = Math.sqrt(Math.pow(layout.width, 2) + Math.pow(layout.height, 2));
    this.circleSize = viewDiagonalLength * 2;
  }
}
