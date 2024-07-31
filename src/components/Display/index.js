import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Display = ({value}) => {
  return (
    <View style={styles.display}>
      <Text numberOfLines={1} style={styles.displayValue}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'flex-end',
  },

  displayValue: {
    color: 'white',
    fontSize: 60,
  },
});

export default Display;
