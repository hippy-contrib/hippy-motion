import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableEvent, Animation } from "@tencent/hippy-react";
import { InfiniteSwiperProps } from "./PropsType";
import { computeQueue } from "./utils";
import { WINDOW_WIDTH } from "../../common/utils";

interface InfiniteSwiperState {
  offsetX: number | Animation;
  queue: number[];
  current: number;
}

const DEFAULT_ANIMATION_DURATION = 480;
const DEFAULT_FAST_SWIPE_DURATION = 150;
const DEFAULT_FAST_SWIPE_DELTA = 36;
const DEFAULT_AUTO_PLAY_DURATION = 4500;

enum TOUCH_STATE {
  TOUCH_START,
  TOUCH_MOVE,
  TOUCH_AUTO_MOVE,
  TOUCH_END,
  TOUCH_CANCEL
}

enum DERECTION {
  LEFT,
  MIDDLE,
  RIGHT
}
/**
 * - IOS在ViewPager包裹下会有滑动问题
 * @visibleName InfiniteSwiper 无限轮播组件
 */
export class InfiniteSwiper extends Component<InfiniteSwiperProps, InfiniteSwiperState> {
  private lastX: number = 0;
  private prevX: number = 0;
  private touchState: TOUCH_STATE;
  private animationDuration: number;
  private moveAnimation: Animation;
  private panelWidth: number;
  private current: number;
  private cursor: number;
  private direction: DERECTION = DERECTION.MIDDLE;
  private nextAnimationValue: number = 0;
  private lastTouchStartTimestamp: number = 0;
  private fastSwipeDuration: number;
  private fastSwipeDelta: number;
  private autoPlayDuration: number;
  // @ts-ignore
  private autoPlayTimer: NodeJS.Timeout;
  // @ts-ignore
  private onAnimationEndAfterTouchEndTimer: NodeJS.Timeout;

  private get length() {
    return this.props.data ? this.props.data.length : this.props.children ? this.props.children.length : 0;
  }

  constructor(props: InfiniteSwiperProps) {
    super(props);
    this.panelWidth = props.width || WINDOW_WIDTH;
    this.animationDuration = props.animationDuration || DEFAULT_ANIMATION_DURATION;
    this.autoPlayDuration = props.autoPlayDuration || DEFAULT_AUTO_PLAY_DURATION;
    this.touchState = TOUCH_STATE.TOUCH_END;
    this.fastSwipeDuration = props.fastSwipeDuration || DEFAULT_FAST_SWIPE_DURATION;
    this.fastSwipeDelta = props.fastSwipeDelta || DEFAULT_FAST_SWIPE_DELTA;
    this.current = 0;
    this.cursor = 2;
    const queue = computeQueue(this.current, this.length);
    this.moveAnimation = new Animation({
      startValue: 0, // 动画开始值
      toValue: 0, // 动画结束值
      duration: 0, // 动画持续时长
      delay: 0, // 至动画真正开始的延迟时间
      mode: "timing", // 动画模式，现在只支持timing
      timingFunction: "ease-out" // 动画缓动函数
    });
    this.state = {
      offsetX: queue.length > 1 ? -this.cursor * this.panelWidth : 0,
      queue,
      current: 0
    };
    this.lastX = queue.length > 1 ? -this.cursor * this.panelWidth : 0;
  }

  public componentWillReceiveProps(nextProps: InfiniteSwiperProps) {
    const nextLength = nextProps.data ? nextProps.data.length : nextProps.children ? nextProps.children.length : 0;
    const queue = computeQueue(this.state.current, nextLength);
    this.setState({
      offsetX: queue.length > 1 ? -this.cursor * this.panelWidth : 0,
      queue: computeQueue(this.state.current, nextLength)
    });
    if (this.length !== nextLength) {
      setTimeout(() => {
        this.startAutoPlay();
      });
    }
  }

  public componentDidMount() {
    this.startAutoPlay();
  }

  public componentWillUnmount() {
    clearInterval(this.autoPlayTimer);
  }

  private cancelAutoPlay = () => {
    clearInterval(this.autoPlayTimer || 0);
  };

  private startAutoPlay = () => {
    if (this.props.autoPlay && this.length > 1) {
      this.cancelAutoPlay();
      const minAutoPlayDuration = this.animationDuration + 300;
      this.autoPlayTimer = setInterval(
        () => {
          this.direction = DERECTION.RIGHT;
          this.startAnimation();
        },
        this.autoPlayDuration
          ? this.autoPlayDuration >= minAutoPlayDuration
            ? this.autoPlayDuration
            : minAutoPlayDuration
          : minAutoPlayDuration
      );
    }
  };

