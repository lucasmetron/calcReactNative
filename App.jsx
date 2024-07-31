import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operation, setOperation] = useState(null);
  const [values, setValues] = useState([]);
  const [currentIndexValues, setCurrentIndexValues] = useState(0);
  console.log('✌️currentIndexValues --->', currentIndexValues);
  console.log('✌️values --->', values);

  function addDigit(value) {
    if (value === '.' && displayValue.includes('.')) {
      return;
    }

    if (displayValue === '0' && value === '0') {
      return;
    }

    setDisplayValue(actual => {
      if (clearDisplay) {
        setClearDisplay(false);
        return value;
      } else {
        return actual === '0' ? value : `${actual}${value}`;
      }
    });
  }

  function clearMemory() {
    setDisplayValue('0');
    setClearDisplay(false);
    setOperation(null);
    setValues([]);
    setCurrentIndexValues(0);
  }

  function getOperation(value) {
    if (currentIndexValues === 0) {
      setOperation(value);
      setCurrentIndexValues(1);
      setClearDisplay(true);
    }

    if (
      currentIndexValues === 1 &&
      (operation === '+' ||
        operation === '-' ||
        operation === '*' ||
        operation === '/')
    ) {
      setOperation(value);
      setClearDisplay(true);
      if (values.length === 2) {
        let result = 0;

        switch (operation) {
          case '+':
            result = values[0] + values[1];
            break;

          case '-':
            result = values[0] - values[1];
            break;

          case '*':
            result = values[0] * values[1];
            break;

          case '/':
            result = values[0] / values[1];
            break;

          default:
            break;
        }
        setValues([result]);
        setDisplayValue(`${result}`);
      }
    }

    if (operation === '=') {
      setDisplayValue(values[1]);
      setOperation(null);
      setValues([]);
      setCurrentIndexValues(0);
      setClearDisplay(true);
    }
  }

  useEffect(() => {
    const newValue = parseFloat(displayValue);
    const newValues = [...values];
    newValues[currentIndexValues] = newValue;
    setValues(newValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayValue]);

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
