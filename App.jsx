import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operation, setOperation] = useState(null);
  const [values, setValues] = useState([0, 0]);
  const [currentIndexValues, setCurrentIndexValues] = useState(0);

  function addDigit(value) {
    const clear = displayValue === '0' || clearDisplay;
    const currentValue = clear ? '' : displayValue;
    const newDisplayValue = currentValue + value;

    if (value === '.' && displayValue.includes('.') && !clear) {
      return;
    }

    setDisplayValue(newDisplayValue);
    setClearDisplay(false);

    if (value !== '.') {
      const newValue = parseFloat(newDisplayValue);
      const newValues = [...values];
      newValues[currentIndexValues] = newValue;
      setValues(newValues);
    }
  }

  function clearMemory() {
    setDisplayValue('0');
    setClearDisplay(false);
    setOperation(null);
    setValues([0, 0]);
    setCurrentIndexValues(0);
  }

  function getOperation(value) {
    if (currentIndexValues === 0) {
      setOperation(value);
      setCurrentIndexValues(1);
      setClearDisplay(true);
    } else {
      const equals = value === '=';
      const newValues = [...values];
      try {
        // eslint-disable-next-line no-eval
        newValues[0] = eval(`${newValues[0]} ${operation} ${newValues[1]}`);
      } catch (e) {
        newValues[0] = values[0];
      }

      newValues[1] = 0;
      setDisplayValue(`${newValues[0]}`);
      setOperation(equals ? null : value);
      setCurrentIndexValues(equals ? 0 : 1);
      setClearDisplay(!equals);
      setValues(newValues);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label={'AC'} onClick={clearMemory} triple />
        <Button label={'/'} onClick={() => getOperation('/')} operation />
        <Button label={'7'} onClick={() => addDigit('7')} />
        <Button label={'8'} onClick={() => addDigit('8')} />
        <Button label={'9'} onClick={() => addDigit('9')} />
        <Button label={'*'} onClick={() => getOperation('*')} operation />
        <Button label={'4'} onClick={() => addDigit('4')} />
        <Button label={'5'} onClick={() => addDigit('5')} />
        <Button label={'6'} onClick={() => addDigit('6')} />
        <Button label={'-'} onClick={() => getOperation('-')} operation />
        <Button label={'1'} onClick={() => addDigit('1')} />
        <Button label={'2'} onClick={() => addDigit('2')} />
        <Button label={'3'} onClick={() => addDigit('3')} />
        <Button label={'+'} onClick={() => getOperation('+')} operation />
        <Button label={'0'} onClick={() => addDigit('0')} double />
        <Button label={'.'} onClick={() => addDigit('.')} />
        <Button label={'='} onClick={() => getOperation('=')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default App;
