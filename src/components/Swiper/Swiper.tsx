import React, { Component } from "react";
import { View, Image, ViewPager, StyleSheet } from "@tencent/hippy-react";
import { SwiperProps } from "./PropsType";
import SliderDots from "./Dots";
import { WINDOW_WIDTH } from "../../common/utils";

interface SwiperItemProps {
  picUrl: string;
  style?: object;
  index: number;
  onTouch?: (current: number) => void;
}

const SwiperItem = (props: SwiperItemProps) => {
  const swiperItemStyle = { ...styles.swiperItem, ...props.style };
  return (
    <View style={swiperItemStyle} onClick={() => props.onTouch && props.onTouch(props.index)}>
      <Image style={props.style} source={{ uri: props.picUrl }} />
    </View>
  );
};

interface SwiperState {
  currentIndex: number;
}

/**
 * @visibleName Swiper 滑动视图容器
 */
export default class Swiper extends Component<SwiperProps, SwiperState> {
  public constructor(props: SwiperProps) {
    super(props);
    this.state = {
      currentIndex: props.initialPage || 0
    };
  }

  viewpager: ViewPager | null = null;
  timer: ReturnType<typeof setTimeout> | null = null;

  componentDidMount() {
    this.autoPlay();
    this.timer = null;
  }

  clear() {
    this.timer && clearTimeout(this.timer);
  }

  autoPlay() {
    const { autoplay, autoPlayDuration } = this.props;
    if (autoplay) {
      this.clear();
      this.timer = setTimeout(() => {
        this.next();
        this.autoPlay();
      }, autoPlayDuration);
    }
  }

  next() {
    const { data = [], children } = this.props;
    const length = (data && data.length) || (Array.isArray(children) && children.length) || 0;

    if (this.state.currentIndex + 1 < length) {
      const index = this.state.currentIndex + 1;
      this.setState({ currentIndex: index });
      this.viewpager && this.viewpager.setPage(index);
    } else {
      this.setState({ currentIndex: 0 });
      this.viewpager && this.viewpager.setPage(0);
    }
  }

  private pageSelected(position: number) {
    this.setState({ currentIndex: position });
    this.props.onChange && this.props.onChange(position);
    this.props.onPageSelected && this.props.onPageSelected({ position });
  }

  public render() {
    const {
      data = [],
      style,
      children,
      initialPage,
      scrollEnabled,
      onPageScroll,
      onPageScrollStateChanged,
      showDots = true,
      dotsStyle
    } = this.props;

    const sliderWrap = {
      width: WINDOW_WIDTH,
      height: WINDOW_WIDTH,
      ...style
    };

    const length = (data && data.length) || (Array.isArray(children) && children.length) || 0;

    return (
      <View style={sliderWrap}>
        <ViewPager
          ref={ref => {
            this.viewpager = ref;
          }}
          style={{ width: sliderWrap.width, height: sliderWrap.height }}
          initialPage={initialPage}
          scrollEnabled={scrollEnabled}
          onPageSelected={({ position }) => this.pageSelected(position)}
          onPageScroll={onPageScroll}
          onPageScrollStateChanged={onPageScrollStateChanged}
        >
          {data.length
            ? data.map((item: string, i: number) => (
                <SwiperItem onTouch={this.props.onTouch} key={i} picUrl={item} style={style} index={i} />
              ))
            : children}
        </ViewPager>
        {length > 1 && showDots ? (
          <SliderDots length={length} activeIndex={this.state.currentIndex} dotsStyle={dotsStyle} />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  swiperItem: {
    position: "relative",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center"
  }
});
