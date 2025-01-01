import http from '@/utils/http'
// import type { Upload } from "./upload";

/**
 * 文件上传
 * @param formData
 * @returns any
 */
const fileUpload = async (formData: FormData) => http.upload<any>('/fileManager/upload', formData)

export { fileUpload }
