# Vercel 平台完全部署指南

<!-- 本文档详细介绍 Vercel 平台的使用方法 -->
<!-- 包含：账号注册、GitHub 关联、项目部署、域名解析、自动部署等内容 -->
<!-- 每一行都附带详细注释，帮助理解每个步骤的作用 -->

---

## 什么是 Vercel

<!-- Vercel 是一个面向前端开发者的云平台 -->
<!-- 主要用于静态网站和 Serverless 函数的部署 -->

Vercel 是一个现代化的前端云平台，具有以下特点：

<!-- 特点1：零配置部署，自动检测项目框架 -->
- **零配置部署**：自动检测 Next.js、Vue、React 等框架

<!-- 特点2：全球 CDN 加速，提供快速访问 -->
- **全球 CDN**：边缘网络确保全球快速访问

<!-- 特点3：支持 Git 集成，实现自动部署 -->
- **Git 集成**：连接 GitHub/GitLab/Bitbucket 自动部署

<!-- 特点4：支持 Serverless Functions -->
- **Serverless Functions**：支持后端 API 开发

<!-- 特点5：免费 SSL 证书 -->
- **免费 HTTPS**：自动配置 SSL 证书

---

## 账号注册与 GitHub 关联

<!-- 本节介绍如何注册 Vercel 账号并关联 GitHub -->

### 步骤 1：访问 Vercel 官网

<!-- 打开 Vercel 官网进行注册 -->

```bash
# 在浏览器中访问 Vercel 官网
# 官网地址：https://vercel.com
https://vercel.com
```

### 步骤 2：使用 GitHub 登录

<!-- 推荐使用 GitHub 账号登录，方便后续项目导入 -->
<!-- 点击 "Continue with GitHub" 按钮 -->

1. 点击 **"Sign Up"** 按钮
2. 选择 **"Continue with GitHub"**
3. 授权 Vercel 访问你的 GitHub 账号

<!-- 授权时会请求以下权限 -->
```text
# Vercel 请求的 GitHub 权限说明：
# - 读取仓库信息：获取项目代码
# - 读取用户邮箱：用于通知
# - 读写 Webhooks：实现自动部署
# - 读写部署状态：显示部署状态
```

### 步骤 3：完成账号设置

<!-- 填写基本信息完成注册 -->

```text
# 注册完成后需要设置：
# 1. 用户名（username）- 用于生成默认域名
# 2. 团队名称（可选）- 用于团队协作
# 3. 选择使用场景 - Hobby（个人）/ Pro（专业）
```

### 步骤 4：关联更多 GitHub 仓库

<!-- 如果需要访问更多仓库，需要配置 GitHub App -->

```text
# 在 Vercel 中配置 GitHub 集成：
# 1. 进入 Settings -> Git Integration
# 2. 点击 "Configure GitHub App"
# 3. 选择 "All repositories" 或指定仓库
# 4. 点击 "Save" 保存配置
```

<!-- 配置界面路径 -->
```bash
# 配置路径：
# Settings -> Integrations -> GitHub -> Configure
```

---

## 项目部署

<!-- 本节介绍如何将项目部署到 Vercel -->

### 方法一：通过 Vercel Dashboard 导入

<!-- 最简单的部署方式，通过网页界面操作 -->

#### 步骤 1：新建项目

<!-- 点击 Add New -> Project -->

```text
# 在 Vercel Dashboard 中：
# 1. 点击 "Add New" 按钮
# 2. 选择 "Project"
# 3. 进入项目导入页面
```

#### 步骤 2：选择 Git 仓库

<!-- 从 GitHub 仓库列表中选择要部署的项目 -->

```text
# 导入 Git 仓库：
# 1. 在仓库列表中找到目标项目
# 2. 点击 "Import" 按钮
# 3. 如果看不到仓库，点击 "Adjust GitHub App Permissions"
```

#### 步骤 3：配置项目

<!-- 配置项目的构建设置 -->

