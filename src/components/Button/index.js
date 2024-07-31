import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';

const Button = ({
  label,
  onClick,
  double = false,
  triple = false,
  operation = false,
}) => {
  const styleBtn = [styles.button];

  if (double) {
    styleBtn.push(styles.doubleBtn);
  }

  if (triple) {
    styleBtn.push(styles.tripleBtn);
  }

  if (operation) {
    styleBtn.push(styles.operationBtn);
  }

  return (
    <TouchableOpacity onPress={onClick}>
      <Text style={styleBtn}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').width / 4,
    padding: 20,
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#888',
  },
  operationBtn: {
    color: '#fff',
    backgroundColor: '#fa8231',
  },

  doubleBtn: {
    width: (Dimensions.get('window').width / 4) * 2,
  },

  tripleBtn: {
    width: (Dimensions.get('window').width / 4) * 3,
  },
});

export default Button;
