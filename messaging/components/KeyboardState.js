import {StyleSheet, Keyboard, Platform} from 'react-native';
import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';

const INITIAL_ANIMATION_DURATION = 250;

const KeyboardState = ({layout, children}) => {
  const {height} = layout;

  const [keyboardStatus, setKeyboardStatus] = useState({
    contentHeight: height,
    keyboardHeight: 0,
    keyboardVisible: false,
    keyboardWillShow: false,
    keyboardWillHide: false,
    keyboardAnimationDuration: INITIAL_ANIMATION_DURATION,
  });

  useEffect(() => {
    let subscriptions = [];
    if (Platform.OS === 'ios') {
      subscriptions = [
        Keyboard.addListener('keyboardWillShow', keyboardWillShow),
        Keyboard.addListener('keyboardWillHide', keyboardWillHide),
        Keyboard.addListener('keyboardDidShow', keyboardDidShow),
        Keyboard.addListener('keyboardDidHide', keyboardDidHide),
      ];
    } else {
      subscriptions = [
        Keyboard.addListener('keyboardDidHide', keyboardDidHide),
        Keyboard.addListener('keyboardDidShow', keyboardDidShow),
      ];
    }

    return () => {
      subscriptions.forEach(subscription => subscription.remove());
    };
  }, [subscriptions]);

  const keyboardWillShow = e => {
    setKeyboardStatus({
      keyboardWillShow: true,
    });
    measure(e);
  };

  const keyboardDidShow = e => {
    setKeyboardStatus({
      keyboardWillShow: false,
      keyboardVisible: true,
    });
    measure(e);
  };

  const keyboardWillHide = e => {
    setKeyboardStatus({
      keyboardWillHide: true,
    });
    measure(e);
  };

  const keyboardDidHide = () => {
    setKeyboardStatus({
      keyboardWillHide: false,
      keyboardVisible: false,
    });
  };

  const measure = e => {
    const {
      endCoordinates: {height, screenY},
      duration = INITIAL_ANIMATION_DURATION,
    } = e;

    setKeyboardStatus({
      contentHeight: screenY - layout.y,
      keyboardHeight: height,
      keyboardAnimationDuration: duration,
    });
  };

  return children({
    containerHeight: layout.height,
    contentHeight: keyboardStatus.contentHeight,
    keyboardHeight: keyboardStatus.keyboardHeight,
    keyboardVisible: keyboardStatus.keyboardVisible,
    keyboardWillShow: keyboardStatus.keyboardWillShow,
    keyboardWillHide: keyboardStatus.keyboardWillHide,
    keyboardAnimationDuration: keyboardStatus.keyboardAnimationDuration,
  });
};

KeyboardState.propTypes = {
  layout: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  children: PropTypes.func.isRequired,
};

export default KeyboardState;

const styles = StyleSheet.create({});