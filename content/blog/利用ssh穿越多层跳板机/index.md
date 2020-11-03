---
title: 利用ssh穿越多层跳板机
date: '2020-02-05'
draft: false
---

**1. client 直接穿越多层跳板机**

配置 client 的`~/.ssh/config`文件

```text
Host jumper
  HostName 118.24.213.153
  Port 52022
  User haoli
  IdentityFile ~/.ssh/keys/staging.pem

Host jumper2
  HostName 118.24.205.100
  User root
  ProxyJump jumper

Host jumper3
  HostName 192.168.16.78
  User root
  ProxyJump jumper2
```

在 client 上执行以下命令

```shell
$ echo "echo \"$(cat ~/.ssh/id_rsa.pub)\" >> ~/.ssh/authorized_keys"
```

复制输出结果，登陆跳板机，在跳板机上执行刚才复制的命令，执行完毕即可在 client 直接连接各级跳板机。

**2. client 设置 ControlMaster 高速复用 ssh 连接**

将如下代码加入到~/.ssh/config 文件顶部，第一次 ssh 登录之后再次 ssh 登陆，几乎没有无延时。一段时间内重用连接不需要认证过程（对于密码登陆方式就是不要求输入密码了）

```text
Host *
  ServerAliveInterval 10
  TCPKeepAlive yes
  ControlPersist yes
  ControlMaster auto
  ControlPath ~/.ssh/master_%r_%h_%p
```
