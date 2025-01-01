<script setup lang="ts">
import type { Dict } from '@/api/system/dict/dict'
import type { TableProps } from '@/components/table/src/types'
import { deleteDictItem, getDictItemList } from '@/api'
import useDialog from '@/hooks/useDialog'
import useTable from '@/hooks/useTable'
import { Plus, Search } from '@element-plus/icons-vue'

const props = defineProps<{ id: string, dictTypeCode: string }>()

const dictConfigForm = defineAsyncComponent(() => import('./dictConfigForm.vue'))

const columns = [
  { label: '排序', field: 'sort' },
  { label: '名称', field: 'dictLabel' },
  { label: '数据值', field: 'dictValue' },
  {
    label: '状态',
    field: 'status',
    formatter: ({ status }: { status: number | undefined }) =>
      status === 1
        ? h('span', { class: 'text-[#06bb9a]' }, '启用')
        : h('span', { class: 'text-[#FFB402]' }, '停用'),
  },
  { label: '操作', field: 'operation', fixed: 'right' },
]
const pagination = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 10,
})
const tableProps: TableProps = reactive({
  columns,
  selection: false,
  pagination,
})
const { register, tableObject, methods } = useTable(
  { getListApi: getDictItemList, delListApi: deleteDictItem, props: tableProps },
  { dictTypeCode: props.dictTypeCode },
)
const searchForm = ref({
  dictLabel: undefined,
  status: undefined,
})
const searchOptions = ref([
  { dictLabel: '启用', id: 1 },
  { dictLabel: '停用', id: 0 },
])
function handleSearch(type: 'query' | 'reset') {
  methods.setSearchParams(type === 'query' ? searchForm.value : {})
}
const [openDialog] = useDialog(dictConfigForm, {
  dialogProps: { title: '新增字典值' },
  contentProps: { sysDictTypeId: props.id, beforeClose: () => methods.getList() },
})

const [openEditDialog] = useDialog(dictConfigForm, {
  dialogProps: { title: '编辑字典值' },
  contentProps: { sysDictTypeId: props.id },
})

function handleAdd(row: Dict.EditDictItemParams) {
  const fn = row.id ? openEditDialog : openDialog
  fn(row)
}
async function handleDelete(row: any, multiple: boolean) {
  const selected = await methods.getSelections()
  const msg = multiple
    ? `确认删除${selected.length}条字典配置信息吗？`
    : '确认要将此字典配置信息删除吗？'
  methods.delList(row ? [row.id] : selected.map(it => it.id), multiple, msg)
}
</script>

<template>
  <Container>
    <div class="flex items-center">
      <LabelInput v-model="searchForm.dictLabel" label="名称" />
      <LabelSelect v-model="searchForm.status" label="状态" :option="searchOptions" />
      <Button :icon="Search" @click="handleSearch('query')">
        查询
      </Button>
    </div>
    <el-space class="mb-[20px]">
      <Button :icon="Plus" @click="handleAdd">
        新增
      </Button>
    </el-space>
    <Table
      v-model:current-page="tableObject.currentPage"
      v-model:page-size="tableObject.pageSize"
      :selection="false"
      :height="300"
      @register="register"
    >
      <template #operation="{ row }">
        <ElButton
          v-has="'user-list/btn-edit'"
          link
          type="primary"
          size="small"
          @click="handleAdd(row)"
        >
          编辑
        </ElButton>
        <ElButton
          v-has="'user-list/btn-delete'"
          link
          type="primary"
          size="small"
          style="color: #ff934b"
          @click="handleDelete(row, false)"
        >
          删除
        </ElButton>
      </template>
    </Table>
  </Container>
</template>
