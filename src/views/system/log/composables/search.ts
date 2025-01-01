import type { Recordable } from '@/types/form'

function emptyForm() {
  return {
    operateObject: undefined,
    operateAccount: undefined,
    operateType: undefined,
    logType: undefined,
    status: undefined,
    createTimeBegin: undefined,
    createTimeEnd: undefined,
    createTime: [],
  }
}
// 表单

function search(fn: (data: Recordable) => void) {
  const searchForm = ref(emptyForm())
  // select选项
  const searchOptions = reactive({
    status: [
      { dictLabel: '失败', dictValue: 1, id: 1 },
      { dictLabel: '成功', dictValue: 0, id: 0 },
    ],
    operateType: [
      { dictLabel: '查询', dictValue: 1, id: 1 },
      { dictLabel: '登录', dictValue: 2, id: 2 },
      { dictLabel: '删除', dictValue: 3, id: 3 },
      { dictLabel: '批量删除', dictValue: 4, id: 4 },
      { dictLabel: '新增', dictValue: 5, id: 5 },
      { dictLabel: '查看', dictValue: 6, id: 6 },
      { dictLabel: '导入', dictValue: 7, id: 7 },
      { dictLabel: '导出', dictValue: 8, id: 8 },
      { dictLabel: '下载', dictValue: 9, id: 9 },
      { dictLabel: '编辑', dictValue: 10, id: 10 },
      { dictLabel: '下载模板', dictValue: 11, id: 11 },
      { dictLabel: '二维码生成', dictValue: 12, id: 12 },
      { dictLabel: 'excel或pdf导出', dictValue: 13, id: 13 },
      { dictLabel: 'xml文件解析', dictValue: 14, id: 14 },
      { dictLabel: '指令分发', dictValue: 100, id: 100 },
      { dictLabel: '指令再分发', dictValue: 101, id: 101 },
      { dictLabel: '指令复查', dictValue: 102, id: 102 },
      { dictLabel: '指令下发', dictValue: 103, id: 103 },
    ],
    logType: [
      { dictLabel: '操作日志', dictValue: 1, id: 1 },
      { dictLabel: '登录日志', dictValue: 2, id: 2 },
    ],
  })
  const handleSearch = (type: 'query' | 'reset') => {
    if (searchForm.value.createTime.length >= 2) {
      searchForm.value.createTimeBegin = searchForm.value.createTime[0]
      searchForm.value.createTimeEnd = searchForm.value.createTime[1]
    }
    if (type === 'reset') {
      searchForm.value = emptyForm()
    }
    fn(searchForm.value)
  }
  return { searchForm, searchOptions, handleSearch }
}

export default search
