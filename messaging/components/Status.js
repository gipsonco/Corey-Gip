import {StyleSheet, Text, View, Platform, StatusBar} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import React, {useState, useEffect} from 'react';

const Status = () => {
  const [isConnected, setIsConnected] = useState(false);
  const backgroundColor = isConnected ? 'white' : 'red';

  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  }, []);

  const statusBar = (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={isConnected ? 'dark-content' : 'light-content'}
      animated={false}
    />
  );

  const messageContainer = (
    <View style={styles.messageContainer} pointerEvents={'none'}>
      {statusBar}
      {!isConnected && (
        <View style={styles.bubble}>
          <Text style={styles.text}>No Network Connection</Text>
        </View>
      )}
    </View>
  );

  if (Platform.OS === 'ios') {
    return (
      <View style={[styles.status, {backgroundColor}]}>{messageContainer}</View>
    );
  }
  return messageContainer;
};

export default Status;

const styles = StyleSheet.create({
  status: {
    height: 45,
    zIndex: 1,
  },
  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 65 : 30,
    right: 0,
    left: 0,
    height: 80,
    alignItems: 'center',
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
  },
});
