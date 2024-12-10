import type { Recordable } from "@/types/form";

const emptyForm = () => ({
  dictTypeName: undefined,
  dictTypeCode: undefined,
  status: undefined,
});
// 表单

function search(fn: (data: Recordable) => void) {
  const searchForm = ref(emptyForm());
  // select选项
  const searchOptions = reactive({
    status: [
      { dictLabel: "启用", id: 1 },
      { dictLabel: "停用", id: 0 },
    ],
  });
  const handleSearch = (type: "query" | "reset") => {
    if (type === "reset") {
      searchForm.value = emptyForm();
    }
    fn(searchForm.value);
  };
  return { searchForm, searchOptions, handleSearch };
}

export default search;
