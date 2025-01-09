<script setup lang="ts">
import { deleteMenu as delListApi, getMenuList as getListApi } from '@/api'
import Button from '@/components/button/button.vue'
import useDialog from '@/hooks/useDialog'
import useTable from '@/hooks/useTable'
import operate from './composables/operate'
import search from './composables/search'
import { tableProps as props } from './composables/table'

const menuSubForm = defineAsyncComponent(() => import('./components/menuSubForm.vue'))

const { register, tableObject, methods, elTableRef } = useTable({ getListApi, delListApi, props })
const [handleAddSub] = useDialog(menuSubForm, {
  dialogProps: { title: '添加下级' },
  contentProps: { beforeClose: () => methods.getList() },
})

const { searchForm, searchOptions, handleSearch } = search(methods.setSearchParams)
const { handleAdd, handleEdit } = operate(() => methods.getList())

async function handleDelete(row: any, multiple: boolean) {
  const selected = await methods.getSelections()
  const message = multiple ? `确认删除${selected.length}条菜单信息吗？` : '确认要将此菜单信息删除吗？'
  methods.delList(row ? [row.id] : selected.map(it => it.id), multiple, message)
}

// 展开全部
const expand = () => doExpand(tableObject.tableList, true)

// 折叠全部
const unExpand = () => doExpand(tableObject.tableList, false)

function doExpand(data: any, expansion: boolean) {
  if (data) {
    data.forEach((row: any) => {
      elTableRef.value?.toggleRowExpansion(row, expansion)
      doExpand(row.children, expansion)
    })
  }
}
</script>

<template>
  <div class="flex flex-col h-full">
    <Search local-name="menu_management" @callback="handleSearch">
      <template #main>
        <LabelInput v-model="searchForm.menuType" label="菜单名称" />
        <LabelSelect v-model="searchForm.menuName" label="菜单类型" :option="searchOptions.menuType" />
      </template>
    </Search>

    <Container>
      <ElSpace class="mb-[20px]">
        <Button v-auth:user-list-add icon="Plus" @click="handleAdd()">
          新增
        </Button>
        <Button v-auth:user-list-add icon="foldOpen" @click="expand">
          展开全部
        </Button>
        <Button v-auth:user-list-add icon="foldClose" @click="unExpand">
          折叠全部
        </Button>
      </ElSpace>

      <Table
        v-model:page-size="tableObject.pageSize" v-model:current-page="tableObject.currentPage"
        :tree-props="{ children: 'children' }" row-key="id" @register="register"
      >
        <template #operation="{ row }">
          <ElButton v-auth:user-list-edit link type="primary" size="small" @click="handleEdit(row)">
            编辑
          </ElButton>
          <ElButton v-auth:user-list-update-password link type="primary" size="small" @click="handleAddSub(row)">
            添加下级
          </ElButton>
          <ElButton v-auth:user-list-delete link type="danger" size="small" @click="handleDelete(row, false)">
            删除
          </ElButton>
        </template>
      </Table>
    </Container>
  </div>
</template>
