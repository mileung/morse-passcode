# morse-passcode

A React Native component that implements security with morse code

## Install

`npm install --save morse-passcode`

## Import

`import Doorman from 'morse-passcode';`

## Usage

```javascript
render() {
  return (
    <Doorman
      style={styles.container}
      onPress={(x, y) => {}}
      onRelease={(x, y) => {}}
      passcode={[[0,84],[448,528],[960,1036]]}
      leeway={1000}
      onFail={input => {
        // set leeway to something high like 5000 and use this to find a passcode
        console.log('Failed', JSON.stringify(input));
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

## Example [code](https://github.com/MiLeung/morse-passcode/blob/master/src/Example.js)
#### SOS

![](https://media.giphy.com/media/xUPGcxH92M295TrZMQ/giphy.gif)

#### Shave and a haircut two bits

![](https://media.giphy.com/media/l4FGEkvQ20agttFVC/giphy.gif)


Maybe TODO if (this gets popular)

1. passcode incorporating tap location
2. multiple passcodes granting different access

Inspired by [this CodePen](http://codepen.io/fbrz/pen/Hgqmd) by [Fabrizio Bianchi](https://twitter.com/_fbrz?lang=en)

Main differences being that this example uses React Native and takes into account press length as opposed to just taps.
