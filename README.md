## Introduction

hippy-motion: 基于 hippy-react 开发的动画库；

### 动效价值：

- 增加体验舒适度： 让用户认知过程更为自然。
- 增加界面活力：第一时间吸引注意力，突出重点。
- 描述层级关系：体现元素之间的层级与空间关系。
- 提供反馈、明确意向：助力交互体验。

### hippy-motion 优势：

- 简洁 API，`Motion`组件方便扩展动画，底层处理`Animation` `AnimationSet`类的创建和销毁等逻辑，以及动画参数赋值等逻辑，大幅减少代码量；

- 预设了丰富动画组件，比如`Fade`，`Attention`，`Zoom`，`Swiper`, `ActionSheet`,`Marquee`等常用组件；

- 支持 ts；

### How to use

```
yarn add @tencent/hippy-motion
```

### Custom component

```javascript
import React, { Component } from "react";
import { Motion } from "@tencent/hippy-motion";

/**
 * @visibleName CustomComponent
 */
export default class CustomComponent extends Component<FadeProps> {
  render() {
    const { style, children, type } = this.props;
    return (
      <Motion
        style={style}
        animation={{
          opacity: {
            value: [0, 1, 0], // 透明度从0变1再变0
            duration: 2000 // 总动画时长2s
          },
          translateX: {
            value: [-10, 0, 10, 0, -10], // translateX从-10变0再变10再变0，再变-10
            repeatCount: 5, // 重复5次
            duration: 400 // 完成一次动画轨迹时长是400ms，因为重复5次，总时长是400ms*5=2s
          }
        }}
      >
        {children}
      </Motion>
    );
  }
}
```

#### API

| 参数           | 类型     | 默认 | 说明               |
| -------------- | -------- | ---- | ------------------ |
| style          | object   | null | 父容器样式         |
| animation      | object   | null | 需要执行动画的参数 |
| onAnimationEnd | function | null | 所有动画结束       |

#### animation 参数特别说明：

##### 基本 style 可动画参数

```js
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
```

| 参数              | 类型                                                              | 默认        | 说明                                                                                        |
| ----------------- | ----------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------- |
| value             | number[]                                                          | []          | [x,y,z] 从 x 边 y 变 z                                                                      |
| duration          | number                                                            | 0           | value 定义动画轨迹运动一次的时长，如果有设置 repeatCount 为 n，则动画的总时长是 duration\*n |
| repeatCount       | number , "loop"                                                   | 0           | 动画的重复次数，默认为 0， loop 代表无限循环播放                                            |
| timingFunction    | "linear" , "ease-in" , "ease-out" , "ease-in-out" , "ease_bezier" | ease-in-out | 动画缓动函数                                                                                |
| onAnimationStart  | function                                                          | null        | 动画开始                                                                                    |
| onAnimationEnd    | function                                                          | null        | 动画结束                                                                                    |
| onAnimationRepeat | function                                                          | null        | 当动画开始下一次重复播放时 callback 将被回调                                                |
| onAnimationCancel | function                                                          | null        | 在动画被取消时将会回调 callback，取消的情况包括                                             |

### 基于 Motion 扩展组件

支持了 [Animate.css](https://animate.style/) 部分动画

#### Fade

| 参数        | 类型                     | 默认                             | 说明                     |
| ----------- | ------------------------ | -------------------------------- | ------------------------ |
| type        | fadeIn,fadeInOut,fadeOut |                                  | 动画类型                 |
| style       | object                   | null                             | 父容器样式               |
| repeatCount | number , "loop"          | 每个动画可能都不太一样，支持修改 | 重复次数，无限循环"loop" |

```javascript
<Fade type={Fade.Type.fadeIn}>
  <Text>Fade.Type.fadeIn</Text>
</Fade>
<Fade type={Fade.Type.fadeInOut}>
  <Text>Fade.Type.fadeInOut</Text>
</Fade>
<Fade type={Fade.Type.fadeOut}>
  <Text>Fade.Type.fadeOut</Text>
</Fade>
```

#### Attention

| 参数        | 类型                                                 | 默认                             | 说明                     |
| ----------- | ---------------------------------------------------- | -------------------------------- | ------------------------ |
| type        | flash,pulse,headShake, shakeX,shakeY,heartBeat,swing |                                  | 动画类型                 |
| style       | object                                               | null                             | 父容器样式               |
| repeatCount | number , "loop"                                      | 每个动画可能都不太一样，支持修改 | 重复次数，无限循环"loop" |

```javascript
<Attention type={Attention.Type.flash}>
  <Text>Attention.Type.flash</Text>
</Attention>

<Attention type={Attention.Type.pulse}>
  <Text>Attention.Type.pulse</Text>
</Attention>

<Attention type={Attention.Type.headShake}>
  <Text>Attention.Type.headShake</Text>
</Attention>

<Attention type={Attention.Type.shakeX}>
  <Text>Attention.Type.shakeX</Text>
</Attention>

<Attention type={Attention.Type.shakeY}>
  <Text>Attention.Type.shakeY</Text>
</Attention>

<Attention type={Attention.Type.heartBeat}>
  <Text>Attention.Type.heartBeat</Text>
</Attention>

<Attention type={Attention.Type.swing}>
  <Text>Attention.Type.swing</Text>
</Attention>
```

#### Zoom

| 参数        | 类型             | 默认                             | 说明                     |
| ----------- | ---------------- | -------------------------------- | ------------------------ |
| type        | zoomIn,zoomInOut |                                  | 动画类型                 |
| style       | object           | null                             | 父容器样式               |
| repeatCount | number , "loop"  | 每个动画可能都不太一样，支持修改 | 重复次数，无限循环"loop" |

```js
<Zoom type={Zoom.Type.zoomIn}>
  <Text>Zoom.Type.zoomIn</Text>
</Zoom>
<Zoom type={Zoom.Type.zoomOut}>
  <Text>Zoom.Type.zoomInOut</Text>
</Zoom>
```

### Swiper 相关组件

Swiper 滑动组件是基于 `ViewPager` 封装；

InfiniteSwiper 支持无限滚动，是基于 `View`组件+`Touch` 事件模拟封装；

```js
<Swiper
  style={styles.container}
  onChange={position => {
    console.log("滑动选择位置:", position);
  }}
  data={[
    "http://dating-70085.pictestsz.qpic.cn/dating/8ac81358-ead1-4baf-97d0-38722978681a.jpg",
    "http://dating-70085.pictestsz.qpic.cn/dating/f821a36d-9e3b-46b0-bb0e-5f9909f08fed.jpg",
    "http://dating-70085.pictestsz.qpic.cn/dating/578c223e-013a-4555-96b1-2ca2bae2e40f.jpg",
    "http://dating-70085.pictestsz.qpic.cn/dating/005e0d33-fce0-4463-8768-657fe2d1a742.jpg"
  ]}
/>

<Swiper
  style={styles.swiperItem}
  onChange={position => {
    console.log("滑动选择位置:", position);
  }}
>
  <View style={styles.swiperItem}>
    <Text>1</Text>
  </View>
  <View style={styles.swiperItem}>
    <Text>2</Text>
  </View>
  <View style={styles.swiperItem}>
    <Text>3</Text>
  </View>
</Swiper>

<InfiniteSwiper
  data={[
    "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3485161753,4133001721&fm=26&gp=0.jpg",
    "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3692746275,43818183&fm=26&gp=0.jpg"
  ]}
  width={300}
  autoPlay={true}
  animationDuration={300}
  autoPlayDuration={3000}
  style={{ width: 300, height: 100 }}
/>
```
