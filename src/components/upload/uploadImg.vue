<script lang="ts" setup>
import { fileUpload } from '@/api/upload'
import { isImageUrl, isVideoUrl } from '@/utils/is'
import { Plus } from '@element-plus/icons-vue'
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
    accept: '.jpg,.jpeg,.png,.webp,.gif,swf,.avi,.flv,.mpg,.rm,.mov,.wav,.asf,.3gp,.mkv,.rmvb,.mp4,.mp3,.wav,.doc,.docx,.xlsx,.xls,.ppt,.pdf',
    msg: '上传图片',
    limit: 10,
  },
)

function convertUrl(url: string) {
  const URL: string = import.meta.env.VITE_SERVICE_BASE_URL
  return URL + url
}

const innerValue = defineModel<ModelValueItem[]>({ required: true })

const fileList = ref([])

const handleChange: UploadProps['onChange'] = (uploadFile) => {
  if (uploadFile.response) {
    // @ts-ignore
    innerValue.value.push(uploadFile.response)
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
    ElMessage.warning(`已超过上限，重新上传请删除之前的图片`)
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
function handleFile(url: string) {
  window.open(convertUrl(url))
}
</script>

<template>
  <div class="flex">
    <div>
      <el-upload
        v-model:file-list="fileList"
        class="upload-file"
        action="#"
        :http-request="customRequest"
        :on-change="handleChange"
        :before-upload="handleBefore"
        list-type="picture-card"
        multiple
        :accept="accept"
      >
        <el-icon><Plus /></el-icon>
        <span class="absolute bottom-0 text-10px">{{ msg }}</span>
      </el-upload>
      <div class="text-[#42b3ff]">
        提示：最多上传10张图片
      </div>
    </div>

    <ElScrollbar class="scrollbarStyle">
      <div class="imgOut">
        <div v-for="{ url, id, fileId } in innerValue" :key="id || fileId" class="imgInner">
          <i v-if="isImageUrl(url) || isVideoUrl(url)" @click="handleDelete(url)" />
          <template v-if="isImageUrl(url)">
            <el-image style="width: 140px; height: 140px" fit="cover" :src="convertUrl(url)" :preview-src-list="[convertUrl(url)]" />
          </template>
          <template v-else-if="isVideoUrl(url)">
            <video :src="convertUrl(url)" width="140" class="h-140px" playsinline="true" controls />
          </template>
        </div>
      </div>
    </ElScrollbar>
  </div>
  <div>
    <div v-for="{ url, id, fileId } in innerValue" :key="id || fileId">
      <template v-if="!isImageUrl(url) && !isVideoUrl(url)">
        <div class="text-[#4b9aff] flex items-center flex-wrap">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <g id="组_3032" data-name="组 3032" transform="translate(-357 -984)">
              <path
                id="附件"
                d="M18.883,63.256a4.821,4.821,0,0,1,1.1,1.654,5.093,5.093,0,0,1,0,3.759,4.821,4.821,0,0,1-1.1,1.654l-7.867,7.806A6.161,6.161,0,0,1,9.2,79.36a6.506,6.506,0,0,1-2.28.575,6.422,6.422,0,0,1-2.455-.329,5.868,5.868,0,0,1-2.321-1.479,5.847,5.847,0,0,1-1.458-2.27,6.251,6.251,0,0,1-.329-2.434,6.569,6.569,0,0,1,.565-2.28,6.044,6.044,0,0,1,1.222-1.808l6.984-6.922a.536.536,0,0,1,.544-.092,1.165,1.165,0,0,1,.544.277,1.391,1.391,0,0,1,.267.544.521.521,0,0,1-.082.544l-6.963,6.9a4.935,4.935,0,0,0-.924,1.294,4.185,4.185,0,0,0-.431,1.582,4.131,4.131,0,0,0,.246,1.7,4.541,4.541,0,0,0,1.109,1.664,4.127,4.127,0,0,0,1.592,1.017,4.505,4.505,0,0,0,1.736.246,4.963,4.963,0,0,0,1.643-.38,4.13,4.13,0,0,0,1.335-.883l7.847-7.785a3.437,3.437,0,0,0,.791-1.15,3.039,3.039,0,0,0,.226-1.181,2.712,2.712,0,0,0-.277-1.14,3.755,3.755,0,0,0-.739-1.027,2.586,2.586,0,0,0-1.982-.811A3.425,3.425,0,0,0,13.4,64.9L6.312,71.945a1.415,1.415,0,0,0-.462,1.048,1.315,1.315,0,0,0,.38.945,1.175,1.175,0,0,0,1.037.37,1.627,1.627,0,0,0,.955-.452l6.429-6.388a.536.536,0,0,1,.544-.092,1.165,1.165,0,0,1,.544.277,1.238,1.238,0,0,1,.288.544.521.521,0,0,1-.082.544L9.5,75.129a4.649,4.649,0,0,1-1.417,1.027,2.881,2.881,0,0,1-1.274.257A2.5,2.5,0,0,1,5.7,76.094a4.684,4.684,0,0,1-.945-.7,3.291,3.291,0,0,1-.626-.842,2.73,2.73,0,0,1-.318-1.13,3.19,3.19,0,0,1,.216-1.315,3.937,3.937,0,0,1,1-1.417q.37-.37.657-.678.246-.267.462-.472l.236-.226,5.731-5.71a5.906,5.906,0,0,1,1.612-1.161,4.818,4.818,0,0,1,1.777-.483,4.389,4.389,0,0,1,1.777.246A4.305,4.305,0,0,1,18.883,63.256Z"
                transform="translate(356.659 923.048)"
                fill="#4b9aff"
              />
              <rect id="矩形_1592" data-name="矩形 1592" width="20" height="20" transform="translate(357 984)" fill="none" />
            </g>
          </svg>

          <span @click="handleFile(url)">{{ getFileName(url) }}</span>
          <i class="file" @click="handleDelete(url)" />
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.upload-file {
  :deep(.el-upload) {
    width: 140px;
    height: 140px;
    position: relative;
    margin-right: 10px;
  }
  :deep(.el-upload-list__item) {
    display: none;
  }
}
.scrollbarStyle {
  width: 443px;
}

.imgOut {
  display: flex;
  .imgInner {
    margin-right: 10px;
    position: relative;
    .imgTitle {
      text-align: center;
      margin-top: 10px;
    }
    & > i {
      background-image: url("@/assets/images/clearFile.png");
      background-repeat: no-repeat;
      background-size: cover;
      cursor: pointer;
      display: inline-block;
      width: 0;
      height: 0;
      position: absolute;
      top: 2px;
      right: 2px;
      transition: all 0.2s;
      z-index: 1;
    }
  }

  &:hover .imgInner > i {
    width: 15px;
    height: 15px;
    transform: scale(1.2);
    transition: all 0.2s;
  }
}
.imgListBox {
  width: 100%;
  display: flex;
  .uploaderImgBox {
    margin-right: 10px;
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
