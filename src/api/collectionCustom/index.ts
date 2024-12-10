import http from "@/utils/http";
import type { CollectionCustom } from "./collectionCustom.d.ts";

/**
 * 采集任务列表
 * @param data
 * @returns
 */
const getCollectionCustomList = async (data: ListDto) => http.get<CollectionCustom.ListVo>("/sysUser/getList", data);

export { getCollectionCustomList };
