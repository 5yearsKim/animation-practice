import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {getOrder} from './config';
import {useSharedValue} from 'react-native-reanimated';

import AnimatedBox from './AnimatedBox';

const images = ['key1', 'key2', 'key3', 'key4'];

export default function App() {
  const imageIdx = images.map((image, idx) => ({[image]: idx}));
  const positions = useSharedValue(Object.assign({}, ...imageIdx));
  return (
    <View style={styles.container}>
      {images.map((item) => {
        return (
          <AnimatedBox
            item={item}
            positions={positions}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
