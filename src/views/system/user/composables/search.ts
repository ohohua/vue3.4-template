import type { Dict } from '@/api/system/dict/dict'
import type { Recordable } from '@/types/form'
import { getDictItemByCode } from '@/api'
import { statusOptions } from '@/utils/option'

function emptyForm() {
  return {
    username: undefined,
    realname: undefined,
    status: undefined,
    major: undefined,
    orgId: undefined,
    job: undefined,
  }
}
// 表单

function search(fn: (data: Recordable) => void) {
  const searchForm = ref(emptyForm())
  // select选项
  const searchOptions = reactive<Record<string, Dict.DictItem[]>>({
    status: statusOptions,
    job: [],
    major: [],
  })

  const handleSearch = (type: 'query' | 'reset') => {
    if (type === 'reset') {
      searchForm.value = emptyForm()
    }
    fn(searchForm.value)
  }
  const getDictOption = () => {
    getDictItemByCode('major').then(({ data }) => (searchOptions.major = data))
    getDictItemByCode('job').then(({ data }) => (searchOptions.job = data))
  }

  onMounted(() => {
    getDictOption()
  })
  return { searchForm, searchOptions, handleSearch }
}

export default search
