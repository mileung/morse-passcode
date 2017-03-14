
import React from 'react';
import {
  Navigator,
  View,
  Text,
  StyleSheet
} from 'react-native';

import Doorman from './Doorman';

const Login = ({ navigator }) => {
  return (
    <Doorman
      style={styles.container}
      onPress={(x, y) => console.log(x, y)}
      onRelease={(x, y) => console.log(x, y)}
      passcode={[[0, 100], [300, 800], [1000, 1500]]}
      leeway={500}
      scaleInput={true}
      onFail={input => {
        console.log('INPUT', input) ;
      }}
      onSuccess={input => {
        console.log('INPUT', input);
        navigator.push({ title: 'LoggedIn' });
      }}
      >
      <Text>What's the passcode?</Text>
    </Doorman>
  );
};

const LoggedIn = () => {
  return (
    <View style={styles.container}>
      <Text>We've been waiting for you</Text>
    </View>
  );
};

const ROUTES = {
  Login,
  LoggedIn
};

export default class Example extends React.Component {
  render() {
    console.log('Doorman proptypes', Doorman.propTypes)
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
    alignItems: 'center'
  }
});
