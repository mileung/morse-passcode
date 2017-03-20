
import React from 'react';
import {
  Navigator,
  View,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native';

import Doorman from './Doorman';

class Login extends React.Component {
  state = {
    text: "What's the passcode?"
  }

  render() {
    return (
      <Doorman
        style={styles.container}
        onPress={(x, y) => {}}
        onRelease={(x, y) => {}}
        // passcode={[[0,109],[355,456],[525,591],[636,716],[985,1076],[1772,1897],[2201,2280]]} // shave and a hair cut
        passcode={[[0,84],[448,528],[960,1036],[1735,2432],[2829,3464],[3967,4696],[5094,5182],[5497,5578],[5935,6010]]} // SOS
        leeway={1000}
        onFail={input => {
          console.log('Failed', JSON.stringify(input));
          this.indicateWrongInput();
        }}
        onSuccess={input => {
          console.log('Success', JSON.stringify(input));
          this.props.navigator.push({ title: 'LoggedIn' });
        }}
        rippleDuration={2000}
        fadeOutDuration={1000}
        rippleColor="#ccf2ff"
        >
        <StatusBar barStyle="light-content" />
        <Text style={styles.message}>{this.state.text}</Text>
        {/* asdhuasd */}
      </Doorman>
    );
  }

  indicateWrongInput = () => {
    this.setState(
      { text: 'Incorrect passcode!' },
      () => setTimeout(() => this.setState({ text: "What's the passcode?" }), 1000)
    );
  }
};

const LoggedIn = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>We've been expecting you</Text>
    </View>
  );
};

const ROUTES = {
  Login,
  LoggedIn
};

export default class Example extends React.Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Login' }}
        renderScene={(route, navigator) => {
          let Component = ROUTES[route.title];
          return (<Component navigator={navigator} />);
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#33bbff'
  },
  message: {
    fontSize: 24,
    color: 'white'
  }
});
