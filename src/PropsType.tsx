import { Touchable } from "@tencent/types-hippy-react";
export interface MotionProps extends Touchable {
  style?: object /** 容器样式 */;
  animation: any /** 动画 */;
  onAllAnimationStart?: Function /** 给所有动画加上开始时将会回调callback */;
  onAllAnimationRepeat?: Function /** 给所有动画加上开启新一次动画循环时将会回调callback */;
  onAllAnimationEnd?: Function /** 给所有动画加上结束时将会回调callback */;
  onAllAnimationCancel?: Function /** 给所有动画加上中断时将会回调callback */;
  getAnimationIns?: (cb: Function) => void;
}
export interface AnimationProps {
  value: number[];
  /** 动画时长，单位为毫秒(ms) */
  duration: number;
  /** 动画的重复次数，默认为0， loop 代表无限循环播放；*/
  repeatCount?: number;
  /** 动画延迟开始的时间，单位为毫秒，默认为0，即动画start之后立即执行； */
  delay?: number;
  /** 单位类型，默认为空，单位pt */
  valueType?: "" | "rad" | "deg";
  /** 动画缓动函数，默认linear */
  timingFunction?: "linear" | "ease-in" | "ease-out" | "ease-in-out" | "ease_bezier";
  /** 在动画开始时将会回调callback */
  onAnimationStart?: Function;
  /** 在动画结束时将会回调callback */
  onAnimationEnd?: Function;
  /** 当动画开始下一次重复播放时callback将被回调 */
  onAnimationRepeat?: Function;
  /** 在动画被取消时将会回调callback，取消的情况包括：尚未start或尚未结束的动画被destroy时； */
  onAnimationCancel?: Function;
}
export enum AnimationType {
  /**  x 方向的位置移动 某px */
  translateX = "translateX",
  /**  y 方向的位置移动 某px */
  translateY = "translateY",
  /** 元素以 transformOrigin 的中心点缩放到 某值, 不改变元素的宽高 */
  scale = "scale",
  /** 元素以 transformOrigin 的中心点旋转 某deg **/
  rotate = "rotate",
  /** 元素当前左部距离到 某px, 需配合 position: relative | absolute */
  left = "left",
  /** 元素当前右部距离到 某px, 需配合 position: relative | absolute */
  right = "right",
  /** 元素当前顶部距离到 某px, 需配合 position: relative | absolute */
  top = "top",
  /** 元素当前下部距离到 某px, 需配合 position: relative | absolute */
  bottom = "bottom",
  /**  元素透明度变化 */
  opacity = "opacity",
  /** 元素当前顶部外边距离到 某px */
  marginTop = "marginTop",
  /** 元素当前底部外边距离到 某px */
  marginBottom = "marginBottom",
  /** 元素当前左边外边距离到 某px */
  marginLeft = "marginLeft",
  /** 元素当前右边外边距离到 某px */
  marginRight = "marginRight",
  /** 元素当前顶部内边距离到 某px */
  paddingTop = "paddingTop",
  /** 元素当前底部内边距离到 某px */
  paddingBottom = "paddingBottom",
  /** 元素当前左部内边距离到 某px */
  paddingLeft = "paddingLeft",
  /** 元素当前右部内边距离到 某px */
  paddingRight = "paddingRight"
}

export interface CustomAnimationProps {
  /** 动画时长 */
  duration?: number;
  /** 动画的重复次数，默认为0， loop 代表无限循环播放；需要注意：duration时长是1次动画时长，重复n次，总的动画时长是duration*n */
  repeatCount?: number;
  /** 容器样式 */
  style?: object;
}
export interface FadeProps extends CustomAnimationProps {
  /** 动画类型 */
  type: FadeType;
}
export enum FadeType {
  fadeIn = "fadeIn",
  fadeOut = "fadeOut",
  fadeInOut = "fadeInOut"
}

export interface AttentionProps extends CustomAnimationProps {
  /** 动画类型 */
  type: AttentionType;
}
export enum AttentionType {
  // bounce = "bounce", // animate.css 中bounce 对运动函数cubic-bezier 参数做了配置，目前hippy已有的运动函数运动的有点奇怪，先不做实现
  flash = "flash",
  pulse = "pulse",
  // rubberBand = "rubberBand", // 暂未实现，hippy无法实现，有横向和纵向二个方向的缩放；
  shakeX = "shakeX",
  shakeY = "shakeY",
  headShake = "headShake", // 和shakeX 很相似，但加了弧度运动
  heartBeat = "heartBeat",
  swing = "swing",
  wobble = "wobble"
}
export interface ZoomProps extends CustomAnimationProps {
  /** 动画类型 */
  type: ZoomType;
}
export enum ZoomType {
  zoomIn = "zoomIn",
  zoomOut = "zoomOut"
}
