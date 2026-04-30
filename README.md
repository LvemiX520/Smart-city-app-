# 2023年江西省职业技能大赛 - 移动应用与设计 (智慧城市)

## 项目简介
本项目是为 **2023年江西省职业技能大赛移动应用与设计赛项**（智慧城市主题）开发的移动端原型系统。项目基于 **uni-app** 框架与 **uView UI** 组件库构建，实现了跨平台（Android/iOS/H5/小程序）的高效开发。

## 技术栈
- **框架**：[uni-app](https://uniapp.dcloud.net.cn/) (基于 Vue 2.x)
- **UI 库**：[uView UI v1.x](https://v1.uviewui.com/)
- **状态管理**：Vuex
- **网络请求**：uView HTTP 拦截器封装
- **图表库**：u-charts

## 核心功能模块
项目涵盖了智慧城市赛题要求的标准功能模块：
- **首页 (Portal)**：轮播图展示、热门服务搜索、推荐位。
- **全部服务 (Services)**：
  - **定制班车**：线路查询、详情、在线下单。
  - **生活缴费**：水电煤等基础服务缴费。
  - **找房子**：房源列表及详情展示。
  - **门诊预约**：医院筛选、医生预约、历史单据管理。
- **新闻资讯 (News)**：新闻分类流、图文详情、评论互动。
- **个人中心 (User Center)**：用户信息管理、密码修改、订单追踪、意见反馈。
- **系统设置**：支持动态配置服务器 IP 与端口，适配比赛现场环境。

## 关键 API 接口详情
项目对接了智慧城市标准后台接口，所有请求均以 `/prod-api` 为前缀。

### 1. 认证与用户模块
| 功能 | 路径 | 方法 | 请求参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| **用户登录** | `/api/login` | POST | `{username, password}` | 返回 Token 用于后续鉴权 |
| **用户注册** | `/api/register` | POST | `{userName, nickName, password, phonenumber, email, idCard, sex, avatar}` | 新用户注册 |
| **获取用户信息** | `/api/common/user/getInfo` | GET | Header: `Authorization` | 获取当前登录用户的详细资料 |
| **修改个人资料** | `/api/common/user` | PUT | `{idCard, nickName, phonenumber, sex}` | 更新用户昵称、性别等信息 |
| **重置密码** | `/api/common/user/resetPwd` | PUT | `{oldPassword, newPassword}` | 修改账户登录密码 |

### 2. 首页与公共服务
| 功能 | 路径 | 方法 | 请求参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| **首页轮播图** | `/api/rotation/list` | GET | - | 返回首页顶部的广告轮播图列表 |
| **推荐服务** | `/api/service/list` | GET | - | 获取首页展示的快捷服务图标 |
| **意见反馈** | `/api/common/feedback` | POST | `{title, content}` | 提交用户意见或错误报告 |

### 3. 新闻资讯模块
| 功能 | 路径 | 方法 | 请求参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| **新闻分类** | `/press/category/list` | GET | - | 获取新闻板块的所有分类 |
| **新闻列表** | `/press/press/list` | GET | - | 获取新闻文章列表，可根据分类筛选 |
| **新闻详情** | `/press/press/{id}` | GET | `id` (路径参数) | 获取单篇新闻的详细图文内容 |
| **新闻评论列表** | `/press/comments/list` | GET | - | 获取所有评论，前端通常根据 `newsId` 过滤 |

### 4. 智慧服务模块 (业务类)
| 功能 | 路径 | 方法 | 请求参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| **定制班车线路** | `/api/bus/line/list` | GET | - | 获取所有班车线路信息 |
| **班车站点列表** | `/api/bus/stop/list` | GET | - | 获取班车经过的站点详情 |
| **生活缴费轮播** | `/api/living/rotation/list` | GET | - | 生活缴费页面的顶部幻灯片 |
| **缴费项目分类** | `/api/living/category/list` | GET | - | 水电燃气等缴费类目的获取 |
| **医院列表** | `/api/hospital/hospital/list` | GET | - | 门诊预约模块的医院清单 |
| **医院详情** | `/api/hospital/hospital/{id}` | GET | `id` (路径参数) | 获取特定医院的介绍与排班 |

## 开发注意事项
1. **API 基地址 (BaseURL)**：
   - 项目中通过 `common/fetch.js` 统一管理请求。
   - 比赛现场需通过 **系统设置 (IP 设置)** 页面动态配置服务器 IP，配置后会存储在本地 `Storage` 中。
2. **鉴权处理 (Token)**：
   - 登录成功后，服务器返回的 `token` 会自动存储。
   - 所有受保护的接口（如个人资料修改、提交反馈）均需在 Header 中携带 `Authorization: <Token>`。
3. **图片路径**：
   - 接口返回的图片路径（如 `advImg`, `cover`）通常为相对路径，显示时需拼接 `baseUrl` 前缀。

## 项目目录结构
- `/pages`：业务页面代码。
- `/uview-ui`：本地集成的 uView UI 组件源码。
- `/common`：网络拦截器 (`http.interceptor.js`) 与 API 接口 (`http.api.js`)。
- `/store`：Vuex 全局状态管理。
- `/static`：静态图片、字体及 TabBar 资源。

## 快速上手
1. 使用 **HBuilderX** 打开本项目。
2. 在 `common/http.interceptor.js` 中配置后端 API 基础路径（或通过运行项目中的 IP 设置页面动态配置）。
3. 运行至浏览器或模拟器进行调试。

---
*本项目仅供 2023年江西省职业技能大赛参赛及学习参考。*
