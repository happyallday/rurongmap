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
        url="https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
        :subdomains="[1, 2, 3, 4]"
        layer-type="base"
        name="高德地图"
      ></l-tile-layer>
      <l-geo-json
        v-if="geoJsonData"
        :geojson="geoJsonData"
        :options="geoJsonOptions"
      ></l-geo-json>
      <l-marker
        v-for="company in companies"
        :key="company.id"
        :lat-lng="[company.lat, company.lng]"
        @click="handleMarkerClick(company)"
      >
        <l-popup>
          <div class="company-popup">
            <h4>{{ company.name }}</h4>
            <p v-if="company.address">{{ company.address }}</p>
            <p v-if="company.industry">{{ company.industry }}</p>
            <p>人才数: {{ company.talents?.length || 0 }}</p>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { LMap, LTileLayer, LGeoJson, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'

const props = defineProps({
  geoJsonData: {
    type: Object,
    default: null
  },
  companies: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['mapClick', 'selectCompany'])

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

const handleMarkerClick = (company) => {
  emit('selectCompany', company)
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

.company-popup h4 {
  margin: 0 0 8px 0;
  color: #333;
}

.company-popup p {
  margin: 4px 0;
  font-size: 14px;
  color: #666;
}
</style>
