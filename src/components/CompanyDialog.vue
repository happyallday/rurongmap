<template>
  <div v-if="visible" class="dialog-overlay" @click="handleClose">
    <div class="dialog-content" @click.stop>
      <div class="dialog-header">
        <h3>{{ isEdit ? '编辑公司' : '新增公司' }}</h3>
        <button class="close-btn" @click="handleClose">&times;</button>
      </div>
      <div class="dialog-body">
        <div class="form-group">
          <label>公司名称</label>
          <input v-model="formData.name" type="text" placeholder="请输入公司名称" />
        </div>
        <div class="form-group">
          <label>地址</label>
          <input v-model="formData.address" type="text" placeholder="请输入地址" />
        </div>
        <div class="form-group">
          <label>行业</label>
          <select v-model="formData.industry">
            <option value="">请选择行业</option>
            <option value="科技">科技</option>
            <option value="金融">金融</option>
            <option value="教育">教育</option>
            <option value="医疗">医疗</option>
            <option value="制造">制造</option>
            <option value="服务">服务</option>
            <option value="其他">其他</option>
          </select>
        </div>
        <div class="form-group">
          <label>联系电话</label>
          <input v-model="formData.phone" type="text" placeholder="请输入联系电话" />
        </div>

        <div class="talent-section" v-if="isEdit">
          <div class="talent-header">
            <label>人才列表</label>
            <button class="add-talent-btn" @click="showAddTalent">+ 添加人才</button>
          </div>
          
          <div v-if="showTalentForm" class="talent-form">
            <div class="form-row">
              <input v-model="talentForm.name" type="text" placeholder="姓名" />
              <input v-model="talentForm.position" type="text" placeholder="职位" />
              <input v-model="talentForm.phone" type="text" placeholder="电话" />
            </div>
            <div class="form-row-buttons">
              <button class="cancel-btn" @click="showTalentForm = false">取消</button>
              <button class="save-btn" @click="handleAddTalent">保存</button>
            </div>
          </div>

          <div class="talent-list">
            <div v-for="talent in talents" :key="talent.id" class="talent-item">
              <div class="talent-info">
                <span class="talent-name">{{ talent.name }}</span>
                <span class="talent-position">{{ talent.position }}</span>
                <span class="talent-phone">{{ talent.phone }}</span>
              </div>
              <div class="talent-actions">
                <button @click="editTalent(talent)">编辑</button>
                <button class="delete" @click="deleteTalent(talent.id)">删除</button>
              </div>
            </div>
            <div v-if="talents.length === 0" class="no-talent">
              暂无人才信息
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-footer">
        <button v-if="isEdit" class="delete-btn" @click="handleDelete">删除公司</button>
        <div class="footer-right">
          <button class="cancel-btn" @click="handleClose">取消</button>
          <button class="save-btn" @click="handleSave">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  company: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save', 'delete', 'addTalent', 'updateTalent', 'deleteTalent'])

const formData = ref({
  name: '',
  address: '',
  industry: '',
  phone: ''
})

const talents = ref([])
const showTalentForm = ref(false)
const editingTalent = ref(null)
const talentForm = ref({
  name: '',
  position: '',
  phone: ''
})

const isEdit = computed(() => !!props.company?.id)

watch(() => props.company, (newVal) => {
  if (newVal) {
    formData.value = {
      name: newVal.name || '',
      address: newVal.address || '',
      industry: newVal.industry || '',
      phone: newVal.phone || ''
    }
    talents.value = newVal.talents || []
  } else {
    formData.value = {
      name: '',
      address: '',
      industry: '',
      phone: ''
    }
    talents.value = []
  }
  showTalentForm.value = false
  editingTalent.value = null
  talentForm.value = { name: '', position: '', phone: '' }
}, { immediate: true })

const handleClose = () => {
  emit('close')
}

const handleSave = () => {
  emit('save', { ...props.company, ...formData.value, talents: talents.value })
}

const handleDelete = () => {
  if (confirm('确定要删除这家公司吗？')) {
    emit('delete', props.company.id)
  }
}

const showAddTalent = () => {
  editingTalent.value = null
  talentForm.value = { name: '', position: '', phone: '' }
  showTalentForm.value = true
}

const editTalent = (talent) => {
  editingTalent.value = talent
  talentForm.value = { ...talent }
  showTalentForm.value = true
}

const handleAddTalent = () => {
  if (!talentForm.value.name) {
    alert('请输入姓名')
    return
  }
  
  if (editingTalent.value) {
    const index = talents.value.findIndex(t => t.id === editingTalent.value.id)
    if (index !== -1) {
      talents.value[index] = { ...talentForm.value, id: editingTalent.value.id }
    }
    emit('updateTalent', props.company.id, editingTalent.value.id, talentForm.value)
  } else {
    const newTalent = { ...talentForm.value, id: uuidv4() }
    talents.value.push(newTalent)
    emit('addTalent', props.company.id, newTalent)
  }
  
  showTalentForm.value = false
  editingTalent.value = null
  talentForm.value = { name: '', position: '', phone: '' }
}

const deleteTalent = (talentId) => {
  if (confirm('确定要删除这个人才吗？')) {
    const index = talents.value.findIndex(t => t.id === talentId)
    if (index !== -1) {
      talents.value.splice(index, 1)
    }
    emit('deleteTalent', props.company.id, talentId)
  }
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-content {
  background: #fff;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

.dialog-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.dialog-body {
  padding: 20px;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3388ff;
}

.talent-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.talent-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.talent-header label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.add-talent-btn {
  padding: 6px 12px;
  background: #52c41a;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.talent-form {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 12px;
}

.form-row {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.form-row input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
}

.form-row-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.talent-list {
  max-height: 200px;
  overflow-y: auto;
}

.talent-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 8px;
}

.talent-info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.talent-name {
  font-weight: 500;
  color: #333;
}

.talent-position {
  color: #666;
  font-size: 13px;
}

.talent-phone {
  color: #999;
  font-size: 12px;
}

.talent-actions {
  display: flex;
  gap: 8px;
}

.talent-actions button {
  padding: 4px 8px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.talent-actions button.delete {
  color: #ff4d4f;
  border-color: #ff4d4f;
}

.no-talent {
  text-align: center;
  color: #999;
  padding: 20px;
  font-size: 14px;
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  border-top: 1px solid #eee;
}

.footer-right {
  display: flex;
  gap: 12px;
}

.delete-btn {
  padding: 10px 20px;
  background: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.cancel-btn {
  padding: 10px 20px;
  background: #fff;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.save-btn {
  padding: 10px 20px;
  background: #3388ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.save-btn:hover {
  background: #1677cc;
}
</style>
