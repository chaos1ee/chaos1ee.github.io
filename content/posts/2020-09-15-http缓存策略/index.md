---
title: HTTP协议
author: Li Hao
date: '2020-09-15'
excerpt: 主要讲解Http协议中与缓存相关的header的含义，以及使用方式
hero: images/dog-5288071_1280.jpg
---
## HTTP协议

### 什么是 HTTP

HTTP 是构建与 TCP/IP 协议的应用层协议，默认端口号 80，http 是无连接[^1]无状态[^2]的。

[^1]: 无连接是指每次连接只能处理一个请求，不可以重复使用
[^2]: 无状态是指协议对于事物处理没有记忆能力，不会记录任何的状态
