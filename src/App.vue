<template>
  <div id="app">
    <h1>长沙市芙蓉区地图编辑器</h1>
    <div class="toolbar">
      <span>公司: {{ companyCount }} | 人才: {{ talentCount }}</span>
    </div>
    <MapEditor 
      :geo-json-data="geoJsonData" 
      :companies="companies"
      @map-click="handleMapClick"
      @select-company="handleSelectCompany"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MapEditor from './components/MapEditor.vue'
import { useCompanyData } from './composables/useCompanyData'
import geoJson from '../public/data/furong-district.json'

const { companies, addCompany, companyCount, talentCount } = useCompanyData()

const geoJsonData = ref(null)

const handleMapClick = (coords) => {
  addCompany(coords)
}

const handleSelectCompany = (company) => {
  console.log('Selected company:', company)
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
}
</style>
