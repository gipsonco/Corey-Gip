import {StyleSheet, View, Platform} from 'react-native';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

const MeasureLayout = props => {
  const {children} = props;
  const [layout, setLayout] = useState(null);

  const handleLayout = e => {
    const {
      nativeEvent: {layout},
    } = e;
    setLayout({
      layout: {
        ...layout,
        y: layout.y + (Platform.OS === 'android' ? 40 : 0),
      },
    });
  };

  if (!layout) {
    return <View onLayout={handleLayout} style={styles.container} />;
  }
  return children;
};

MeasureLayout.propTypes = {
  children: PropTypes.func.isRequired,
};

export default MeasureLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});