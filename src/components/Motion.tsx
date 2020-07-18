import React, { Component } from "react";
import { View, Animation, AnimationSet } from "@tencent/hippy-react";
import { MotionProps, AnimationType } from "../PropsType";
/**
 * - 功能1(待开发)
 * @visibleName Motion 动画
 */
export class Motion extends Component<MotionProps> {
  constructor(props: MotionProps) {
    super(props);
    this.setAnimationData(); // 初始化动画实例
  }

  private animationInsMap = new Map();

  componentDidMount() {
    this.play();
    this.props.getAnimationIns?.call(this, this.getAnimationMapIns);
  }
  componentWillUnmount() {
    this.destroy();
  }
  getAnimationMapIns = (key: string) => {
    return this.animationInsMap.get(`${key}Animation`)
  }

  play() {
    const { animation } = this.props;
    if (!animation) return;
    Object.keys(animation).forEach((_key) => {
      this.animationInsMap.get(`${_key}Animation`).start();
    });
  }
  destroy() {
    const { animation } = this.props;
    if (!animation) return;
    Object.keys(animation).forEach((_key) => {
      this.animationInsMap.get(`${_key}Animation`).destroy();
    });
  }
  setAnimationData() {
    const { animation } = this.props;
    if (!animation) return;
    Object.keys(animation).forEach((_key) => {
      const _animation = (animation as any)[_key];
      const _value = this.getAnimationValue(_animation.value); // 解析配置项
      if (_value.length > 1) {
        const _children: any = [];
        _value.map((item) => {
          _children.push({
            animation: new Animation({
              startValue: item[0],
              toValue: item[1],
              duration: _animation.duration / _value.length,
              valueType: _animation.valueType,
              mode: "timing",
              timingFunction: _animation.timingFunction || "linear",
            }),
            follow: true,
          });
        });
        this.animationInsMap.set(
          `${_key}Animation`,
          new AnimationSet({
            children: _children,
            repeatCount: _animation.repeatCount || 0,
          })
        );
      } else {
        this.animationInsMap.set(
          `${_key}Animation`,
          new Animation({
            startValue: _value[0][0],
            toValue: _value[0][1],
            duration: _animation.duration,
            valueType: _animation.valueType,
            mode: "timing",
            timingFunction: _animation.timingFunction || "linear",
            repeatCount: _animation.repeatCount || 0,
          })
        );
      }
      // 全局注册每个动画各个生命周期的监听回调
      ["onAllAnimationStart", "onAllAnimationRepeat", "onAllAnimationEnd", "onAllAnimationCancel"].forEach((item) => {
        if (!!(this.props as any)[item]) {
          for (let animationInstance of this.animationInsMap.values()) {
            animationInstance[item.replace(new RegExp("All"), "")]((this.props as any)[item]);
          }
        }
      });
      // 注册单个动画各个生命周期的监听回调
      ["onAnimationStart", "onAnimationRepeat", "onAnimationEnd", "onAnimationCancel"].forEach((item) => {
        !!_animation[item] && this.animationInsMap.get(`${_key}Animation`)[item](_animation[item]);
      });
    });
  }
  getComputedStyle() {
    const { animation } = this.props;
    let _normalStyle = {};
    let _transformStyle = {};
    let _transform: object[] = [];
    if (!animation) return {};
    Object.keys(animation).forEach((_key) => {
      let _style = {};
      (_style as any)[_key] = this.animationInsMap.get(`${_key}Animation`);
      if (
        _key === AnimationType.translateX ||
        _key === AnimationType.translateY ||
        _key === AnimationType.scale ||
        _key === AnimationType.rotate
      ) {
        _transform.push(_style);
        _transformStyle = {
          transform: _transform,
        };
      } else {
        _normalStyle = Object.assign(_normalStyle, _style);
      }
    });
    return {
      ..._normalStyle,
      ..._transformStyle,
    };
  }
  getAnimationValue(value: number[]) {
    let _value: [number, number][] = [];
    value.map((item, index) => {
      if (index === value.length - 1) {
        return;
      }
      _value.push([item, value[index + 1]]);
    });
    return _value;
  }
  render() {
    const { style, children } = this.props;
    return (
      <View style={[style, this.getComputedStyle()]}>
        {children}
      </View>
    );
  }
}
export default Motion;
