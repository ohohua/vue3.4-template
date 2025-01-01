<script lang="ts" setup>
import { fileUpload } from '@/api/upload'
import { ElMessage, type UploadProps } from 'element-plus'

interface ModelValueItem {
  id?: string
  fileId?: string
  url: string
}
const props = withDefaults(
  defineProps<{
    accept?: string
    msg?: string
    limit?: number
  }>(),
  {
    accept: '.apk,.exe',
    msg: '上传附件',
    limit: 1,
  },
)
const innerValue = defineModel<ModelValueItem[]>({ required: true })
const fileList = ref([])

const handleChange: UploadProps['onChange'] = (data) => {
  if (data.response) {
    innerValue.value.push(data.response as ModelValueItem)
  }
}
function handleDelete(url: string) {
  const index = innerValue.value.findIndex(it => it.url === url)
  if (index >= 0) {
    innerValue.value.splice(index, 1)
  }
}

function handleBefore() {
  if (innerValue.value.length >= props.limit) {
    ElMessage.warning(`已超过上限，重新上传请删除之前的文件`)
    return false
  }
  return true
}
async function customRequest(file: any) {
  try {
    const formData = new FormData()
    formData.append('file', file.file)
    const res = await fileUpload(formData)
    return res.data
  }
  catch (error) {
    return Promise.reject(error)
  }
}
// 获取文件名
function getFileName(url: string) {
  const arr = url.split('/')
  return arr[arr.length - 1]
}
</script>

<template>
  <div class="flex">
    <el-upload v-model:file-list="fileList" class="upload-file" action="#" :http-request="customRequest" :on-change="handleChange" :before-upload="handleBefore" :accept="accept">
      <el-button type="primary">
        上传附件
      </el-button>
      <template #tip>
        <div class="el-upload__tip">
          支持扩展名：{{ accept }}
        </div>
        <div v-for="item in innerValue" :key="item.id" class="text-[#2dabff] hover:bg-[#f5f7fa] px-2 flex items-center">
          <span>{{ getFileName(item.url) }}</span>
          <i class="file" @click="handleDelete(item.url)" />
        </div>
      </template>
    </el-upload>
  </div>
</template>

<style lang="scss" scoped>
.upload-file {
  width: 100%;
  text-align: left;
  :deep(.el-upload-list__item) {
    display: none;
  }
}

.file {
  margin-left: 10px;
  background-image: url("@/assets/images/clearFile.png");
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  display: inline-block;
  width: 15px;
  height: 15px;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.2);
    transition: all 0.2s;
  }
}
</style>
