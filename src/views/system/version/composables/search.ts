import type { Dict } from '@/api/system/dict/dict'
import type { Recordable } from '@/types/form'
import { getDictItemByCode } from '@/api'

function emptyForm() {
  return {
    softName: undefined,
    versionCode: '',
  }
}
// 表单

function search(fn: (data: Recordable) => void) {
  const searchForm = ref(emptyForm())
  // select选项
  const searchOptions = reactive<Record<string, Dict.DictItem[]>>({ softName: [] })
  const handleSearch = (type: 'query' | 'reset') => {
    if (type === 'reset') {
      searchForm.value = emptyForm()
    }
    fn(searchForm.value)
  }
  onMounted(async () => {
    const res = await getDictItemByCode('softName')
    searchOptions.softName = res.data
  })
  return { searchForm, searchOptions, handleSearch }
}

export default search
