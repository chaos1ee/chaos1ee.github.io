---
title: 2018年终总结
date: 2019-01-03
category: '年终总结'
draft: false
---

时光飞逝，不知不觉中 2018 年已经过去了。今年上半年的时候，我还沐浴在广州温暖和煦的阳光中，没想到下半年我就处在了天寒地冻的北京。回首过去的这一年，有收获的喜悦，也有遭遇挫折时的颓废疲惫；既体会过进入新环境时的新鲜感，也体会到了融入新团队、接受新的工作方式的不易。

管理大师查尔斯.汉迪提出过一个理论叫做：第二曲线。

它说的是任何一条增长曲线都会划过抛物线的顶点，想要持续发展，就必须开始一条新的曲线。这大概也是我选择离开广州的动机。

2018 年，我经历了一些大的改变：工作生活环境的变化，学习新的技术栈。

## 半年来的工作

在北京的这段时间，我主要经历了两个阶段：PSD 驻场阶段与进入研发团队阶段。

PSD 期间的工作其实乏善可陈。由于进入团队的时期已经接近项目的收尾阶段，所以大部分时间都在做一些维护工作，鲜有新的开发任务，而且这个项目使用的技术栈（Vue、VueAdmin）对于我来说相对比较熟悉，所以这段时期内大部分时间都感觉非常轻松愉悦。当然也有被客户方封闭的开发方式及风格迥异的代码折磨得苦不堪言的时候，但是也都通过同事的协助及自己的坚持挺了过来。唯一觉得可惜的是当时正在实验的一些想法没有来的及付诸实践，随后由于匆匆撤离团队最终不了了之。

十一过后我被召回了公司，进入研发团队以后，我被分配到企业场景虚拟团队，主要负责一些权限相关及企业对接的业务。在刚回到公司的日子里我经历了很长的一段阵痛期。一方面由于对团队成员不了解，另一方面（也是主要的）对于新的技术栈以及更加庞大的业务的陌生和畏惧，导致我在刚进入团队的时候极其茫然及胆怯。但是之后由于工作上有团队成员的帮助，以及自己也渐渐适应了公司的技术和团队的合作方式，所以我也慢慢不再像之前那般压力重大。

总结一下在公司这半年的工作大概如下：

1、中信容器云平台（CMPC）开发、维护。使用 Vue、VueAdmin 等相关技术栈开发 CMPC 平台（基本上是开发大平台的精简版），我的主要任务是修复 bug，负责的新需求大概只有审计列表和日志模块重构，最后从中信撤离之前已经开发完成并成功交接。

2、企业场景虚拟团队开发任务 —— 大平台支持的全部登陆场景的优化。这次任务侧重的是样式的改版，所以逻辑基本没有太大变化，主要工作包括：重写大部分样式，增加登陆验证优先级，对旧的登陆动态表单进行了重构以适应新的业务需求。

3、企业场景虚拟团队开发任务 —— ACE 多租户相关需求。我主要负责组页面、组详情页面的开发及联调工作，后来因为要开发其他需求所以只完成了迭代一就撤出了，目前会负责处理多租户的 bug。

4、企业场景虚拟团队开发任务 —— K8S 权限打通。负责 K8S 权限打通迭代一及迭代二的工作（迭代一肖老师有参与），将需求中最复杂的嵌套 table 部分抽象为表格组件，删减了大量重复代码，降低耦合，使得可以在多个场景中使用，方便开发维护。

## 收获

1、利用坐地铁和周末的时间看完了几本技术类的书籍《Rxjs 深入浅出》、《Angular 权威教程》、《Nodejs 实战（第二版）》等。这几本书基本上都是为了应对公司的技术栈去看的，自我感觉收获还是有的，特别是 Rxjs 这本书，反复看了两遍后我终于不再像之前那样对 rxjs 这项技术那么畏惧，而且也终于有勇气在项目中实践了。当然知易行难，其实还是有很多东西需要去深入了解或挖掘的，目前的我距离玩转这些技术还是相当遥远的，日后多加努力。

2、融入团队，接受新的工作方式。其实在这件事情上我面对的压力不比学习新的技术要小，我知道这方面一直以来是我的短板，特别是刚来的时候碰巧遇到了几个新的需求，然后我不得不在各种会议之中辗转，而且尴尬的是由于自身对于会议上讨论的问题缺乏了解，所以时常困惑焦躁。在适应了一段时间后，由于现在我对相关业务有了更多的了解，所以在之后的会议中渐渐有了一点参与感，这是让我感到很开心的一点吧。

## 总结

今年并不是圆满的一年，工作和生活方面好像并没有达到我的预期，但是离开广州之于我是一个正确的决定。去年春节我在武汉的时候给自己定了十个小目标，保存在我的朋友圈里，这十个小目标有关于技术方面的，也有关于生活方面的。在今天我去逐一比对的时候，发现有些执行了，有些没有坚持下来。无论工作或是生活，有时候总是莫名其妙地驶入了我未曾预料到的轨道，但是想想这有可能也是生活给我的意外之“喜”，只能感恩了。
