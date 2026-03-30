<template>
  <div id="app">
    <h1>长沙市芙蓉区地图编辑器</h1>
    <MapEditor 
      :geo-json-data="geoJsonData" 
      @map-click="handleMapClick"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MapEditor from './components/MapEditor.vue'
import geoJson from '../public/data/furong-district.json'

const geoJsonData = ref(null)

const handleMapClick = (coords) => {
  console.log('Map clicked:', coords)
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
</style>
