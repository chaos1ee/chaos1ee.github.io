---
title: 使用Docker部署应用
date: 2019-01-03
author: Li Hao
hero: './cover.jpg'
---

## 理解 docker 中的相关概念

1. 镜像、容器、Dockerfile
2. k8s 相关拓展: pod、node、k8s 资源（Service、Deployment 等）

（见 docker 或 k8 官方文档）

## 常用命令

镜像、容器管理

```bash
# 列出所有镜像
$ docker images

# 列出所有容器
$ docker ps
# -f 过滤

# 删除镜像
$ docker rmi <image_id/image_name>

# 删除所有镜像
$ docker rmi $(docker images -aq)

# 删除容器
$ docker rm <container_id/container_name>

# 删除所有容器
$ docker rm $(docker ps -aq)
```

构建镜像

```bash
$ docker build -t <image-name:tag> <directory>

# <image-name:tag> - 镜像名称和tag
# <directory> - Dockerfile所在目录
```

创建容器

```bash
$ docker run [-d] [-i] [-t] -p <port1:port2> <image_name>
# -p <port1:port2> - 将容器内部端口port2映射到外部端口port1
# <image_name> - 镜像名称
# -d - 在后台运行容器
# -i - 可以通过标准输入流进行交互
# -t - 终端
```

进入容器内部

```bash
# 1. 运行容器
$ docker run -dit -p <port1:port2> <image_name>

# 2.1 attach的方式进入容器（不推荐）
$ docker attach <container_id>

# 2.2 exec的方式进入容器(推荐)
$ docker exec -it <container_id> bash
```
