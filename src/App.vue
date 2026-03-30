<template>
  <div id="app">
    <h1>长沙市芙蓉区地图编辑器</h1>
    <div class="toolbar">
      <span>公司: {{ companyCount }} | 人才: {{ talentCount }}</span>
      <div class="toolbar-actions">
        <button class="import-btn" @click="triggerImport">导入数据</button>
        <button class="export-btn" @click="handleExport">导出数据</button>
        <input 
          type="file" 
          ref="fileInput" 
          accept=".json" 
          style="display: none" 
          @change="handleImport"
        />
      </div>
    </div>
    <MapEditor 
      :geo-json-data="geoJsonData" 
      :companies="companies"
      @map-click="handleMapClick"
      @select-company="handleSelectCompany"
    />
    <HelpPanel />
    <StatisticsPanel
      :company-count="companyCount"
      :talent-count="talentCount"
      :industry-stats="industryStats"
      :companies="companies"
      @select-company="handleSelectCompany"
    />
    <CompanyDialog
      :visible="showDialog"
      :company="currentCompany"
      @close="showDialog = false"
      @save="handleSaveCompany"
      @delete="handleDeleteCompany"
      @add-talent="handleAddTalent"
      @update-talent="handleUpdateTalent"
      @delete-talent="handleDeleteTalent"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MapEditor from './components/MapEditor.vue'
import HelpPanel from './components/HelpPanel.vue'
import StatisticsPanel from './components/StatisticsPanel.vue'
import CompanyDialog from './components/CompanyDialog.vue'
import { useCompanyData } from './composables/useCompanyData'
import geoJson from '../public/data/furong-district.json'

const { companies, addCompany, updateCompany, deleteCompany, addTalent, updateTalent, deleteTalent, companyCount, talentCount, industryStats, exportData, importData } = useCompanyData()

const geoJsonData = ref(null)
const showDialog = ref(false)
const currentCompany = ref(null)
const fileInput = ref(null)

const handleMapClick = (coords) => {
  const newCompany = addCompany(coords)
  currentCompany.value = newCompany
  showDialog.value = true
}

const handleSelectCompany = (company) => {
  currentCompany.value = company
  showDialog.value = true
}

const handleSaveCompany = (data) => {
  updateCompany(data.id, data)
  showDialog.value = false
}

const handleDeleteCompany = (id) => {
  deleteCompany(id)
  showDialog.value = false
}

const handleAddTalent = (companyId, talent) => {
  addTalent(companyId, talent)
}

const handleUpdateTalent = (companyId, talentId, data) => {
  updateTalent(companyId, talentId, data)
}

const handleDeleteTalent = (companyId, talentId) => {
  deleteTalent(companyId, talentId)
}

const handleExport = () => {
  const data = exportData()
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'furong-data.json'
  a.click()
  URL.revokeObjectURL(url)
}

const triggerImport = () => {
  fileInput.value.click()
}

const handleImport = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    const success = importData(e.target.result)
    if (success) {
      alert('数据导入成功！')
    } else {
      alert('数据导入失败，请检查文件格式！')
    }
  }
  reader.readAsText(file)
  event.target.value = ''
}

onMounted(() => {
  geoJsonData.value = geoJson
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100vw;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h1 {
  padding: 16px;
  text-align: center;
  background: #fff;
  border-bottom: 1px solid #eee;
}

.toolbar {
  padding: 8px 16px;
  background: #f5f5f5;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toolbar-actions {
  display: flex;
  gap: 8px;
}

.import-btn {
  padding: 6px 16px;
  background: #faad14;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.export-btn {
  padding: 6px 16px;
  background: #52c41a;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}
</style>
