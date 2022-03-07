import {StyleSheet, View} from 'react-native';
import React from 'react';
import ImageGrid from './ImageGrid';

const InputMethodEditor = ({onPressImage}) => {
  return (
    <View style={styles.inputMethodEditor}>
      <ImageGrid onPressImage={onPressImage} />
    </View>
  );
};

export default InputMethodEditor;

const styles = StyleSheet.create({
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
});
