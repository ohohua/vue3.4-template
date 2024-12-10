import http from "@/utils/http";
import type { Task } from "./task";

/**
 * 采集任务列表
 * @param data
 * @returns
 */
const getTaskList = async (data: ListDto) => http.get<Task.TaskListVo>("/sysUser/getList", data);

export { getTaskList };
