
import React from 'react';
import {View, Text} from 'react-native';

import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

export default function AnimatedBox({item, positions}) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.x = translateX.value;
      ctx.y = translateY.value;
    },
    onActive: (event, ctx) => {
      // console.log('active')
      // console.log(event);
      translateX.value = ctx.x + event.translationX;
      translateY.value = ctx.y + event.translationY;
    },
    onEnd: () => {},
  });

  const boxStyle = useAnimatedStyle(() => ({
    backgroundColor: 'tomato',
    width: 100, 
    height: 100,
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));
  console.log(item);
  return (
    <Animated.View>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={boxStyle}>
          <Text>{item}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}