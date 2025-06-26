import { fileURLToPath, URL } from 'node:url'
/**
 * @file 自动根据 swagger 文档生成 TypeScript API 文件。
 * @author lirui
 * @description 使用 swagger-typescript-api 工具，将 swagger 接口文档生成 api.ts 文件，便于前端调用。
 */
import { generateApi } from 'swagger-typescript-api'

async function generate() {
  try {
    const params = {
      fileName: 'api.ts',
      output: fileURLToPath(new URL('./src/api', import.meta.url)),
      url: 'http://localhost:8888/api-json',
      httpClientType: 'axios', // 生成的接口类型
      templates: fileURLToPath(new URL('./src/templates', import.meta.url)), // 指定自定义模板目录
      modular: true,
    }
    await generateApi(params)
  }
  catch (error) {
    console.error('Error generating API:', error)
  }
}

generate()
