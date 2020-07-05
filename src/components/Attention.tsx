import React, { Component } from "react";
import { View, Animation, AnimationSet } from "@tencent/hippy-react";
import { AttentionProps, AttentionType } from "../PropsType";
/**
 * @visibleName Attention 引起用户注意相关动画
 */
export default class Attention extends Component<AttentionProps> {
  constructor(props: AttentionProps) {
    super(props);
    const { duration, delay, timingFunction, onAnimationEnd, type } = this.props;
    const _duration = duration || 2000;
    const _timingFunction = timingFunction || "ease_bezier";
    const _delay = delay || 0;
    if (type === AttentionType.heartBeat) {
      this.animation = new AnimationSet({
        children: [
          {
            animation: new Animation({
              startValue: 1,
              toValue: 1.3,
              duration: _duration / 2,
              mode: "timing",
              timingFunction: _timingFunction
            }),
            follow: true
          },
          {
            animation: new Animation({
              startValue: 1.3,
              toValue: 1,
              duration: _duration / 2,
              delay: _delay,
              mode: "timing",
              timingFunction: _timingFunction
            }),
            follow: true
          }
        ],
        repeatCount: "loop"
      });
    } else if (type === AttentionType.shakeX || type === AttentionType.shakeY) {
      this.animation = new AnimationSet({
        children: [
          {
            animation: new Animation({
              startValue: 0,
              toValue: -10,
              duration: _duration / 20,
              mode: "timing",
              timingFunction: _timingFunction
            }),
            follow: true
          },
          {
            animation: new Animation({
              startValue: -10,
              toValue: 0,
              duration: _duration / 20,
              delay: _delay,
              mode: "timing",
              timingFunction: _timingFunction
            }),
            follow: true
          }
        ],
        repeatCount: 10
      });
    }
    this.animation.onHippyAnimationEnd(() => {
      onAnimationEnd && onAnimationEnd();
    });
  }
  componentDidMount() {
    this.animation.start();
  }
  componentWillUnmount() {
    this.animation.destroy();
  }
  animation: any;
  render() {
    const { style, type, children } = this.props;
    return (
      <View
        style={[
          style,
          type === AttentionType.heartBeat
            ? { transform: [{ scale: this.animation }] }
            : type === AttentionType.shakeX
            ? { transform: [{ translateX: this.animation }] }
            : type === AttentionType.shakeY
            ? { transform: [{ translateY: this.animation }] }
            : null
        ]}
      >
        {children}
      </View>
    );
  }
}

