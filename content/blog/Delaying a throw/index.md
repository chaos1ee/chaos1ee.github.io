---
title: Delaying a throw
date: '2020-02-11'
category: 'RxJS'
draft: false
---

### 问题

使用 Observable 数据时，不能直接使用 delay、delayWhen 等操作符延迟抛出错误，因为直接抛出的错误会被 catchError 操作符或 error callback catch 到，从而跳过延迟操作符。

### 解决方式

伪代码

```javascript
import { throwError } from 'rxjs'
import { materialize, dematerialize, delay } from 'rxjs/operators'

const source = throwError(new Error('test')).pipe(
  materialize(),
  delay(2000),
  //Somewhere later
  dematerialize()
)

source.subscribe(
  () => {},
  err => {
    console.error(err)
  }
)
```

### 操作符

#### materialize

materialize 把 next、error、complete 转化为 Observable Notification 对象。

#### dematerialize

与 materialize 的作用相反。

### 参考

1. github issue: https://github.com/Reactive-Extensions/RxJS/issues/648
2. materialize operator: https://rxjs-dev.firebaseapp.com/api/operators/materialize
3. dematerialize operator: https://rxjs-dev.firebaseapp.com/api/operators/dematerialize
4. Notification class: https://rxjs-dev.firebaseapp.com/api/index/class/Notification
