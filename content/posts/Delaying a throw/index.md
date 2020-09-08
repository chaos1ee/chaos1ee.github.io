---
title: Delaying a throw
date: 2019-03-14 17:14:06
author: Li Hao
hero: './cover.jpg'
---

### 问题

不能直接使用 delay、delayWhen 操作符，因为直接抛出的错误会被 catchError 操作符或 error callback catch 到，从而跳过延迟操作符。

### 解决方式

伪代码

```js
const source = throwError('test')
  .materialize()
  .delay(1000)
  //Somewhere later
  .dematerialize();
```

### 操作符

#### materialize

materialize 把 next、error、complete 转化为 Observable Notification 对象。

#### dematerialize

与 materialize 的作用相反。

### 参考

1. https://github.com/Reactive-Extensions/RxJS/issues/648

2. materialize https://rxjs-dev.firebaseapp.com/api/operators/materialize
3. dematerialize https://rxjs-dev.firebaseapp.com/api/operators/dematerialize
4. Notification https://rxjs-dev.firebaseapp.com/api/index/class/Notification
