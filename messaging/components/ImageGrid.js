import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import Grid from './Grid';

const ImageGrid = ({onPressImage}) => {
  const [images, setImages] = useState([
    {uri: 'https://picsum.photos/600/600?image=10'},
    {uri: 'https://picsum.photos/600/600?image=20'},
    {uri: 'https://picsum.photos/600/600?image=30'},
    {uri: 'https://picsum.photos/600/600?image=40'},
  ]);

  let loading = false;
  let cursor = null;

  useEffect(() => {
    getImages();
  }, []);

  const getNextImages = () => {
    if (!cursor) return;
    getImages(cursor);
  };

  const getImages = async after => {
    if (loading) return;
    loading = true;
    const results = await CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    });
    const {
      edges,
      page_info: {has_next_page, end_cursor},
    } = results;

    const loadedImages = edges.map(item => {
      return {uri: item.node.image.uri};
    });

    setImages([...images, ...loadedImages]);

    loading = false;
    cursor = has_next_page ? end_cursor : null;
  };

  const keyExtractor = ({uri}) => uri;

  const renderItem = ({item: {uri}, size, marginTop, marginLeft}) => {
    const style = {
      width: size,
      height: size,
      marginLeft: marginLeft,
      marginTop: marginTop,
    };

    return (
      <TouchableOpacity
        key={uri}
        activeOpacity={0.75}
        onPress={() => onPressImage(uri)}
        style={style}>
        <Image source={{uri}} style={style} />
      </TouchableOpacity>
    );
  };

  return (
    <Grid
      data={images}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={getNextImages}
    />
  );
};

ImageGrid.propTypes = {
  onPressImage: PropTypes.func,
};

ImageGrid.defaultProps = {
  onPressImage: () => {},
};

export default ImageGrid;

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
