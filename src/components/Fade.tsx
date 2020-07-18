import React, { Component } from "react";
import { FadeProps, FadeType } from "../PropsType";
import Motion from "./Motion";
/**
 * @visibleName Fade 透明度相关动画
 */

export default class Fade extends Component<FadeProps> {
  static Type = FadeType;
  render() {
    const { style, children, type, duration } = this.props;
    return (
      <Motion
        style={style}
        animation={{
          opacity: {
            value: type === FadeType.fadeInOut ? [0, 1, 0] : type === FadeType.fadeIn ? [0, 1] : [1, 0],
            duration: duration || 3000
          }
        }}
      >
        {children}
      </Motion>
    );
  }
}
