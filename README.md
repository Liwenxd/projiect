# AI模型使用调查系统

这是一个用于收集用户使用AI大模型情况的调查系统。

功能特点：
- 微信扫码填写问卷
- 支持多选AI模型
- 实时统计展示
- 防止重复提交
- 数据可视化展示

使用技术：
- Flask (Python Web框架)
- SQLite (数据库)
- ECharts (数据可视化)
- Bootstrap (前端样式) 





# AI模型使用调查系统

一个用于收集AI大模型使用情况的调查问卷系统。

## 功能特点

- 支持国内外主流AI大模型选择
- 实时数据可视化大屏
- 移动端友好的问卷界面
- 优雅的提交反馈

## 部署步骤

1. 注册 Render.com 账号
   - 访问 https://render.com
   - 点击 "Sign Up" 注册新账号
   - 可以使用 GitHub 账号直接登录

2. 创建新项目
   - 访问：https://render.com
   
     点击 "Sign Up"

     可以使用邮箱注册
   
3. 创建新的 Web Service
   - 登录 Render 后点击 "New +"
   - 选择 "Web Service"
   - 必须授权github.com仓库，并创建一个存储库 Repositories 
   - 选择 "Build and deploy from a Git repository"
   - 点击 "Configure account"
   5. 在新页面中：
      - Name: ai-survey
      - Language: Python 3
      - Branch: main
      -  Region: 选择 Singapore（亚洲地区速度较快）
      - Build Command: pip install -r requirements.txt
      - Start Command: gunicorn app:app
      - Instance Type：Free$0
   6. 点击 "Deploy Web Service"
   
4. 
   - 等待部署完成
   - 访问分配的域名即可使用

## 本地开发

1. 克隆仓库