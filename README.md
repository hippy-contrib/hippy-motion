## Introduction

hippy-motion: hippy-react 动画库


### How to use

```
yarn add @tencent/hippy-motion
```

### Custom component

```js
import React, { Component } from "react";
import { Motion } from "@tencent/hippy-motion";

/**
 * @visibleName CustomComponent
 */
export default class CustomComponent extends Component<FadeProps> {
  render() {
    const { style, children, type } = this.props;
    return <Motion style={style} animation={{
      opacity: {
        value: [0,1,0],
        duration: 3000
      },
      translateX: {
        value: [-10,0],
        repeatCount: 10,
        duration: 300
      }
    }}>
      {children}
    </Motion>
  }
};
```


| 参数      | 类型	           | 默认 | 说明    |
|------------|----------------|---------|----------------|
| style  | object | null    | 父容器样式 |
| animation  | array | null    | 需要执行动画的参数 |
| paused      | boolean        | false   | 暂停动画 |
| onAnimationEnd    | function        | null   | 动画结束 |


### animation
### 基本 style 可动画参数
|     参数名称       |    	说明     |
|-------------------|---------------------|
|   width           |  `{ width: 100 }` 元素当前宽度到 100px |
|   height          |  `{ height: 100 }` 元素当前高度到 100px |
|   opacity         |  `{ opacity: 0 }` 元素当前透明度到 0 |
|   top             |  `{ top: 100 }` 元素当前顶部距离到 100px, 需配合 `position: relative | absolute` |
|   right           | `{ right: 100 }` 元素当前右部距离到 100px, 需配合 `position: relative | absolute`  |
|   bottom          | `{ bottom: 100 }` 元素当前下部距离到 100px, 需配合 `position: relative | absolute`  |
|   left            | `{ left: 100 }` 元素当前左部距离到 100px, 需配合 `position: relative | absolute`  |


### transform 参数

|     参数名称       |    	说明     |
|-------------------|---------------------|
|   translateX   | `{ translateX: {value: [0,10]} }`, x 方向的位置移动 10px |
|   translateY  | `{ translateY: {value: [0,10]} }`, y 方向的位置移动 10px |
|   rotate          | `{ rotate: {value: 10} } ` 元素以 transformOrigin 的中心点旋转 10deg |
|   scale           | `{ scale: {value: 0.1} }` 元素以 transformOrigin 的中心点缩放到 0.1 |


#### 动画对象参数;

| 参数      | 类型	           | 默认 | 说明    |
|------------|----------------|---------|----------------|
| value  | number[] | []    | [x,y,z] 从x边y变z |
| duration  | number | 0    | 动画时长 |
| repeatCount  | number , "loop"   | 0   | 动画的重复次数，默认为0， loop 代表无限循环播放 |
| timingFunction    |   "linear" , "ease-in" , "ease-out" , "ease-in-out" , "ease_bezier"      | linear   |  动画缓动函数 |
| onAnimationEnd    | function        | null   | 动画结束 |
| onAnimationRepeat    | function        | null   | 当动画开始下一次重复播放时callback将被回调 |
| onAnimationCancel    | function        | null   | 在动画被取消时将会回调callback，取消的情况包括 |



## 动效价值
* 增加体验舒适度： 让用户认知过程更为自然。
* 增加界面活力：第一时间吸引注意力，突出重点。
* 描述层级关系：体现元素之间的层级与空间关系。
* 提供反馈、明确意向：助力交互体验。


## Speed速度
1. Hippy-Motion 组件里的基本时间单位
最快时间: 100ms, 基本时间: 200ms, 较大时间：300ms... 100 的倍增方式。

2. 页面转换或其它的时间单位
最快时间: 150ms, 基本时间: 300ms, 平滑时间：450ms, 较大时间: 600ms... 150 的倍增方式


### 动态效果
1. 单物体可视范围内点到点之间的运动
单物体可视范围内点到点之间的运动，采用的是 ease-in-out

2. 单物体可视范围外进场的运动
单物体进入可视范围的运动，采用的是 ease-out

3. 单物体可视范围内出场的运动
单物体出可视范围的运动，采用的是 ease-in


