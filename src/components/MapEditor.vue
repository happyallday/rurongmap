<template>
  <div class="map-container">
    <l-map
      ref="map"
      v-model:zoom="zoom"
      :center="center"
      :use-global-leaflet="false"
      @click="handleMapClick"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-geo-json
        v-if="geoJsonData"
        :geojson="geoJsonData"
        :options="geoJsonOptions"
      ></l-geo-json>
    </l-map>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { LMap, LTileLayer, LGeoJson } from '@vue-leaflet/vue-leaflet'

const props = defineProps({
  geoJsonData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['mapClick'])

const zoom = ref(13)
const center = ref([28.193106, 112.988094])

const geoJsonOptions = ref({
  style: {
    color: '#3388ff',
    weight: 2,
    fillColor: '#3388ff',
    fillOpacity: 0.1
  }
})

const handleMapClick = (event) => {
  const { lat, lng } = event.latlng
  emit('mapClick', { lat, lng })
}

onMounted(() => {
  if (props.geoJsonData && props.geoJsonData.features && props.geoJsonData.features[0]) {
    const centerPoint = props.geoJsonData.features[0].properties.center
    if (centerPoint) {
      center.value = [centerPoint[1], centerPoint[0]]
    }
  }
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: calc(100vh - 60px);
}
</style>
