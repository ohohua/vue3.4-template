这是一个基于 Vue 3.5 和 Element Plus 构建的项目，旨在为开发者提供一个高效、稳定、美观的管理系统解决方案。

## 技术栈 💻

- **前端**: Vue 3, Element Plus, Pinia, Vue Router, Axios, NProgress, ECharts, Vue I18n, Tailwind CSS, SCSS, Vite, ESLint, Prettier

## 特性 🌠

- 使用 Vue 3 开发单页应用程序，利用其响应式和组件化的特点，提高开发效率和代码可维护性。

- 使用 Element Plus 提供 UI 组件库，确保界面美观一致，提升用户体验。

- 使用 Pinia 进行状态管理，简化状态管理流程，并提高应用状态的可预测性。

- 使用 Vue Router 实现客户端路由，支持多页面导航和路由守卫功能。

- 使用 Axios 进行 HTTP 请求，统一管理 API 接口，方便与后端服务交互。

- 使用 NProgress 显示页面加载进度条，提升用户体验。

- 使用 ECharts 实现数据可视化，支持丰富的图表类型，帮助用户理解数据。

- 使用 Vue I18n 实现多语言支持，提升应用的国际化能力。

- 使用 Tailwind CSS 提供实用的 CSS 工具类，简化样式编写，提高样式的复用性和一致性。

- 使用 SCSS 编写样式，支持嵌套规则和变量，增强 CSS 的可维护性。

- 使用 Vite 提供快速的开发构建工具，提升开发体验和构建速度。

- 采用 Anthony Fu 的 ESLint 规则，统一代码风格。

## 规范 ⏰

- 组件名称使用大驼峰命名法，组合式函数使用小驼峰命名。例如 `UserInfo.vue`、`useTable.ts`。

- 接口请求方法使用 `swagger-typescript-api` 生成，执行 `pnpm run generate-api` 即可。

- 组件类名以 `BEM` 的方式去编写，或者 tailwind。查看详细说明 👇

## 错误记录 ❌

- Vue 3 迁移中说明 v-bind="$listener" 已经合并到 v-bind="$attrs" 里

## 详细说明 📕

- BEM

```css
.block {
  /**do sth */
}

.block__element {
  /**do sth */
}

.block--modifier {
  /**do sth */
}
```

- 每一个块(block)名应该有一个命名空间（前缀）
  - `block` 代表了更高级别的抽象或组件
  - `block__element` 代表 `.block` 的后代，用于形成一个完整的 `.block` 整体。
  - `block--modifier` 代表 `.block` 的不同状态或不同版本。使用两个连字符和下划线而不是一个，是为了让你自己的块可以用单个连字符来界定。如

```css
.sub-block__element {
  /**do sth */
}

.sub-block--modifier {
  /**do sth */
}
```

## 还原动态路由

1. loginCom.vue里的登录方法还原
2. adminAside.vue里的authStore.routerMenu还原
3. routes.ts里的baseRouter删除