```text
# 项目配置选项说明：

# Project Name（项目名称）
# - 用于生成默认域名：your-project.vercel.app
# - 建议使用小写字母和连字符

# Framework Preset（框架预设）
# - Vercel 会自动检测框架类型
# - 支持：Next.js, Vue, React, Nuxt, Vite 等

# Root Directory（根目录）
# - 如果项目不在仓库根目录，需要指定
# - 例如：packages/frontend

# Build Command（构建命令）
# - 默认使用 package.json 中的 build 脚本
# - 可自定义：npm run build 或 yarn build

# Output Directory（输出目录）
# - 构建产物的目录
# - Vue/Vite 通常是 dist
# - Next.js 通常是 .next

# Install Command（安装命令）
# - 默认：npm install 或 yarn install
# - 可自定义安装命令
```

<!-- 环境变量配置 -->
```text
# Environment Variables（环境变量）：
# - 点击 "Environment Variables" 展开
# - 添加项目所需的环境变量
# - 格式：KEY=VALUE
# - 可选择变量适用的环境（Production/Preview/Development）
```

#### 步骤 4：点击部署

<!-- 确认配置后开始部署 -->

```text
# 点击 "Deploy" 按钮：
# 1. Vercel 克隆代码
# 2. 安装依赖
# 3. 执行构建
# 4. 部署到全球 CDN
# 5. 生成访问链接
```

### 方法二：使用 Vercel CLI 部署

<!-- 通过命令行工具部署，适合开发者 -->

#### 步骤 1：安装 Vercel CLI

<!-- 全局安装 Vercel 命令行工具 -->

```bash
# 使用 npm 全局安装 Vercel CLI
# -g 参数表示全局安装，可在任意目录使用
npm install -g vercel

# 或者使用 yarn 安装
yarn global add vercel

# 或者使用 pnpm 安装
pnpm add -g vercel
```

#### 步骤 2：登录 Vercel

<!-- 在命令行中登录 Vercel 账号 -->

```bash
# 执行登录命令
# 会打开浏览器进行授权
vercel login

# 登录方式选项：
# - Continue with GitHub（推荐）
# - Continue with GitLab
# - Continue with Bitbucket
# - Continue with Email
```

#### 步骤 3：初始化项目

<!-- 在项目目录中初始化 Vercel 配置 -->

```bash
# 进入项目目录
cd your-project

# 执行 vercel 命令进行初始化和部署
# 首次执行会进行项目配置
vercel

# 交互式配置选项：
# ? Set up and deploy "~/your-project"? [Y/n] y
# ? Which scope do you want to deploy to? Your Account
# ? Link to existing project? [y/N] n
# ? What's your project's name? your-project
# ? In which directory is your code located? ./
# ? Want to override the settings? [y/N] n
```

#### 步骤 4：部署到生产环境

<!-- 使用 --prod 参数部署到生产环境 -->

```bash
# 部署到预览环境（默认）
vercel

# 部署到生产环境
# --prod 参数表示生产环境部署
vercel --prod

# 部署完成后会显示：
# ✅ Production: https://your-project.vercel.app
```

---

## 域名解析配置

<!-- 本节介绍如何配置自定义域名 -->

### 步骤 1：添加自定义域名

<!-- 在 Vercel 项目设置中添加域名 -->

```text
# 在 Vercel Dashboard 中：
# 1. 进入项目页面
# 2. 点击 "Settings" 标签
# 3. 选择 "Domains" 菜单
# 4. 输入你的域名，如：example.com
# 5. 点击 "Add" 按钮
```

### 步骤 2：获取 DNS 记录

<!-- Vercel 会提供需要配置的 DNS 记录 -->

```text
# Vercel 提供的 DNS 记录类型：

# 方式一：使用 A 记录（推荐用于根域名）
# 类型：A
# 名称：@（或留空，表示根域名）
# 值：76.76.21.21
# TTL：自动或 3600

# 方式二：使用 CNAME 记录（推荐用于子域名）
# 类型：CNAME
# 名称：www（或其他子域名）
# 值：cname.vercel-dns.com
# TTL：自动或 3600
```

### 步骤 3：在域名服务商配置 DNS

<!-- 不同域名服务商的配置方法 -->

#### 阿里云（万网）DNS 配置

<!-- 阿里云域名 DNS 配置步骤 -->

