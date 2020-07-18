import React, { Component } from "react";
import { FadeProps, FadeType } from "../PropsType";
import Motion from "./Motion";
/**
 * @visibleName Fade 透明度相关动画
 */

export default class Fade extends Component<FadeProps> {
  static Type = FadeType;
  getOpacityConfig() {
    const { type, duration } = this.props;
    switch (type) {
      case FadeType.fadeIn:
        return {
          opacity: {
            value: [0, 1],
            duration: duration || 3000
          }
        };
      case FadeType.fadeInOut:
        return {
          opacity: {
            value: [0, 1, 0],
            duration: duration || 3000
          }
        };
      case FadeType.fadeOut:
        return {
          opacity: {
            value: [1, 0],
            duration: duration || 3000
          }
        };

      default:
        return {};
    }
  }
  render() {
    const { style, children } = this.props;
    return (
      <Motion style={style} animation={this.getOpacityConfig()}>
        {children}
      </Motion>
    );
  }
}
