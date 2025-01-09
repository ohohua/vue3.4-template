<script setup lang="ts">
import { userDelete as delListApi, getUserList as getListApi } from '@/api'
import Button from '@/components/button/button.vue'
import useDialog from '@/hooks/useDialog'
import useTable from '@/hooks/useTable'
import operate from './composables/operate'
import search from './composables/search'
import { tableProps as props } from './composables/table'

const passwordForm = defineAsyncComponent(() => import('./components/passwordForm.vue'))
const userDetail = defineAsyncComponent(() => import('./components/userDetail.vue'))

const [handleDetail] = useDialog(userDetail, { dialogProps: { title: '用户详情' } })
const [handleUpdatePassword] = useDialog(passwordForm, { dialogProps: { title: '修改密码' } })
const { register, tableObject, methods } = useTable({ getListApi, delListApi, props })

const { searchForm, searchOptions, handleSearch } = search(methods.setSearchParams)
const { handleAdd, handleEdit, handleImport } = operate(() => methods.getList())

async function handleDelete(row: any, multiple: boolean) {
  const selected = await methods.getSelections()
  const message = multiple ? `确认删除${selected.length}条用户信息吗？` : '确认要将此用户信息删除吗？'
  methods.delList(row ? [row.id] : selected.map(it => it.id), multiple, message)
}
</script>

<template>
  <div class="flex flex-col h-full">
    <Search local-name="user_management" @callback="handleSearch">
      <template #main>
        <LabelInput v-model="searchForm.username" label="用户账号" />
        <LabelInput v-model="searchForm.realname" label="用户姓名" />
        <LabelSelect v-model="searchForm.job" label="职务" :option="searchOptions.job" />
      </template>
      <template #secondary>
        <LabelSelect v-model="searchForm.major" label="专业" :option="searchOptions.major" />
        <LabelInput v-model="searchForm.orgId" label="所属单位" />
        <LabelSelect v-model="searchForm.status" label="用户状态" :option="searchOptions.status" />
      </template>
    </Search>

    <Container>
      <ElSpace class="mb-[20px]">
        <Button v-auth:user-list-add icon="Plus" @click="handleAdd">
          新增
        </Button>
        <Button v-auth:user-list-import icon="Download" @click="handleImport">
          导入
        </Button>
        <Button v-auth:user-list-export type="danger" icon="Close" @click="handleDelete(null, true)">
          批量删除
        </Button>
      </ElSpace>

      <Table
        v-model:current-page="tableObject.currentPage" v-model:page-size="tableObject.pageSize"
        @register="register"
      >
        <template #operation="{ row }">
          <ElButton v-auth:user-list-view link type="success" size="small" @click="handleDetail(row)">
            查看
          </ElButton>
          <ElButton v-auth:user-list-edit link type="primary" size="small" @click="handleEdit(row)">
            编辑
          </ElButton>
          <ElButton
            v-auth:user-list-update-password link type="primary" size="small"
            @click="handleUpdatePassword(row)"
          >
            修改密码
          </ElButton>
          <ElButton v-auth:user-list-delete link type="danger" size="small" @click="handleDelete(row, false)">
            删除
          </ElButton>
        </template>
      </Table>
    </Container>
  </div>
</template>
