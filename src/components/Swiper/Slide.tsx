import React, { Component } from "react";
import { ScrollView } from "@tencent/hippy-react";

interface ScrollEvent {
  contentOffset: {
    x: number;
    y: number;
  };
}

interface SlideProps {
  mainWidth: number;
  children: React.ReactNodeArray;
}

interface SlideState {
  currentPage: number;
  offsetX: number;
  pageNum: number;
  showDots: boolean;
  paddingLeft: number;
}

export class Slide extends Component<SlideProps, SlideState> {
  constructor(props: SlideProps) {
    super(props);
    this.state = {
      currentPage: 0,
      offsetX: 0,
      pageNum: 0,
      showDots: false,
      paddingLeft: 0 // 初始化向左位移
    };
  }

  shouldComponentUpdate(nextProps: Readonly<SlideProps>) {
    let { children } = nextProps;
    if (children.length !== this.state.pageNum) {
      this.setState({
        pageNum: children && children.length
      });
    }
    return true;
  }

  slide: any;

  onScrollEndDrag(e: ScrollEvent) {
    this.updateScrollViewPos(e.contentOffset.x);
  }

  updateScrollViewPos(scrollEndX: number) {
    // 判断向左或向右滑动
    let nextPage;
    let { currentPage, offsetX, pageNum, paddingLeft } = this.state;
    let { mainWidth } = this.props;

    if (currentPage === 0 && scrollEndX < 10) {
      // 兼容首页向左滑动后停在首页
      nextPage = currentPage;
    } else if (currentPage === pageNum - 1 && Math.abs(offsetX - scrollEndX) < 40) {
      // 兼容最后页向右滑动后停在最后页
      nextPage = currentPage;
    } else if (scrollEndX > offsetX) {
      // left
      nextPage = currentPage === pageNum - 1 ? currentPage : currentPage + 1;
    } else if (scrollEndX < offsetX) {
      // right
      nextPage = currentPage === 0 ? 0 : currentPage - 1;
    } else {
      nextPage = currentPage;
    }

    let nextOffsetX = nextPage * mainWidth - paddingLeft;

    this.setState({
      currentPage: nextPage,
      offsetX: nextOffsetX
    });

    this.slide.scrollTo({
      x: nextOffsetX,
      animated: true
    });
  }

  render() {
    return (
      <ScrollView
        // style={{ marginTop: rem(-5) }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onScrollEndDrag={e => this.onScrollEndDrag(e)}
        ref={c => {
          this.slide = c;
        }}
      >
        {this.props.children}
      </ScrollView>
    );
  }
}

export default Slide;
