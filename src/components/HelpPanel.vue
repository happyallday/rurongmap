<template>
  <div class="help-panel" :class="{ collapsed: isCollapsed }">
    <div class="panel-header" @click="togglePanel">
      <h3>使用帮助</h3>
      <span class="toggle-icon">{{ isCollapsed ? '◀' : '▶' }}</span>
    </div>
    <div class="panel-body" v-show="!isCollapsed">
      <ul>
        <li><strong>添加公司</strong>：点击地图任意位置添加公司标记</li>
        <li><strong>编辑公司</strong>：点击标记或从列表选择</li>
        <li><strong>管理人才</strong>：在公司编辑弹窗中添加人才</li>
        <li><strong>导出数据</strong>：点击右上角导出按钮</li>
        <li><strong>导入数据</strong>：点击右上角导入按钮</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isCollapsed = ref(true)

const togglePanel = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.help-panel {
  position: fixed;
  left: 20px;
  top: 80px;
  width: 220px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
}

.help-panel.collapsed {
  width: auto;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f5f5f5;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  border-radius: 8px 8px 0 0;
}

.panel-header h3 {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.toggle-icon {
  font-size: 12px;
  color: #999;
}

.panel-body {
  padding: 12px 16px;
  font-size: 13px;
  color: #666;
}

.panel-body ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.panel-body li {
  margin-bottom: 8px;
  line-height: 1.5;
}

.panel-body li:last-child {
  margin-bottom: 0;
}

.panel-body strong {
  color: #333;
}
</style>
