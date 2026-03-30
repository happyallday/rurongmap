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
      </div>
      <div class="dialog-footer">
        <button v-if="isEdit" class="delete-btn" @click="handleDelete">删除</button>
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

const emit = defineEmits(['close', 'save', 'delete'])

const formData = ref({
  name: '',
  address: '',
  industry: '',
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
  } else {
    formData.value = {
      name: '',
      address: '',
      industry: '',
      phone: ''
    }
  }
}, { immediate: true })

const handleClose = () => {
  emit('close')
}

const handleSave = () => {
  emit('save', { ...props.company, ...formData.value })
}

const handleDelete = () => {
  if (confirm('确定要删除这家公司吗？')) {
    emit('delete', props.company.id)
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
  max-width: 500px;
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
