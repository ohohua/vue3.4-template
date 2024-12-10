import http from "@/utils/http";
import type { Template } from "./template";

/**
 * 采集任务模板列表
 * @param data
 * @returns
 */
const getTemplateList = async (data: ListDto) => http.get<Template.TaskListVo>("/sysUser/getList", data);

export { getTemplateList };
