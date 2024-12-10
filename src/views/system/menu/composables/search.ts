import type { Recordable } from "@/types/form";

const emptyForm = () => ({
  menuType: undefined,
  menuName: undefined,
});
// 表单

function search(fn: (data: Recordable) => void) {
  const searchForm = ref(emptyForm());
  // select选项
  const searchOptions = reactive({
    menuType: [
      { dictLabel: "目录", dictValue: 0, id: 0 },
      { dictLabel: "页面", dictValue: 1, id: 1 },
      { dictLabel: "按钮", dictValue: 2, id: 2 },
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
