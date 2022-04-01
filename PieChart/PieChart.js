import React from "react";
import PropTypes from "prop-types";
import {
  ColorPropType,
  StyleSheet,
  ViewPropTypes,
  requireNativeComponent,
  processColor,
} from "react-native";

export default class PieChartView extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
        color: ColorPropType,
      }),
    ).isRequired,
    strokeWidth: PropTypes.number,
    strokeColor: ColorPropType,
    ...ViewPropTypes,
  };

  static defaultProps = {
    data: [],
    strokeWidth: 0,
    strokeColor: "transparent",
  };

  render() {
    const {style, data, ...rest} = this.props;

    const processedData = data.map(item => ({
      value: item.value,
      color: processColor(item.color),
    }));

    return (
      <View {...rest} style={[styles.container, style]} data={processedData} />
    );
  }
}

const View = requireNativeComponent("PieChart", PieChartView);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
});
