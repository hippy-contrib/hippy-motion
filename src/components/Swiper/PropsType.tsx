import { ViewPagerProps, StyleProp, ViewStyle } from "@tencent/types-hippy-react";

export interface DotsStyle {
  dotsWrap?: StyleProp<ViewStyle>;
  dot?: StyleProp<ViewStyle>;
  dotActive?: StyleProp<ViewStyle>;
}

export interface SliderDotsProps {
  /** slider 长度 */
  length: number;
  /** 当前选中 index */
  activeIndex: number;
  dotsStyle?: DotsStyle;
}

export interface SwiperProps extends ViewPagerProps {
  /** 容器样式 */
  style?: object;
  /** 滑动图片列表 */
  data?: string[];
  /** position 改变时会触发 change 事件 */
  onChange?: (position: number) => void;
  /** 是否开启自动轮播 */
  autoplay?: boolean;
  /** 自动轮播间隔，单位为 ms，最小为300ms */
  autoPlayDuration?: number;
  /** 是否显示指示器 */
  showDots?: boolean;
  // 指示器自定义样式
  dotsStyle?: DotsStyle;
  /** 触摸事件 */
  onTouch?: (current: number) => void;
  children?: React.ReactNodeArray;
}

export interface InfiniteSwiperProps {
  /** 组件宽度 */
  width?: number;
  /** 动画时长 */
  animationDuration?: number;
  /** 判断是否为快速滑动的时间间隔 ms */
  fastSwipeDuration?: number;
  /** 判断是否为快速滑动的移动间距 */
  fastSwipeDelta?: number;
  /** 是否显示调试参数 */
  debug?: boolean;
  /** 容器样式 */
  style?: object;
  /** 滑动图片列表 */
  data?: string[];
  /** 点击item事件 */
  onTouchStart?: () => void;
  /** 滑动后动画结束事件 */
  onAnimationEndAfterTouchEnd?: () => void;
  /** 触摸事件 */
  onTouch?: (index: number) => void;
  /** position 改变时会触发 change 事件 */
  onChange?: (position: number) => void;
  /** 是否开启自动轮播 */
  autoPlay?: boolean;
  /** 自动轮播间隔，单位为 ms，最小为300ms */
  autoPlayDuration?: number;
  /** 是否显示指示器 */
  showDots?: boolean;
  /** 指示器大小 */
  dotSize?: number;
  /** 内容样式 */
  contentStyle?: ViewStyle;
  // 指示器自定义样式
  dotsStyle?: DotsStyle;
  /** 内容 */
  children?: React.ReactNodeArray;
  /** 是否停止冒泡 */
  stopPropagation?: boolean;
}
