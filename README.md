# morse-passcode

A React Native component that implements security with morse code

## Installation

npm install --save morse-passcode

## Importation

import Doorman from 'morse-passcode';

## Usagation

```
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
        console.log('Failed', JSON.stringify(input)); // use this to find a passcode; set leeway to something high like 5000
      }}
      onSuccess={input => {}}
      rippleDuration={2000}
      fadeOutDuration={1000}
      rippleColor="#ccf2ff"
      >
      {/* children of Doorman will act as if they were in a View */}
    </Doorman>
  );
}
```

## props

| property        | type     | default   |
|-----------------|----------|-----------|
| onPress         | string   | 'numeric' |
| onRelease       | boolean  | true      |
| passcode        | function | () => {}  |
| leeway          | number   | 500       |
| onFail          | function | () => {}  |
| onSuccess       | function | () => {}  |
| ripple          | boolean  | true      |
| rippleDuration  | number   | 500       |
| fadeOutDuration | number   | 200       |
| rippleColor     | string   | '#ccc'    |
| initialOpacity  | number   | 0.5       |

## Exmapleation

### SOS

![](https://media.giphy.com/media/xUPGcxH92M295TrZMQ/giphy.gif)

### Shave and a haircut two bits

![](https://media.giphy.com/media/l4FGEkvQ20agttFVC/giphy.gif)


Maybe TODO if (this gets popular)

1. passcode incorporating tap location
2. multiple passcodes granting different access

Inspired by [this CodePen](http://codepen.io/fbrz/pen/Hgqmd) by [Fabrizio Bianchi](https://twitter.com/_fbrz?lang=en)

Main differences being that this example uses React Native and takes into account press length as opposed to just taps.
