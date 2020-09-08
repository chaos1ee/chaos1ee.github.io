---
title: 常用shell命令
author: Li Hao
date: 2019-01-03
hero: './cover.jpg'
excerpt: 常用的shell命令
---

### 文件及目录

#### 查看文件内容

显示时同时显示行号:

```bash
$ cat -n
```

显示文件第一行:

```bash
$ head -1 filename
```

显示文件倒数第五行:

```bash
$ tail -5 filename
```

查看两个文件间的差别:

```bash
$ diff file1 file2
```

动态显示文本最新信息:

```bash
$ tail -f crawler.log
```

#### 查找文件内容

使用 egrep 查询文件内容

```bash
$ egrep '03.1\/CO\/AE' TSF_STAT_111130.log.012
$ egrep 'A_LMCA777:C' TSF_STAT_111130.log.035 > co.out2
```

#### 文件与目录权限修改

- 改变文件的拥有者 chown
- 改变文件读、写、执行等属性 chmod
- 递归子目录修改： chown -R tuxapp source/
- 增加脚本可执行权限： chmod a+x myscript

#### 给文件增加别名

创建符号链接/硬链接:

```bash
$ ln cc ccAgain :硬连接；删除一个，将仍能找到；
$ ln -s cc ccTo :符号链接(软链接)；删除源，另一个无法使用；（后面一个ccTo 为新建的文件）
```

#### 管道和重定向

- 批处理命令连接执行，使用 |
- 串联: 使用分号 ;
- 前面成功，则执行后面一条，否则，不执行:&&
- 前面失败，则后一条执行: ||

```bash
$ ls /proc && echo  suss! || echo failed.
```

等价于

```bash
$ if ls /proc; then echo suss; else echo fail; fi

```

清空文件:

```bash
$ :> a.txt

```

重定向:

```bash
$ echo aa >> a.txt

```

#### 设置环境变量

启动帐号后自动执行的是 文件为 .profile，然后通过这个文件可设置自己的环境变量；

安装的软件路径一般需要加入到 path 中:

```bash
$ export PATH=$APPDIR:/opt/app/soft/bin:$PATH:/usr/local/bin:$TUXDIR/bin:$ORACLE_HOME/bin;

```
