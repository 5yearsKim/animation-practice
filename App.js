import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {useSharedValue} from 'react-native-reanimated';

import AnimatedBox from './AnimatedBox';

const images = ['key1', 'key2', 'key3', 'key4'];

export default function App() {
  const imageIdx = images.map((image, idx) => ({[image]: idx}));
  const positions = useSharedValue(Object.assign({}, ...imageIdx));
  return (
    <View style={styles.container}>
      <View style={{margin: 50, backgroundColor: 'pink', flex: 1}}>
        {images.map((item) => {
          return (
            <AnimatedBox
              key={item}
              item={item}
              positions={positions}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
  },
});
