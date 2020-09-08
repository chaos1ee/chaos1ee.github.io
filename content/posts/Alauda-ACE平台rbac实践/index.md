---
title: Alauda ACE平台rbac实践
author: Li Hao
date: 2019-03-14 17:14:06
hero: './cover.jpg'
excerpt: RBAC（Role Based Access Control）在Alauda ACE平台上的实践
---

rbac 即所谓的`role-based access control`（基于角色的访问控制），它是一种被广泛使用的访问控制机制。它的核心要义是用户不再直接被赋予权限，而是将权限赋予角色，然后根据用户的不同定位，再将不同的角色赋予用户。角色是由权限构成的集合，而用户则是角色的集合。大平台采用了 rbac 这种权限控制机制，下面简单说明。

### weblab

K8S_AUTH_ENABLED 是否打开 k8s 权限

### ACE rbac 相关定义

#### 资源

- 定义一类权限的实体，如应用、应用模板等。
- 分为平台资源和 k8s 资源两类，平台资源可以关联 k8s 资源，所有的平台资源（或 k8s 资源）的资源类型互斥，平台资源与 k8s 资源的资源类型可能相同。

#### 权限

- 包含权限操作、约束条件、资源名称三个部分。
- 一条权限表示用户在某个上下文中对何种资源可以进行哪些操作。

#### 角色

- 一个角色是多条权限的集合。
- 一个角色可以被分配给多个用户。
- 一个用户可以同时拥有多个角色。
- 一个角色可以继承自其他一个或多个角色，并继承这些角色所包含的权限。

#### 角色模板

- 用于生成角色，分为官方模板与自定义模板

### 数据接口

主要的数据接口包含以下几个：

#### 获取 schema

| url                                    | method |
| -------------------------------------- | ------ |
| /v3/role-schema/{api_group}/{resource} | GET    |

response:

```json
{
  "resource_type": "test18",
  "api_group": "alauda.io",
  "resource_class": "kubernetes",
  "resource_source": "custom",
  "actions": ["test18:delete", "test18:list"],
  "general": false,
  "api_group_source": "custom",
  "constraints": ["res:project", "res:cluster", "res:namespace"]
}
```

部分字段释义：

- resource_type 资源类型
- api_group api 组，k8s 资源独有。
- resource_class 资源分类，可能的值包括“kubernetes”或“platform”。
- actions 权限操作，可以对资源进行的操作。
- constraints 约束条件。

#### 角色详情接口

| url                               | method |
| --------------------------------- | ------ |
| /v3/roles/{namespace}/{role_name} | GET    |

response:

```json
{
  "space_uuid": "",
  "name": "role_sample0401",
  "role_type": "namespace",
  "resource_actions": [
    "role:assign",
    "role:create",
    "role:delete",
    "role:revoke",
    "role:update",
    "role:view"
  ],
  "template_uuid": "",
  "admin_role": false,
  "project_name": "",
  "uuid": "b538ea31-2c07-48ed-9dbd-f9bbc9c7e841",
  "project_uuid": "",
  "created_at": "2018-12-11T05:41:08.662625Z",
  "namespace": "alauda",
  "updated_at": "2018-12-11T05:41:08.662625Z",
  "created_by": "alauda01",
  "assigned_at": "0001-01-01T00:00:00Z",
  "space_name": "",
  "permissions": [
    {
      "resource": ["resours_name02"],
      "uuid": "1d59adf6-abe1-44c9-bb97-32a140261a0a",
      "resource_class": "platform",
      "actions": ["application:create", "application:delete"],
      "resource_type": "application",
      "constraints": [
        {
          "res:project": "chao"
        }
      ]
    }
  ]
}
```

部分字段释义：

- name 角色名称。
- role_type 角色类型，可能的值为“platform”、“project”、“namespace”。
- template_uuid 角色模板源（基于该模板创建）的 uuid。
- namespace 命名空间名称。
- permissions 角色包含的权限，权限内每一项的含义见上一个接口的释义。

更多接口信息见[confluence 文档](http://confluence.alaudatech.com/pages/viewpage.action?pageId=31920356)。

### 组件设计

![permissions-table](/../images/rbac-table.png)

在大平台“权限管理”左导航内的多个页面（角色创建、角色详情、角色模板创建、角色模板详情等等）都使用到了 permissions-table 这个组件，它主要借助 NgTemplateOutlet 在表格中插入视图而实现的，提供权限的查看、编辑、增、删功能。

该组件的数据主要保存在 schemeMap 和 permissionsMap 中。

schemMap 是根据后端返回的 schema 加以处理生成的，它的结构大致为如下的树状结构。

![permissions-table-design](/../images/rbac-tree.png)

如图所示，整个组件分为平台与 k8s 两个部分，可以使用“K8S_AUTH_ENABLED”这个 weblab 控制是否开启 k8s 权限。

对于平台 schema，根据“PLATFORM_GROUPS_MAP”这个常量的映射关系将 schema 分配到不同的 group、type、resource_type 下，每一个 resource_type 具有唯一的 schema。

对于 k8s schema，直接按照 schema 的 api_group 分组，一个 api_group 对应多个 resource_type，每个 resource_type 具有唯一的 schema。

schema 用于生成初始化的权限数据。

permissionsMap 是已经生成的权限组成的 map，它的 key 是由权限按照一定规则生成的 id，值为权限数组。

permissionsMap 的数据有两种来源

1. 来自组件内部（各种交互产生）。
2. 通过双向绑定流入。

当权限数据变化时，组件通过双向绑定向组件外部发射新值。
