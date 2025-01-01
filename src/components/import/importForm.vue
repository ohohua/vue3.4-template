<script setup lang="ts">
import { fileUpload } from '@/api/upload'
// import download from "@/utils/download";

const emits = defineEmits(['close'])

const uploadFile = ref()
const fileName = ref()
function changeUpload(file: any) {
  const index = file.name.lastIndexOf('.')
  const ext = file.name.substr(Number(index) + 1).toLowerCase()
  if (!['xls', 'xlsx'].includes(ext)) {
    ElMessage.warning('请上传.xls .xlsx格式文件')
    return
  }
  fileName.value = file.name
  uploadFile.value = file
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

// const handleDownload = () => {
// download(new Blob())
// };

function handleConfirm() {}
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="upload-box">
      <!-- <div class="font-bold text-center">把文件拖入指定区域，完成上传，同样支持点击上传。</div> -->
      <el-upload drag accept=".xls,.xlsx" class="wrist-uploader" action="#" :http-request="customRequest" :on-change="changeUpload" :auto-upload="false" :show-file-list="false">
        <span v-if="uploadFile" class="">{{ fileName }}</span>
        <el-icon v-else class="avatar-uploader-icon">
          <img src="@/assets/images/uploaderFile.png">
        </el-icon>
        <div class="el-upload__text">
          点击或将文件拖拽到这里上传
        </div>
        <div class="el-upload__tip">
          支持扩展名：.xls、.xlsx
        </div>
      </el-upload>
      <ul>
        <li class="flex items-center">
          请上传一个excel文件，文件格式符合模板格式：<el-button type="primary" link>
            下载模板
          </el-button>
        </li>
        <li>支持单次最大导入5000条数据</li>
        <li>导入数据设备编号相同，更新其他字段数据</li>
      </ul>
    </div>

    <Footer class="w-full ml-auto" cancel confirm @cancel="emits('close')" @confirm="handleConfirm" />
  </div>
</template>

<style lang="scss" scoped>
.uploadContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-box {
  width: calc(100% - 60px);
  padding: 10px 0;

  ::v-deep(.wrist-uploader) {
    width: 100%;
    height: 300px;
    border: none;

    .el-upload-dragger {
      padding: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      margin: auto auto;
      align-items: center;
      justify-content: center;
      border: 1px dashed #999;

      .el-upload__text {
        margin-top: 25px;
        color: #333333;
        font-weight: bold;
      }
    }

    .el-upload-dragger:hover {
      border: 1px dashed #409eff;
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100%;
      height: 68px;
      text-align: center;

      img {
        width: 80px;
        height: 100%;
      }
    }

    .el-upload--text {
      width: 100%;
      height: 100%;

      .text {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        i {
          font-size: 20px;
          margin-bottom: 15px;
        }

        span {
          line-height: 1;
        }
      }
    }

    .el-upload__tip {
      margin-top: 10px;
      color: #999999;
    }
  }
  ul {
    color: #333333;
  }
  ul > li::before {
    content: "·";
    display: inline-block;
    margin-right: 5px;
    font-size: 16px;
  }
}
</style>
