import type { Template } from './template'
import http from '@/utils/http'

/**
 * 采集任务模板列表
 * @param data
 * @returns
 */
const getTemplateList = async (data: ListDto) => http.get<Template.TaskListVo>('/sysUser/getList', data)

export { getTemplateList }