```text
# 阿里云 DNS 配置步骤：
# 1. 登录阿里云控制台
# 2. 进入 "域名" -> "域名列表"
# 3. 找到你的域名，点击 "解析"
# 4. 点击 "添加记录"

# 配置根域名（example.com）：
# 记录类型：A
# 主机记录：@
# 记录值：76.76.21.21
# TTL：10分钟

# 配置 www 子域名（www.example.com）：
# 记录类型：CNAME
# 主机记录：www
# 记录值：cname.vercel-dns.com
# TTL：10分钟
```

#### 腾讯云 DNSPod 配置

<!-- 腾讯云域名 DNS 配置步骤 -->

```text
# 腾讯云 DNS 配置步骤：
# 1. 登录腾讯云控制台
# 2. 进入 "域名注册" -> "我的域名"
# 3. 点击域名进入详情
# 4. 选择 "DNS 解析" 标签
# 5. 点击 "添加记录"

# 配置示例：
# 主机记录：@
# 记录类型：A
# 记录值：76.76.21.21
# TTL：600
```

#### Cloudflare DNS 配置

<!-- Cloudflare DNS 配置（如果使用 Cloudflare） -->

```text
# Cloudflare DNS 配置步骤：
# 1. 登录 Cloudflare Dashboard
# 2. 选择你的域名
# 3. 进入 "DNS" -> "Records"
# 4. 点击 "Add record"

# 重要提示：
# - 关闭 Proxy 代理（云朵图标置灰）
# - 因为 Vercel 已有 CDN，无需 Cloudflare 代理

# 配置示例：
# Type: A
# Name: @
# IPv4 address: 76.76.21.21
# Proxy status: DNS only（灰色云朵）
# TTL: Auto
```

### 步骤 4：验证域名

<!-- 等待 DNS 生效并验证 -->

```bash
# 检查 DNS 是否生效
# 使用 dig 命令查询（macOS/Linux）
dig example.com

# 使用 nslookup 命令查询（Windows）
nslookup example.com

# 预期结果应该显示 76.76.21.21

# 在线 DNS 检查工具：
# https://dnschecker.org
```

```text
# DNS 生效时间：
# - 国内服务商：通常 10 分钟内
# - 国际服务商：可能需要 24-48 小时
# - Cloudflare：通常几分钟内
```

### 步骤 5：配置 SSL 证书

<!-- Vercel 自动配置免费 SSL -->

```text
# Vercel 自动 SSL 配置：
# - 域名验证成功后自动生成证书
# - 使用 Let's Encrypt 免费证书
# - 自动续期，无需手动操作
# - 支持 HTTPS 强制跳转

# 在 Settings -> Domains 中可以看到：
# ✅ Valid Configuration
# 🔒 SSL Certificate: Active
```

---

## 自动部署配置

<!-- 本节介绍如何实现本地提交后自动部署 -->

### Git 自动部署原理

<!-- 理解 Vercel 自动部署的工作原理 -->

```text
# Vercel 自动部署流程：
# 1. 开发者 push 代码到 GitHub
# 2. GitHub 发送 Webhook 通知 Vercel
# 3. Vercel 接收通知，拉取最新代码
# 4. 执行构建命令
# 5. 部署到全球 CDN
# 6. 更新部署状态

# 触发条件：
# - Push 到任意分支
# - 创建 Pull Request
# - 合并 Pull Request

# ⚠️ 注意：
# 如果 push 后没有触发自动部署，请检查当前项目的 git config user.email
# 是否与 GitHub 账户邮箱一致，必须完全一致才能触发自动部署！
# 检查命令：git config user.email
# 设置命令：git config user.email "your-github-email@example.com"
```

### 分支部署策略

<!-- 不同分支的部署环境配置 -->

```text
# 默认分支策略：
# - main/master 分支 -> Production（生产环境）
# - 其他分支 -> Preview（预览环境）
# - Pull Request -> Preview（预览环境）

# 每个 PR 会自动生成预览链接：
# https://your-project-git-feature-branch-username.vercel.app
```

### 配置生产分支

<!-- 修改生产环境的源分支 -->

