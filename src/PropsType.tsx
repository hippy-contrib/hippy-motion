export interface MotionProps {
  /** 容器样式 */
  style?: object;
  /** 动画 */
  animation?: object;
  /** 动画时长，单位为毫秒(ms) */
  duration?: number;
  /** 动画的重复次数，默认为0，即只播放一次，为"loop"时代表无限循环播放；*/
  repeatCount?: number | "loop";
  /** 动画延迟开始的时间，单位为毫秒，默认为0，即动画start之后立即执行； */
  delay?: number;
  /** 动画缓动函数，默认ease_bezier */
  timingFunction?: "linear" | "ease-in" | "ease-out" | "ease-in-out" | "ease_bezier";
  /** 所有动画结束时将会回调callback */
  onAnimationEnd?: Function;
  
}

export interface AnimationProps {
  value: number[];
  /** 动画的重复次数，默认为0， -1 代表无限循环播放；*/
  repeatCount?: number;
  /** 动画时长，单位为毫秒(ms) */
  duration?: number;
  /** 动画延迟开始的时间，单位为毫秒，默认为0，即动画start之后立即执行； */
  // delay?: number;
  /** 动画缓动函数，默认ease_bezier */
  timingFunction?: "linear" | "ease-in" | "ease-out" | "ease-in-out" | "ease_bezier";
  /** 是否暂停动画 */
  // paused?: boolean;
  /** 在动画开始时将会回调callback */
  onAnimationStart?: Function;
  /** 在动画结束时将会回调callback */
  onAnimationEnd?: Function;
  /** 当动画开始下一次重复播放时callback将被回调 */
  onAnimationRepeat?: Function;
  /** 在动画被取消时将会回调callback，取消的情况包括：尚未start或尚未结束的动画被destroy时； */
  onAnimationCancel?: Function;
}
export enum  AnimationType {
  /**  x 方向的位置移动 某px */
  translateX =  "translateX",
  /**  y 方向的位置移动 某px */
  translateY =  "translateY",
  /** 元素以 transformOrigin 的中心点缩放到 某值, 不改变元素的宽高 */
  scale  =  "scale",
  /** 元素以 transformOrigin 的中心点旋转 某deg **/
  rotate =  "rotate",
  /** 元素当前左部距离到 某px, 需配合 position: relative | absolute */
  left =  "left",
  /** 元素当前右部距离到 某px, 需配合 position: relative | absolute */
  right =  "right",
  /** 元素当前顶部距离到 某px, 需配合 position: relative | absolute */
  top =  "top",
  /** 元素当前下部距离到 某px, 需配合 position: relative | absolute */
  bottom = "bottom",
  /**  元素透明度变化 */
  opacity = "opacity",
  
  marginTop = "marginTop",
  marginBottom = "marginBottom",
  marginLeft = "marginLeft",
  marginRight = "marginRight",
  paddingTop = "paddingTop",
  paddingBottom = "paddingBottom",
  paddingLeft = "paddingLeft",
  paddingRight = "paddingRight"
}

export enum FadeType {
  fadeIn = "fadeIn",
  fadeOut = "fadeOut",
  fadeInOut = "fadeInOut"
}
export enum AttentionType {
  heartBeat = "heartBeat",
  shakeX = "shakeX",
  shakeY = "shakeY"
}

export interface FadeProps extends MotionProps {
  type: "fadeIn" | "fadeOut" | "fadeInOut";
}

export interface AttentionProps extends MotionProps {
  type: "heartBeat" | "shakeX" | "shakeY";
}

export interface SlideProps extends MotionProps {
  /** x轴初始值 */
  startX: number;
  /** x轴结束值 */
  endX: number;
  /** y轴初始值 */
  startY: number;
  /** y轴结束值 */
  endY: number;
}


