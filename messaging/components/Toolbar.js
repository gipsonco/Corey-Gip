import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import React, {useState, useEffect, useRef} from 'react';

const ToolbarButton = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.button}>{title}</Text>
    </TouchableOpacity>
  );
};

ToolbarButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const Toolbar = ({
  onPressCamera,
  onPressLocation,
  onSubmit,
  isFocused,
  onChangeFocus,
}) => {
  const [text, setText] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    if (!isFocused) {
      inputRef.current.focus();
    } else {
      inputRef.current.blur();
    }
  }, []);

  const handleChangeText = text => {
    setText(text);
  };

  const handleSubmitEditing = () => {
    if (!text) return;
    onSubmit(text);
    setText('');
  };

  const handleFocus = () => {
    onChangeFocus(true);
  };

  const handleBlur = () => {
    onChangeFocus(false);
  };
  return (
    <View style={styles.toolbar}>
      <ToolbarButton title={'📷'} onPress={onPressCamera} />
      <ToolbarButton title={'📍'} onPress={onPressLocation} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={'Type Something'}
          blurOnSubmit={false}
          value={text}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitEditing}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
        />
      </View>
    </View>
  );
};

export default Toolbar;

Toolbar.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  onChangeFocus: PropTypes.func,
  onSubmit: PropTypes.func,
  onPressCamera: PropTypes.func,
  onPressLocation: PropTypes.func,
};

Toolbar.defaultProps = {
  onChangeFocus: () => {},
  onSubmit: () => {},
  onPressCamera: () => {},
  onPressLocation: () => {},
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    backgroundColor: 'white',
  },
  button: {
    top: -2,
    marginRight: 12,
    fontSize: 20,
    color: 'grey',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
