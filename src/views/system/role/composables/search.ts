import type { Dict } from "@/api/system/dict/dict";
import type { Recordable } from "@/types/form";
import { statusOptions } from "@/utils/option";

const emptyForm = () => ({
  status: undefined,
  roleName: undefined,
  roleCode: undefined,
});
// 表单

function search(fn: (data: Recordable) => void) {
  const searchForm = ref(emptyForm());
  // select选项
  const searchOptions = reactive<Record<string, Dict.DictItem[]>>({ status: statusOptions });

  const handleSearch = (type: "query" | "reset") => {
    fn(type === "query" ? searchForm.value : {});
  };

  return { searchForm, searchOptions, handleSearch };
}

export default search;
