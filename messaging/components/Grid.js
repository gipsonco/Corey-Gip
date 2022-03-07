import {StyleSheet, Dimensions, FlatList, PixelRatio} from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

const Grid = ({data, renderItem, numColumns, itemMargin}) => {
  const renderGridItem = info => {
    const {index} = info;
    const {width} = Dimensions.get('window');
    const size = PixelRatio.roundToNearestPixel(
      (width - itemMargin * (numColumns - 1)) / numColumns,
    );

    //no margin left on the first item of a row
    const marginLeft = index % numColumns === 0 ? 0 : itemMargin;

    //no margin top on the first row of the grid
    const marginTop = index < numColumns ? 0 : itemMargin;

    return renderItem({...info, size, marginTop, marginLeft});
  };

  return (
    <FlatList
      data={data}
      renderItem={renderGridItem}
      numColumns={numColumns}
      itemMargin={itemMargin}
    />
  );
};

Grid.propTypes = {
  renderItem: PropTypes.func.isRequired,
  numColumns: PropTypes.number,
  itemMargin: PropTypes.number,
};

Grid.defaultProps = {
  numColumns: 4,
  itemMargin: StyleSheet.hairlineWidth,
};

export default Grid;

const styles = StyleSheet.create({});
