import React, { Component } from "react";
import { AttentionProps, AttentionType } from "../PropsType";
import Motion from "./Motion";
/**
 * @visibleName Attention 引起用户注意相关动画
 */
export default class Attention extends Component<AttentionProps> {
  static Type = AttentionType;
  radians(degrees: number) {
    return degrees * (Math.PI / 180);
  }
  getAttentionConfig() {
    const { type, duration, repeatCount } = this.props;
    switch (type) {
      // case AttentionType.bounce:
      //   return {
      //     scale: {
      //       value: [1, 1.1, 1.05, 0.95, 1.02],
      //       duration: duration || 2000
      //     },
      //     translateY: {
      //       value: [0, -30, -15, 0, -4, 0],
      //       duration: duration || 2000
      //     }
      //   };

      case AttentionType.flash:
        return {
          opacity: {
            value: [1, 0, 1, 0, 1],
            duration: duration || 2000
          }
        };

      case AttentionType.pulse:
        return {
          scale: {
            value: [1, 1.05, 1],
            duration: 2000
          }
        };

      case AttentionType.headShake:
        return {
          rotate: {
            value: [0, this.radians(-9), this.radians(7), this.radians(-5), this.radians(3), 0],
            duration: duration || 1000
          },
          translateX: {
            value: [0, -6, 5, -3, 2, 0], // duration是value一组动画路径完整运动后时长
            duration: duration || 1000
          }
        };

      case AttentionType.heartBeat:
        return {
          scale: {
            value: [1, 1.3, 1],
            repeatCount: repeatCount || "loop",
            duration: duration || 2000
          }
        };

      case AttentionType.shakeX:
        return {
          translateX: {
            value: [-10, 0, 10, 0, -10], // duration是value一组动画路径完整运动后时长
            repeatCount: repeatCount || 5,
            duration: duration || 400
          }
        };

      case AttentionType.shakeY:
        return {
          translateY: {
            value: [-10, 0, 10, 0, -10],
            repeatCount: repeatCount || 10,
            duration: duration || 200
          }
        };

      case AttentionType.swing:
        return {
          rotate: {
            value: [this.radians(15), this.radians(-10), this.radians(5), this.radians(-5), this.radians(0)],
            duration: duration || 1000,
            valueType: "rad"
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
