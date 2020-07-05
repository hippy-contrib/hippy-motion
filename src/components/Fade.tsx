import React, { Component } from "react";
import { View, Animation, AnimationSet } from "@tencent/hippy-react";
import { FadeProps, FadeType } from "../PropsType";

/**
 * @visibleName Fade 透明度相关动画
 */

export default class Fade extends Component<FadeProps> {
  constructor(props: FadeProps) {
    super(props);
    const { duration, delay, timingFunction, onAnimationEnd, type } = this.props;
    const _duration = duration || 1000;
    const _timingFunction = timingFunction || "ease_bezier";
    const _delay = delay || 0;
    if (type === FadeType.fadeInOut) {
      this.animation = new AnimationSet({
        children: [
          {
            animation: new Animation({
              startValue: 0,
              toValue: 1,
              duration: _duration / 2,
              mode: "timing",
              timingFunction: _timingFunction
            }),
            follow: true
          },
          {
            animation: new Animation({
              startValue: 1,
              toValue: 0,
              duration: _duration / 2,
              delay: _delay,
              mode: "timing",
              timingFunction: _timingFunction
            }),
            follow: true
          }
        ]
      });
    } else {
      const start = type === "fadeIn" ? 0 : 1;
      const end = type === "fadeIn" ? 1 : 0;
      this.animation = new Animation({
        startValue: start,
        toValue: end,
        duration: _duration / 2,
        delay: _delay,
        mode: "timing",
        timingFunction: _timingFunction
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
    const { style, children } = this.props;
    return <View style={[style, { opacity: this.animation }]}>{children}</View>;
  }
};