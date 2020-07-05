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
  };
  componentDidMount() {
    this.play();
  };
  componentWillUnmount() {
    this.destroy();
  };
  play() {
    const { animation } = this.props;
    if(!animation) return;
    Object.keys(animation).forEach(_key => {
      // @ts-ignore
      this[`${_key}Animation`].start();
    });
  }
  destroy(){
    const { animation } = this.props;
    if(!animation) return;
    Object.keys(animation).forEach(_key => {
      // @ts-ignore
      this[`${_key}Animation`].destroy();
    })
  }
  setAnimationData(){
    const { animation } = this.props;
    if(!animation) return;
    Object.keys(animation).forEach(_key => {
      // @ts-ignore
      const _animation = animation[_key];
      const _value = this.getAnimationValue(_animation.value); // 解析配置项
      if(_value.length > 1){
        const _children: any = []
        _value.map(item => {
          _children.push({
            animation: new Animation({
              startValue: item[0],
              toValue: item[1],
              duration: _animation.duration/_value.length,
              mode: "timing",
              timingFunction: _animation.timingFunction || "linear"
            }),
            follow: true
          });
        });
        // @ts-ignore
        this[`${_key}Animation`] = new AnimationSet({
          children: _children,
          repeatCount: _animation.repeatCount || 0
        });
      } else {
        // @ts-ignore
        this[`${_key}Animation`] = new Animation({
          startValue: _value[0][0],
          toValue: _value[0][1],
          duration: _animation.duration,
          mode: "timing",
          timingFunction: _animation.timingFunction || "linear",
          repeatCount: _animation.repeatCount || 0
        });
      };
    });
  }
  getComputedStyle() {
    const { animation } = this.props;
    let _normalStyle = {};
    let _transformStyle = {};
    let _transform: object[] = [];
    if(!animation) return {};
    Object.keys(animation).forEach(_key => {
      let _style = {};
      // @ts-ignore
      _style[_key] = this[`${_key}Animation`];
      if(_key === AnimationType.translateX || _key ===  AnimationType.translateY || _key ===  AnimationType.scale){
        _transform.push(_style);
        _transformStyle = {
          transform: _transform
        }
      } else {
        _normalStyle = _style;
      };
    });
    return {
      ..._normalStyle,
      ..._transformStyle
    };
  }
  getAnimationValue(value: number[]) {
    let _value: [number,number][] = [];
    value.map((item,index) => {
      if(index === value.length - 1){
        return; 
      }
      _value.push([item,value[index+1]]);
    })
    return _value;
  }
  render() {
    const { style, children } = this.props;
    return (
      <View style={[style,this.getComputedStyle()]}>{children}</View>
    );
  }
}
export default Motion;