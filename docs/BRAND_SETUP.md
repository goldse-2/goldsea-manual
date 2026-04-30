# 品牌模块图片配置说明

## 概述

已为您的文档网站添加了完整的品牌模块展示功能。品牌模块包括：

1. **主页品牌展示** - 在首页展示3个产品线
2. **产品页面** - 详细的品牌和产品分类
3. **手册页面** - 产品分类和搜索指南

## 📂 所需图片文件

请在 `docs/assets/images/` 目录下添加以下图片文件：

### 必需图片

```
docs/assets/images/
├── brand-premium.png      # Premium Series 品牌标志（推荐 200x200px）
├── brand-standard.png     # Standard Series 品牌标志（推荐 200x200px）
└── brand-value.png        # Value Series 品牌标志（推荐 200x200px）
```

### 图片建议规格

- **格式**: PNG、JPG 或 WebP
- **尺寸**: 200x200px 至 400x400px
- **大小**: 每个文件建议不超过 100KB
- **背景**: 支持透明背景 (PNG)

## 🎨 品牌模块位置

### 1. 主页品牌展示
**文件**: `docs/index.md`
**位置**: Hero 部分下方
**展示方式**: 3列表格，包含图片和链接

### 2. 产品页面品牌模块
**文件**: `docs/Products/index.md`
**位置**: 页面顶部
**展示方式**: 
- Markdown 网格卡片（带链接和描述）
- 每个品牌线包含功能列表

### 3. 手册页面
**文件**: `docs/manuals/index.md`
**位置**: 页面内容
**展示方式**: 分类卡片网格

## 🔧 自定义品牌模块

### 修改图片路径
在 Markdown 中，通过以下方式引用图片：

```markdown
![Premium Brand](../assets/images/brand-premium.png){ width="200" }
```

### 添加更多品牌线
在 `docs/Products/index.md` 中添加新的品牌部分：

```markdown
-   <div class="goldse-card" markdown>
    ![Custom Brand](../assets/images/brand-custom.png){ width="200" }
    
    ### Custom Series
    Your product description here.
    
    [Learn More →](link)
    </div>
```

### 自定义样式
所有品牌模块的样式定义在：
```
docs/stylesheets/custom.css
```

关键类名：
- `.brands-showcase` - 主页品牌展示
- `.brands-grid` - 产品页品牌网格
- `.goldse-card` - 品牌卡片

## 📱 响应式设计

品牌模块已优化为响应式设计：
- **桌面端**: 3列布局
- **平板端**: 2列布局  
- **手机端**: 1列布局

## 🚀 构建和预览

构建网站以查看品牌模块效果：

```bash
# 进入项目目录
cd c:\Users\Administrator\goldsea-manual\goldsea-manual

# 安装依赖（如需）
pip install -r requirements.txt

# 构建站点
mkdocs build

# 本地预览
mkdocs serve
```

访问 `http://localhost:8000` 查看结果。

## 📝 文件清单

已创建/更新的文件：

- ✅ `docs/index.md` - 添加品牌展示模块
- ✅ `docs/Products/index.md` - 新建产品页面
- ✅ `docs/manuals/index.md` - 新建手册页面
- ✅ `docs/stylesheets/custom.css` - 新增品牌样式

## 💡 最佳实践

1. **图片优化**: 在上传前用图片编辑工具压缩图片
2. **命名规范**: 使用小写字母和连字符命名图片
3. **替代文本**: 始终为图片提供有意义的 `alt` 文本
4. **一致性**: 保持所有品牌图片的风格和尺寸一致
5. **更新**: 定期更新产品表格中的版本号和日期

## 🆘 故障排除

### 图片不显示
- 检查文件名是否与 Markdown 中的引用完全匹配（区分大小写）
- 确保图片文件在正确的目录: `docs/assets/images/`
- 验证图片格式是否被支持

### 样式未应用
- 清除浏览器缓存
- 重新构建网站: `mkdocs build`
- 检查 CSS 文件是否被正确加载

---

**更新时间**: 2026-04-30
**配置版本**: 1.0
