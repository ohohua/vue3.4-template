import type { Task } from './task'
import http from '@/utils/http'

/**
 * 采集任务列表
 * @param data
 * @returns list
 */
const getTaskList = async (data: ListDto) => http.get<Task.TaskListVo>('/sysUser/getList', data)

export { getTaskList }
