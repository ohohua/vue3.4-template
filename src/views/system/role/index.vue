<script setup lang="ts">
import { deleteRole as delListApi, getRoleList as getListApi } from '@/api'
import Button from '@/components/button/Button.vue'
import useDialog from '@/hooks/useDialog'
import useTable from '@/hooks/useTable'
import operate from './composables/operate'
import search from './composables/search'
import { tableProps } from './composables/table'

const roleDetail = defineAsyncComponent(() => import('./components/RoleDetail.vue'))
const roleUserTable = defineAsyncComponent(() => import('./components/RoleUserTable.vue'))
const roleAuthorized = defineAsyncComponent(() => import('./components/RoleAuthorized.vue'))

const [handleDetail] = useDialog(roleDetail, { dialogProps: { title: '详情' } })
const [handleImpower] = useDialog(roleAuthorized, { dialogProps: { title: '授权角色' } })
const [handleUser] = useDialog(roleUserTable, { dialogProps: { title: '角色用户' } })
const { register, tableObject, methods } = useTable({ getListApi, delListApi, props: tableProps })

const { searchForm, searchOptions, handleSearch } = search(methods.setSearchParams)
const { handleAdd, handleEdit } = operate(() => methods.getList())

async function handleDelete(row: any, multiple: boolean) {
  const selected = await methods.getSelections()
  const message = multiple ? `确认删除${selected.length}条角色信息吗？` : '确认要将此角色信息删除吗？'
  methods.delList(row ? [row.id] : selected.map(it => it.id), multiple, message)
}
</script>

<template>
  <div class="flex flex-col h-full">
    <Search local-name="role_management" @callback="handleSearch">
      <template #main>
        <LabelInput v-model="searchForm.roleCode" label="角色名称" />
        <LabelInput v-model="searchForm.roleName" label="角色编码" />
        <LabelSelect v-model="searchForm.status" label="角色状态" :option="searchOptions.status" />
      </template>
    </Search>
    <Container>
      <ElSpace class="mb-[20px]">
        <Button v-auth="'user-list/btn-add'" icon="Plus" @click="handleAdd">
          新增
        </Button>
      </ElSpace>

      <Table v-model:current-page="tableObject.currentPage" v-model:page-size="tableObject.pageSize" @register="register">
        <template #operation="{ row }">
          <ElButton v-auth="'user-list/btn-view'" link type="success" size="small" @click="handleDetail(row)">
            查看
          </ElButton>
          <ElButton v-auth="'user-list/btn-edit'" link type="primary" size="small" @click="handleEdit(row)">
            编辑
          </ElButton>
          <ElButton v-auth="'user-list/btn-edit'" link type="primary" size="small" @click="handleUser(row)">
            用户
          </ElButton>
          <ElButton v-auth="'user-list/btn-update-password'" link type="primary" size="small" @click="handleImpower(row)">
            授权
          </ElButton>
          <ElButton v-auth="'user-list/btn-delete'" link type="danger" size="small" @click="handleDelete(row, false)">
            删除
          </ElButton>
        </template>
      </Table>
    </Container>
  </div>
</template>
