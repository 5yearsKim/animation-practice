
import React from 'react';
import {View, Text} from 'react-native';

import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedReaction,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {getPosition, getOrder} from './config';

export default function AnimatedBox({item, positions}) {
  const pos = getPosition(positions.value[item])
  const translateX = useSharedValue(pos.x);
  const translateY = useSharedValue(pos.y);
  const isGestureActive = useSharedValue(false);
  useAnimatedReaction(
    () => positions.value[item],
    (newOrder) => {
      if (!isGestureActive.value) {
        const pos = getPosition(newOrder);
        translateX.value = withTiming(pos.x);
        translateY.value = withTiming(pos.y);
      }
    }
  )

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.x = translateX.value;
      ctx.y = translateY.value;
      isGestureActive.value = true;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.x + event.translationX;
      translateY.value = ctx.y + event.translationY;
      const newOrder = getOrder(translateX.value, translateY.value, Object.keys(positions.value).length - 1);
      // swap
      const oldOrder = positions.value[item];
      if (newOrder != oldOrder) {
            const idToSwap = Object.keys(positions.value).find(
            (key) => positions.value[key] === newOrder
          );
          if (idToSwap) {
            // Spread operator is not supported in worklets
            // And Object.assign doesn't seem to be working on alpha.6
            const newPositions = JSON.parse(JSON.stringify(positions.value));
            newPositions[item] = newOrder;
            newPositions[idToSwap] = oldOrder;
            positions.value = newPositions;
          }
      }
    },
    onEnd: () => {
      const newPos = getPosition(positions.value[item]);
      translateX.value = withTiming(newPos.x);
      translateY.value = withTiming(newPos.y);
      isGestureActive.value = false;
    },
  });

  const boxStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    backgroundColor: 'tomato',
    width: 100, 
    height: 100,
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));
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