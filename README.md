# 长沙市芙蓉区地图编辑器

基于 Vue 3 + Leaflet 的芙蓉区公司及人才地图管理工具。

## 功能特性

- 🗺️ **地图展示**：显示芙蓉区行政区划边界
- 📍 **公司管理**：点击地图添加公司标记，支持 CRUD 操作
- 👥 **人才管理**：为公司添加、编辑、删除人才信息
- 📊 **统计分析**：实时展示公司数量、人才数量、行业分布
- 💾 **数据持久化**：后端服务存储，支持多端同步
- 📥📤 **导入导出**：支持 JSON 格式数据导入导出

## 技术栈

- **前端**：Vue 3 + Vite + Leaflet + @vue-leaflet/vue-leaflet
- **后端**：Node.js + Express
- **地图**：高德地图瓦片

## 项目结构

```
├── public/
│   └── data/
│       └── furong-district.json    # 芙蓉区 GeoJSON 地图数据
├── server/
│   ├── server.js                   # 后端服务
│   └── data.json                   # 数据存储文件
├── src/
│   ├── components/
│   │   ├── MapEditor.vue           # 地图编辑器组件
│   │   ├── CompanyDialog.vue        # 公司编辑弹窗
│   │   ├── StatisticsPanel.vue      # 统计分析面板
│   │   └── HelpPanel.vue           # 帮助面板
│   ├── composables/
│   │   └── useCompanyData.js       # 数据管理逻辑
│   ├── App.vue
│   └── main.js
├── package.json
└── vite.config.js
```

## 快速开始

### 安装依赖

```bash
# 安装前端依赖
npm install

# 安装后端依赖
cd server && npm install
```

### 运行项目

```bash
# 启动后端服务 (端口 3002)
cd server && npm start

# 启动前端开发服务器 (端口 3000)
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 使用说明

1. **添加公司**：点击地图任意位置添加公司标记
2. **编辑公司**：点击标记或从右侧列表选择，打开编辑弹窗
3. **管理人才**：在公司编辑弹窗中添加/编辑/删除人才
4. **查看统计**：右侧面板显示公司数、人才数、行业分布
5. **数据导出**：点击右上角"导出数据"按钮下载 JSON 文件
6. **数据导入**：点击右上角"导入数据"按钮上传 JSON 文件

## 访问地址

- 前端：http://x.x.x.x:3000
- 后端 API：http://x.x.x.x:3002

## 数据格式

```json
{
  "companies": [
    {
      "id": "uuid",
      "name": "公司名称",
      "lat": 28.xxx,
      "lng": 112.xxx,
      "address": "地址",
      "industry": "行业",
      "phone": "电话",
      "talents": [
        {
          "id": "uuid",
          "name": "姓名",
          "position": "职位",
          "phone": "电话"
        }
      ]
    }
  ]
}
```
