---
slug: 移动端input输入框聚焦状态下，屏幕自动缩放
title: 移动端input输入框聚焦状态下，屏幕自动缩放
authors: Jeffrey
tags: [css, ios]
---

## 解决问题方法：

- 添加 input 样式

```css
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input {
    font-size: 16px;
  }
}
```
