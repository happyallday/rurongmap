import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const companies = ref([])
const selectedCompany = ref(null)

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
    return newCompany
  }

  const updateCompany = (id, data) => {
    const index = companies.value.findIndex(c => c.id === id)
    if (index !== -1) {
      companies.value[index] = { ...companies.value[index], ...data }
    }
  }

  const deleteCompany = (id) => {
    const index = companies.value.findIndex(c => c.id === id)
    if (index !== -1) {
      companies.value.splice(index, 1)
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
    }
  }

  const updateTalent = (companyId, talentId, data) => {
    const company = companies.value.find(c => c.id === companyId)
    if (company) {
      const talentIndex = company.talents.findIndex(t => t.id === talentId)
      if (talentIndex !== -1) {
        company.talents[talentIndex] = { ...company.talents[talentIndex], ...data }
      }
    }
  }

  const deleteTalent = (companyId, talentId) => {
    const company = companies.value.find(c => c.id === companyId)
    if (company) {
      const index = company.talents.findIndex(t => t.id === talentId)
      if (index !== -1) {
        company.talents.splice(index, 1)
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
  }

  const exportData = () => {
    return {
      companies: companies.value
    }
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
    exportData
  }
}