```text
# 修改生产分支：
# 1. 进入项目 Settings
# 2. 选择 "Git" 菜单
# 3. 找到 "Production Branch"
# 4. 修改为你的主分支名称

# 常见主分支名称：
# - main（GitHub 新默认）
# - master（旧默认）
# - production
# - release
```

### 忽略特定分支

<!-- 配置不需要自动部署的分支 -->

```text
# 忽略构建配置：
# 在项目 Settings -> Git 中：

# Ignored Build Step：
# 可以添加命令来决定是否构建
# 返回 0 = 继续构建
# 返回 1 = 跳过构建

# 示例：忽略文档更新
# 如果只修改了 .md 文件，跳过构建
```

```bash
# 忽略构建的脚本示例
# 保存为 scripts/ignore-build.sh

#!/bin/bash
# 获取本次提交修改的文件
# 如果只有 .md 文件被修改，则跳过构建

# 获取修改的文件列表
CHANGED_FILES=$(git diff --name-only HEAD~1)

# 检查是否只有 .md 文件
if echo "$CHANGED_FILES" | grep -qvE '\.md$'; then
  # 有非 .md 文件被修改，继续构建
  echo "Changes detected, proceeding with build..."
  exit 1
else
  # 只有 .md 文件，跳过构建
  echo "Only markdown files changed, skipping build..."
  exit 0
fi
```

### 本地开发与部署流程

<!-- 完整的本地开发到自动部署流程 -->

```bash
# 1. 克隆项目到本地
git clone https://github.com/username/your-project.git

# 2. 进入项目目录
cd your-project

# 3. 安装依赖
npm install

# 4. 本地开发
npm run dev

# 5. 开发完成后，添加修改到暂存区
# git add . 添加所有修改的文件
git add .

# 6. 提交修改
# -m 参数后面是提交信息
git commit -m "feat: 添加新功能"

# 7. 推送到远程仓库
# origin 是远程仓库名称
# main 是分支名称
# 推送后 Vercel 会自动触发部署
git push origin main

# 8. 查看部署状态
# 可以在 Vercel Dashboard 中查看
# 或者在 GitHub PR 页面查看
```

### 使用 GitHub Actions 增强部署

<!-- 结合 GitHub Actions 实现更复杂的部署流程 -->

```yaml
# .github/workflows/vercel-deploy.yml
# 这个文件定义了 GitHub Actions 工作流

# 工作流名称
name: Vercel Deploy

# 触发条件：push 到 main 分支时触发
on:
  push:
    branches:
      - main  # 监听 main 分支的推送

# 环境变量
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}  # Vercel 组织 ID
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}  # 项目 ID

# 工作任务定义
jobs:
  deploy:
    # 运行环境：最新版 Ubuntu
    runs-on: ubuntu-latest
    
    # 任务步骤
    steps:
      # 步骤1：检出代码
      - name: Checkout Code
        uses: actions/checkout@v4  # 使用官方 checkout action
      
      # 步骤2：安装 Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'  # 指定 Node.js 版本
          cache: 'npm'  # 缓存 npm 依赖
      
      # 步骤3：安装 Vercel CLI
      - name: Install Vercel CLI
        run: npm install -g vercel  # 全局安装 vercel
      
      # 步骤4：拉取 Vercel 配置
      - name: Pull Vercel Config
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      
      # 步骤5：构建项目
      - name: Build Project
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      
      # 步骤6：部署到生产环境
      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

```text
# 配置 GitHub Secrets：
# 1. 进入 GitHub 仓库 Settings
# 2. 选择 Secrets and variables -> Actions
# 3. 点击 "New repository secret"
# 4. 添加以下 secrets：

# VERCEL_TOKEN：
# - 在 Vercel 账户设置中生成
# - Settings -> Tokens -> Create

# VERCEL_ORG_ID：
# - 在 .vercel/project.json 中获取
# - 或在 Vercel 团队设置中查看

