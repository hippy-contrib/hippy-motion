import React, { Component } from "react";
import { View, StyleSheet } from "@tencent/hippy-react";
import { SliderDotsProps } from "../PropsType";
/**
 * @visibleName SliderDots 轮播页码
 */
export class SliderDots extends Component<SliderDotsProps> {
  static defaultProps: SliderDotsProps = {
    activeIndex: 0,
    length: 0,
    dotsStyle: {
      dot: {},
      dotActive: {},
      dotsWrap: {}
    }
  };

  render() {
    const { dotsStyle = {} } = this.props;
    const items: boolean[] = [];
    while (items.length < this.props.length) {
      items.push(this.props.activeIndex === items.length);
    }
    return (
      <View style={[styles.wrap, dotsStyle.dotsWrap]}>
        {items.map((item, i) => {
          let style = {
            ...styles.normal,
            backgroundColor: "rgba(255,255,255,0.2)",
            ...(dotsStyle.dot as object)
          };
          if (item) {
            style = {
              ...style,
              ...styles.active,
              backgroundColor: "#ffffff",
              ...(dotsStyle.dotActive as object)
            };
          }
          return <View key={i} style={style} />;
        })}
      </View>
    );
  }
}
export default SliderDots;
const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 25,
    zIndex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  normal: {
    width: 4,
    height: 3,
    borderRadius: 1.5,
    marginHorizontal: 4
  },
  active: {
    width: 8,
    height: 3,
    borderRadius: 1.5
  }
});
