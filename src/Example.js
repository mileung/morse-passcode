
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
      onRelease={(x, y) => console.log()}
      passcode={[[0,109],[355,456],[525,591],[636,716],[985,1076],[1772,1897],[2201,2280]]}
      leeway={500}
      scaleInput={true}
      onFail={input => {
        console.log('Failed', JSON.stringify(input)) ;
      }}
      onSuccess={input => {
        console.log('Success', JSON.stringify(input));
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
    alignItems: 'center',
    backgroundColor: 'white'
  }
});
