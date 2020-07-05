import React, { Component } from "react";
import { View, Animation } from "@tencent/hippy-react";
import { SlideProps } from "../PropsType";


/**
 * @visibleName Slide 滑动相关动画
 */
export class Slide extends Component<SlideProps> {
  constructor(props: SlideProps) {
    super(props);
    const { duration, delay, timingFunction, onAnimationEnd, startX, startY, endX, endY } = this.props;
    const _duration = duration || 1000;
    const _timingFunction = timingFunction || "ease_bezier";
    const _delay = delay || 0;
    this.transitionAnimation = {
      translateY: new Animation({
        startValue: startY,
        toValue: endY,
        duration: _duration,
        delay: _delay,
        mode: "timing",
        timingFunction: _timingFunction
      }),
      translateX: new Animation({
        startValue: startX,
        toValue: endX,
        duration: _duration,
        delay: _delay,
        mode: "timing",
        timingFunction: _timingFunction
      })
    };
    Promise.all([
      new Promise(r => {
        this.transitionAnimation.translateX.onHippyAnimationEnd(r);
        this.transitionAnimation.translateX.onHippyAnimationCancel(r);
      }),
      new Promise(r => {
        this.transitionAnimation.translateY.onHippyAnimationEnd(r);
        this.transitionAnimation.translateY.onHippyAnimationCancel(r);
      })
    ]).then(() => {
      onAnimationEnd && onAnimationEnd();
    });
  }
  componentDidMount() {
    this.transitionAnimation.translateY.start();
    this.transitionAnimation.translateX.start();
  }
  componentWillUnmount() {
    this.transitionAnimation.translateY.destroy();
    this.transitionAnimation.translateX.destroy();
  }
  transitionAnimation: any;
  render() {
    const { style, children } = this.props;
    return (
      <View
        style={[
          style,
          {
            transform: [
              {
                translateY: this.transitionAnimation.translateY
              },
              {
                translateX: this.transitionAnimation.translateX
              }
            ]
          }
        ]}
      >
        {children}
      </View>
    );
  }
}
export default Slide;