# VERCEL_PROJECT_ID：
# - 在 .vercel/project.json 中获取
# - 或在项目设置中查看
```

---

## vercel.json 配置详解

<!-- vercel.json 是 Vercel 的配置文件 -->
<!-- 放在项目根目录下 -->

### 基础配置文件

<!-- 创建 vercel.json 文件 -->

```json
{
  // 项目名称
  // 用于生成默认域名
  "name": "my-project",
  
  // 构建配置
  "buildCommand": "npm run build",
  
  // 输出目录
  // Vue/Vite 项目通常是 dist
  "outputDirectory": "dist",
  
  // 安装命令
  "installCommand": "npm install",
  
  // 开发命令（用于 vercel dev）
  "devCommand": "npm run dev",
  
  // 框架预设
  // 可选值：nextjs, vue, create-react-app, vite 等
  "framework": "vite"
}
```

### 路由重写配置

<!-- 配置 URL 重写规则，常用于 SPA 应用 -->

```json
{
  // 路由重写规则
  // 用于处理 SPA 的路由
  "rewrites": [
    {
      // source: 匹配的 URL 路径
      // 使用正则表达式
      "source": "/(.*)",
      
      // destination: 重写目标
      // 所有请求都重写到 index.html
      "destination": "/index.html"
    }
  ]
}
```

### 重定向配置

<!-- 配置 URL 重定向 -->

```json
{
  // 重定向规则
  "redirects": [
    {
      // 旧路径
      "source": "/old-page",
      
      // 新路径
      "destination": "/new-page",
      
      // 状态码：301 永久重定向，302 临时重定向
      "statusCode": 301
    },
    {
      // 带参数的重定向
      "source": "/blog/:slug",
      "destination": "/posts/:slug",
      "statusCode": 301
    }
  ]
}
```

### 响应头配置

<!-- 配置 HTTP 响应头 -->

```json
{
  // 响应头配置
  "headers": [
    {
      // 匹配所有路径
      "source": "/(.*)",
      "headers": [
        {
          // 安全相关头部
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          // 内容类型嗅探保护
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    },
    {
      // 静态资源缓存配置
      "source": "/assets/(.*)",
      "headers": [
        {
          // 缓存一年
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 环境变量配置

<!-- 在 vercel.json 中配置环境变量 -->

```json
{
  // 环境变量配置
  // 注意：敏感信息应该在 Dashboard 中配置
  "env": {
    // 所有环境共享的变量
    "API_VERSION": "v1"
  },
  
  // 构建时环境变量
  "build": {
    "env": {
      // 仅在构建时可用
      "BUILD_ENV": "production"
    }
  }
}
```

### 区域配置

<!-- 配置部署区域 -->

```json
{
  // 部署区域配置
  // 选择离用户最近的区域
  "regions": [
    "hkg1",  // 香港
    "sin1",  // 新加坡
    "sfo1"   // 旧金山
  ]
}
```

### 完整配置示例

<!-- 一个完整的 vercel.json 配置示例 -->

```json
{
  // ========== 基础配置 ==========
  // 项目名称
  "name": "my-vue-project",
  
  // 框架类型
  "framework": "vite",
  
  // 构建命令
  "buildCommand": "npm run build",
  
  // 输出目录
  "outputDirectory": "dist",
  
  // ========== 路由配置 ==========
  // SPA 路由重写
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  
  // ========== 重定向配置 ==========
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "statusCode": 301
    }
  ],
  
  // ========== 响应头配置 ==========
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  
  // ========== 清理 URL ==========
  // 移除 .html 后缀
  "cleanUrls": true,
  
  // ========== 尾部斜杠 ==========
  // false: 移除尾部斜杠
  // true: 添加尾部斜杠
  "trailingSlash": false,
  
  // ========== Git 配置 ==========
  "git": {
    // 部署分支提交消息格式
    "deploymentEnabled": true
  }
}
```

---

## 常见问题与解决方案

<!-- 收集常见问题及解决方法 -->

### 问题 1：构建失败

<!-- 构建失败的常见原因和解决方法 -->

```text
# 问题：Build failed
# 常见原因：

# 1. Node.js 版本不匹配
# 解决：在 package.json 中指定版本
{
  "engines": {
    "node": ">=18.0.0"
  }
}

# 2. 依赖安装失败
# 解决：删除 lock 文件重新生成
rm package-lock.json
npm install

# 3. 环境变量缺失
# 解决：在 Vercel Dashboard 中添加环境变量
# Settings -> Environment Variables

# 4. 内存不足
# 解决：在构建命令中增加内存
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### 问题 2：路由 404

<!-- SPA 路由问题 -->

```text
# 问题：刷新页面显示 404
# 原因：SPA 需要将所有路由指向 index.html

# 解决方法 1：添加 vercel.json 配置
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}

# 解决方法 2：使用 _redirects 文件（放在 public 目录）
/* /index.html 200
```

### 问题 3：域名 SSL 证书错误

<!-- SSL 证书相关问题 -->

```text
# 问题：SSL 证书无法生成
# 常见原因：

# 1. DNS 记录未生效
# 解决：等待 DNS 传播，通常需要几分钟到几小时

# 2. DNS 配置错误
# 解决：检查 A 记录或 CNAME 记录是否正确

# 3. 使用了 Cloudflare 代理
# 解决：关闭 Cloudflare 代理（橙色云朵变灰色）

# 4. 域名被锁定
# 解决：在域名服务商处解锁域名
```

### 问题 4：部署速度慢

<!-- 优化部署速度 -->

```text
# 问题：部署时间过长
# 优化方法：

# 1. 使用缓存
# Vercel 默认缓存 node_modules，确保 lock 文件存在

# 2. 减少依赖
# 移除未使用的依赖
npm prune

# 3. 使用 pnpm
# pnpm 比 npm 更快
# 在 vercel.json 中配置：
{
  "installCommand": "pnpm install"
}

# 4. 优化构建
# 使用增量构建，只构建变更部分
```

### 问题 5：环境变量不生效

<!-- 环境变量问题 -->

```text
# 问题：环境变量未生效
# 检查步骤：

# 1. 确认变量名前缀
# Vite 项目需要 VITE_ 前缀
VITE_API_URL=https://api.example.com

# Next.js 公开变量需要 NEXT_PUBLIC_ 前缀
NEXT_PUBLIC_API_URL=https://api.example.com

# 2. 确认变量添加到正确环境
# Production / Preview / Development

# 3. 重新部署
# 修改环境变量后需要重新部署才能生效
```

---

## 实用命令速查表

<!-- 常用 Vercel CLI 命令 -->

```bash
# ========== 账户相关 ==========

# 登录 Vercel
vercel login

# 登出
vercel logout

# 查看当前登录用户
vercel whoami

# ========== 部署相关 ==========

# 部署到预览环境
vercel

# 部署到生产环境
vercel --prod

# 强制重新部署（跳过缓存）
vercel --force

# 部署指定目录
vercel ./dist

# ========== 项目相关 ==========

# 连接到已有项目
vercel link

# 取消连接
vercel unlink

# 拉取环境变量
vercel env pull

# 添加环境变量
vercel env add

# 列出环境变量
vercel env ls

# ========== 域名相关 ==========

# 列出所有域名
vercel domains ls

# 添加域名
vercel domains add example.com

# 移除域名
vercel domains rm example.com

# ========== 查看相关 ==========

# 列出所有部署
vercel ls

# 查看部署日志
vercel logs <deployment-url>

# 查看项目信息
vercel inspect <deployment-url>

# ========== 开发相关 ==========

# 本地开发（模拟 Vercel 环境）
vercel dev

# 本地构建
vercel build
```

---

## 总结

<!-- 文档总结 -->

```text
# Vercel 部署完整流程总结：

# 1. 准备工作
#    - 注册 Vercel 账号
#    - 关联 GitHub 账号
#    - 准备好项目代码

# 2. 首次部署
#    - 导入 GitHub 仓库
#    - 配置构建设置
#    - 点击部署

# 3. 配置域名
#    - 添加自定义域名
#    - 配置 DNS 记录
#    - 等待 SSL 生效

# 4. 自动部署
#    - Push 代码自动触发
#    - PR 自动生成预览
#    - 合并自动部署生产

# 5. 持续优化
#    - 配置 vercel.json
#    - 优化构建速度
#    - 监控部署状态
```