  private handleOnTouchStart = (e: TouchableEvent<"onTouchDown">) => {
    if (this.touchState === TOUCH_STATE.TOUCH_AUTO_MOVE) {
      return;
    }
    clearTimeout(this.onAnimationEndAfterTouchEndTimer || 0);
    this.cancelAutoPlay();
    typeof this.props.onTouchStart === "function" && this.props.onTouchStart();
    this.lastTouchStartTimestamp = Date.now();
    this.touchState = TOUCH_STATE.TOUCH_START;
    this.prevX = e.page_x;
    // @ts-ignore
    e.returnValue = false;
    return this.props.stopPropagation;
  };

  private handleOnTouchMove = (e: TouchableEvent<"onTouchMove">) => {
    if (typeof this.state.offsetX !== "number") {
      return;
    }
    if (this.touchState !== TOUCH_STATE.TOUCH_START && this.touchState !== TOUCH_STATE.TOUCH_MOVE) {
      return;
    }
    this.touchState = TOUCH_STATE.TOUCH_MOVE;
    this.setState({
      offsetX: this.state.offsetX - (this.prevX - e.page_x)
    });
    this.prevX = e.page_x;
    // @ts-ignore
    e.returnValue = false;
    return this.props.stopPropagation;
  };

  private handleOnTouchEnd = (e: TouchableEvent<"onTouchEnd">, originalIndex: number) => {
    if (typeof this.state.offsetX !== "number") {
      return;
    }
    if (this.touchState !== TOUCH_STATE.TOUCH_MOVE && this.touchState !== TOUCH_STATE.TOUCH_START) {
      return;
    }
    // 滑动间隔小于fastSwipeDuration则算快速滑动
    if (Date.now() - this.lastTouchStartTimestamp < this.fastSwipeDuration) {
      if (this.state.offsetX - this.lastX > this.fastSwipeDelta) {
        this.direction = DERECTION.LEFT;
      } else if (this.state.offsetX - this.lastX < -this.fastSwipeDelta) {
        this.direction = DERECTION.RIGHT;
      } else if (this.prevX === e.page_x) {
        typeof this.props.onTouch === "function" && this.props.onTouch(originalIndex);
        this.prevX = e.page_x;
        this.lastX = this.state.offsetX as number;
        this.startAutoPlay();
        return;
      } else {
        this.direction = DERECTION.MIDDLE;
      }
    } else {
      if (this.state.offsetX - this.lastX > this.panelWidth / 3) {
        this.direction = DERECTION.LEFT;
      } else if (this.state.offsetX - this.lastX < -this.panelWidth / 3) {
        this.direction = DERECTION.RIGHT;
      } else {
        this.direction = DERECTION.MIDDLE;
      }
    }
    this.prevX = e.page_x;
    this.startAnimation();
    this.onAnimationEndAfterTouchEndTimer = setTimeout(() => {
      typeof this.props.onAnimationEndAfterTouchEnd === "function" && this.props.onAnimationEndAfterTouchEnd();
    }, this.animationDuration + 600);
    this.startAutoPlay();
    // @ts-ignore
    e.returnValue = false;
    return this.props.stopPropagation;
  };

  private handleOnAnimationEnd = () => {
    typeof this.props.onChange === "function" && this.props.onChange(this.state.current);
    this.setState(
      {
        offsetX: this.nextAnimationValue
      },
      () => {
        this.lastX = this.nextAnimationValue;
        this.touchState = TOUCH_STATE.TOUCH_END;
        if (this.current < 0) {
          this.current = this.length - 1;
        }
        if (this.current >= this.length) {
          this.current = 0;
        }
        if (this.length > 1) {
          this.setState(
            {
              queue: computeQueue(this.current, this.length),
              offsetX: this.state.queue.length > 1 ? -2 * this.panelWidth : 0,
              current: this.current
            },
            () => {
              this.lastX = this.state.offsetX as number;
              this.cursor = 2;
            }
          );
        }
      }
    );
  };

