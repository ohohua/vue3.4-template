<script setup lang="ts">
import type { TableProps } from '@/components/table/src/types'
import { getRoleUserList as getListApi, removeRoleUser } from '@/api'
import useDialog from '@/hooks/useDialog'
import useTable from '@/hooks/useTable'

const props = defineProps<{ id: string, dictTypeCode: string }>()
const userSelectTable = defineAsyncComponent(() => import('./userSelectTable.vue'))
const columns = [
  { label: '排序', field: 'sort' },
  { label: '用户账号', field: 'username' },
  { label: '用户姓名', field: 'realName' },
  { label: '状态', field: 'statusStr' },
  { label: '操作', field: 'operation', fixed: 'right' },
]
const tableProps = reactive<TableProps>({ columns, selection: false, pagination: {} })
const { register, tableObject, methods } = useTable({ getListApi, props: tableProps }, { type: 1 })

const searchForm = ref({ username: '', realName: '' })
function handleSearch(type: 'query' | 'reset') {
  methods.setSearchParams(type === 'query' ? searchForm.value : {})
}
const [openDialog] = useDialog(userSelectTable, {
  dialogProps: { title: '用户选择列表' },
  contentProps: {
    roleId: props.id,
    beforeClose: () => methods.getList(),
  },
})

async function handleCancel(row: any) {
  const res = await removeRoleUser({ userIds: [row.id], roleId: props.id })
  ElMessage.success(res.message)
  methods.getList()
}
</script>

<template>
  <Container>
    <div class="flex items-center">
      <LabelInput v-model="searchForm.username" label="用户账号" />
      <LabelInput v-model="searchForm.realName" label="用户姓名" />
      <Button icon="search" @click="handleSearch('query')">
        查询
      </Button>
    </div>

    <el-space class="mb-[20px]">
      <Button @click="openDialog()">
        关联用户
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
          @click="handleCancel(row)"
        >
          取消关联
        </ElButton>
      </template>
    </Table>
  </Container>
</template>
