import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const API_URL = 'http://159.75.226.48:3002'

const companies = ref([])
const selectedCompany = ref(null)

const loadFromServer = async () => {
  try {
    const res = await fetch(`${API_URL}/api/data`)
    const data = await res.json()
    companies.value = data.companies || []
  } catch (e) {
    console.error('Failed to load data:', e)
    companies.value = []
  }
}

const saveToServer = async () => {
  try {
    await fetch(`${API_URL}/api/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companies: companies.value })
    })
  } catch (e) {
    console.error('Failed to save data:', e)
  }
}

loadFromServer()

export function useCompanyData() {
  const addCompany = (coords) => {
    const newCompany = {
      id: uuidv4(),
      name: '新公司',
      lat: coords.lat,
      lng: coords.lng,
      address: '',
      industry: '',
      phone: '',
      talents: []
    }
    companies.value.push(newCompany)
    saveToServer()
    return newCompany
  }

  const updateCompany = (id, data) => {
    const index = companies.value.findIndex(c => c.id === id)
    if (index !== -1) {
      companies.value[index] = { ...companies.value[index], ...data }
      saveToServer()
    }
  }

  const deleteCompany = (id) => {
    const index = companies.value.findIndex(c => c.id === id)
    if (index !== -1) {
      companies.value.splice(index, 1)
      saveToServer()
    }
  }

  const addTalent = (companyId, talent) => {
    const company = companies.value.find(c => c.id === companyId)
    if (company) {
      company.talents.push({
        id: uuidv4(),
        name: talent.name || '',
        position: talent.position || '',
        phone: talent.phone || ''
      })
      saveToServer()
    }
  }

  const updateTalent = (companyId, talentId, data) => {
    const company = companies.value.find(c => c.id === companyId)
    if (company) {
      const talentIndex = company.talents.findIndex(t => t.id === talentId)
      if (talentIndex !== -1) {
        company.talents[talentIndex] = { ...company.talents[talentIndex], ...data }
        saveToServer()
      }
    }
  }

  const deleteTalent = (companyId, talentId) => {
    const company = companies.value.find(c => c.id === companyId)
    if (company) {
      const index = company.talents.findIndex(t => t.id === talentId)
      if (index !== -1) {
        company.talents.splice(index, 1)
        saveToServer()
      }
    }
  }

  const companyCount = computed(() => companies.value.length)

  const talentCount = computed(() => {
    return companies.value.reduce((total, company) => {
      return total + (company.talents ? company.talents.length : 0)
    }, 0)
  })

  const industryStats = computed(() => {
    const stats = {}
    companies.value.forEach(company => {
      const industry = company.industry || '未分类'
      if (!stats[industry]) {
        stats[industry] = 0
      }
      stats[industry]++
    })
    return stats
  })

  const loadData = (data) => {
    companies.value = data.companies || []
    saveToServer()
  }

  const exportData = () => {
    return {
      companies: companies.value
    }
  }

  const importData = async (jsonData) => {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData
      if (data.companies && Array.isArray(data.companies)) {
        companies.value = data.companies
        await saveToServer()
        return true
      }
      return false
    } catch (e) {
      console.error('Failed to import data:', e)
      return false
    }
  }

  const clearData = () => {
    companies.value = []
    saveToServer()
  }

  const refreshData = () => {
    loadFromServer()
  }

  return {
    companies,
    selectedCompany,
    addCompany,
    updateCompany,
    deleteCompany,
    addTalent,
    updateTalent,
    deleteTalent,
    companyCount,
    talentCount,
    industryStats,
    loadData,
    exportData,
    importData,
    clearData,
    refreshData
  }
}
