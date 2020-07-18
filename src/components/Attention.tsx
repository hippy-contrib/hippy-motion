import React, { Component } from "react";
import { AttentionProps, AttentionType } from "../PropsType";
import Motion from "./Motion";
/**
 * @visibleName Attention 引起用户注意相关动画
 */
export default class Attention extends Component<AttentionProps> {
  static Type = AttentionType;
  getAttentionConfig() {
    const { type, duration, repeatCount } = this.props;
    switch (type) {
      case AttentionType.heartBeat:
        return {
          scale: {
            value: [1, 1.3, 1],
            repeatCount: repeatCount || "loop",
            duration: duration || 3000
          }
        };
      case AttentionType.shakeX:
        return {
          translateX: {
            value: [-10, 0],
            repeatCount: repeatCount || 10,
            duration: duration || 300
          }
        };
      case AttentionType.shakeY:
        return {
          translateY: {
            value: [-10, 0],
            repeatCount: repeatCount || 10,
            duration: duration || 300
          }
        };
      default:
        return {};
    }
  }
  render() {
    const { style, children } = this.props;
    return (
      <Motion style={style} animation={this.getAttentionConfig()}>
        {children}
      </Motion>
    );
  }
}
