<template>
  <div class="statistics-panel" :class="{ collapsed: isCollapsed }">
    <div class="panel-header" @click="togglePanel">
      <h3>统计分析</h3>
      <span class="toggle-icon">{{ isCollapsed ? '▲' : '▼' }}</span>
    </div>
    <div class="panel-body" v-show="!isCollapsed">
      <div class="stat-cards">
        <div class="stat-card">
          <div class="stat-value">{{ companyCount }}</div>
          <div class="stat-label">公司总数</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ talentCount }}</div>
          <div class="stat-label">人才总数</div>
        </div>
      </div>
      
      <div class="industry-stats">
        <h4>行业分布</h4>
        <div v-if="Object.keys(industryStats).length > 0" class="industry-list">
          <div 
            v-for="(count, industry) in industryStats" 
            :key="industry" 
            class="industry-item"
          >
            <span class="industry-name">{{ industry }}</span>
            <div class="industry-bar">
              <div 
                class="industry-bar-fill" 
                :style="{ width: getBarWidth(count) + '%' }"
              ></div>
            </div>
            <span class="industry-count">{{ count }}</span>
          </div>
        </div>
        <div v-else class="no-data">暂无数据</div>
      </div>

      <div class="company-list">
        <h4>公司列表</h4>
        <div v-if="companies.length > 0" class="list">
          <div 
            v-for="company in companies" 
            :key="company.id" 
            class="company-item"
            @click="$emit('selectCompany', company)"
          >
            <div class="company-name">{{ company.name }}</div>
            <div class="company-info">
              <span>{{ company.industry || '未分类' }}</span>
              <span>人才: {{ company.talents?.length || 0 }}</span>
            </div>
          </div>
        </div>
        <div v-else class="no-data">暂无公司</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  companyCount: {
    type: Number,
    default: 0
  },
  talentCount: {
    type: Number,
    default: 0
  },
  industryStats: {
    type: Object,
    default: () => ({})
  },
  companies: {
    type: Array,
    default: () => []
  }
})

defineEmits(['selectCompany'])

const isCollapsed = ref(false)
const maxCount = computed(() => {
  const counts = Object.values(props.industryStats)
  return counts.length > 0 ? Math.max(...counts) : 1
})

const getBarWidth = (count) => {
  return (count / maxCount.value) * 100
}

const togglePanel = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.statistics-panel {
  position: fixed;
  right: 20px;
  top: 80px;
  width: 280px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: calc(100vh - 120px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
}

.statistics-panel.collapsed {
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
  padding: 16px;
  overflow-y: auto;
}

.stat-cards {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.stat-card {
  flex: 1;
  text-align: center;
  padding: 16px;
  background: #f0f5ff;
  border-radius: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #3388ff;
}

.stat-label {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.industry-stats {
  margin-bottom: 20px;
}

.industry-stats h4,
.company-list h4 {
  font-size: 14px;
  color: #333;
  margin: 0 0 12px 0;
}

.industry-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.industry-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.industry-name {
  width: 50px;
  font-size: 12px;
  color: #666;
  flex-shrink: 0;
}

.industry-bar {
  flex: 1;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.industry-bar-fill {
  height: 100%;
  background: #3388ff;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.industry-count {
  width: 24px;
  font-size: 12px;
  color: #333;
  text-align: right;
}

.company-list {
  border-top: 1px solid #eee;
  padding-top: 16px;
}

.list {
  max-height: 300px;
  overflow-y: auto;
}

.company-item {
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.company-item:hover {
  background: #f5f5f5;
}

.company-name {
  font-size: 14px;
  color: #333;
  font-weight: 500;
  margin-bottom: 4px;
}

.company-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}

.no-data {
  text-align: center;
  color: #999;
  font-size: 14px;
  padding: 20px;
}
</style>