  private startAnimation = () => {
    this.touchState = TOUCH_STATE.TOUCH_AUTO_MOVE;
    switch (this.direction) {
      case DERECTION.RIGHT:
        this.current++;
        this.cursor++;
        break;
      case DERECTION.LEFT:
        this.current--;
        this.cursor--;
        break;
    }
    if (this.current < 0) {
      this.current = this.length - 1;
    }
    if (this.current >= this.length) {
      this.current = 0;
    }
    if (this.cursor > 3) {
      this.cursor = 3;
    }
    this.nextAnimationValue = -this.cursor * this.panelWidth;

    // 只有一个元素的话就不需要翻到下一页了，直接重置到初始位置
    if (this.length <= 1) {
      this.nextAnimationValue = 0;
    }

    this.moveAnimation.updateAnimation({
      startValue:
        typeof this.state.offsetX === "number" ? this.state.offsetX : this.nextAnimationValue + this.panelWidth, // 动画开始值
      toValue: this.nextAnimationValue, // 动画结束值
      duration: this.animationDuration
    });
    this.moveAnimation.removeEventListener();
    /**
     * 动画结束后，需要把重置一下元素的位置，并更新offset
     * 如果是滑到下一张图，则需要把所有的元素都往左移一格，空余的最后一个元素自动补上滑动前的最后一个元素的下一个元素
     * 比如滑动前的顺序为1-2-3-4-5-1-2，则滑动后的顺序为2-3-4-5-1-2-3
     * 并且更新offset让其落在滑动后的当前元素的位置
     */
    this.moveAnimation.onAnimationEnd(this.handleOnAnimationEnd);
    this.moveAnimation.onAnimationCancel(this.handleOnAnimationEnd);

    this.setState(
      {
        offsetX: this.moveAnimation
      },
      () => {
        this.moveAnimation.start();
      }
    );
  };

  private renderList = () => {
    return this.state.queue.map((originalIndex, i) => {
      const item = this.props.data
        ? this.props.data[originalIndex]
        : this.props.children
        ? this.props.children[originalIndex]
        : null;
      if (typeof item === "string") {
        return (
          <View
            key={i}
            onTouchDown={e => this.handleOnTouchStart(e)}
            onTouchMove={e => this.handleOnTouchMove(e)}
            onTouchEnd={e => this.handleOnTouchEnd(e, originalIndex)}
            // @ts-ignore
            onTouchCancel={e => this.handleOnTouchEnd(e, originalIndex)}
            style={[
              styles.imgWrap,
              {
                width: this.panelWidth
              }
            ]}
          >
            <Image style={this.props.style} source={{ uri: item }} />
          </View>
        );
      }
      return (
        <View
          key={i}
          onTouchDown={e => this.handleOnTouchStart(e)}
          onTouchMove={e => this.handleOnTouchMove(e)}
          onTouchEnd={e => this.handleOnTouchEnd(e, originalIndex)}
          // @ts-ignore
          onTouchCancel={e => this.handleOnTouchEnd(e, originalIndex)}
          style={this.props.contentStyle}
        >
          {item}
        </View>
      );
    });
  };

  private renderDots = () => {
    const list = this.props.data || this.props.children || [];
    return list.length > 1
      ? list.map((_, i) => {
          return (
            <View
              key={i}
              style={{
                width: this.props.dotSize || 6,
                height: this.props.dotSize || 6,
                borderRadius: this.props.dotSize || 6,
                marginLeft: i === 0 ? 0 : 8,
                backgroundColor: this.state.current === i ? "rgba(255, 255, 255 , .8)" : "rgba(0, 0, 0, .4)"
              }}
            />
          );
        })
      : null;
  };

  public render() {
    if (!this.props.data && !this.props.children) {
      return null;
    }
    return (
      <View style={[{ width: this.panelWidth }, styles.swiper]}>
        {this.props.debug ? (
          <View style={styles.debugWrap}>
            <Text>{"queue: " + this.state.queue.join("->")}</Text>
            <Text>{`current: ${this.current}`}</Text>
            <Text>{`cursor: ${this.cursor}`}</Text>
            <Text>{`offsetX: ${this.state.offsetX}`}</Text>
          </View>
        ) : null}
        <View
          style={{
            ...styles.panel,
            width: this.panelWidth * this.state.queue.length,
            transform: [{ translateX: this.state.offsetX }]
          }}
        >
          {this.renderList()}
        </View>
        <View
          style={[
            styles.dotWrap,
            {
              width: this.panelWidth
            }
          ]}
        >
          {this.props.showDots ? this.renderDots() : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  swiper: {
    position: "relative",
    overflow: "hidden"
  },
  panel: {
    display: "flex",
    flexDirection: "row"
  },
  debugWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  imgWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  dotWrap: {
    position: "absolute",
    bottom: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 6,
    flex: 1
  }
});

export default InfiniteSwiper;
