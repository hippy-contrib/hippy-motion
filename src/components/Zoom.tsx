import React, { Component } from "react";
import { ZoomProps, ZoomType } from "../PropsType";
import Motion from "./Motion";
/**
 * @visibleName Zoom 缩放
 */
export default class Zoom extends Component<ZoomProps> {
  static Type = ZoomType;
  radians(degrees: number) {
    return degrees * (Math.PI / 180);
  }
  getZoomConfig() {
    const { type, duration } = this.props;
    switch (type) {
      case ZoomType.zoomIn:
        return {
          scale: {
            value: [0.3, 1],
            duration: duration || 2000
          },
          opacity: {
            value: [0, 1],
            duration: duration || 2000
          }
        };
      case ZoomType.zoomOut:
        return {
          scale: {
            value: [1, 0.3],
            duration: duration || 2000
          },
          opacity: {
            value: [1, 0],
            duration: duration || 2000
          }
        };
      default:
        return {};
    }
  }
  render() {
    const { style, children } = this.props;
    return (
      <Motion style={style} animation={this.getZoomConfig()}>
        {children}
      </Motion>
    );
  }
}
