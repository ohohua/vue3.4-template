<script setup lang="ts">
import { deleteDict as delListApi, getDictList as getListApi } from '@/api'
import Button from '@/components/button/button.vue'
import useDialog from '@/hooks/useDialog'
import useTable from '@/hooks/useTable'
import operate from './composables/operate'
import search from './composables/search'
import { tableProps } from './composables/table'

const DictConfig = defineAsyncComponent(() => import('./components/dictConfig.vue'))
const DictDetail = defineAsyncComponent(() => import('./components/dictDetail.vue'))

const { register, tableObject, methods } = useTable({ getListApi, delListApi, props: tableProps })

const { searchForm, searchOptions, handleSearch } = search(methods.setSearchParams)

const { handleAdd, handleEdit } = operate(() => methods.getList())

const [handleDetail] = useDialog(DictDetail, { dialogProps: { title: '查看字典' } })
const [handleDictConfig] = useDialog(DictConfig, { dialogProps: { title: '字典配置' } })

async function handleDelete(row: any, multiple: boolean) {
  const selected = await methods.getSelections()
  const message = multiple ? `确认删除${selected.length}条字典信息吗？` : '确认要将字典删除吗？'
  methods.delList(row ? [row.id] : selected.map(it => it.id), multiple, message)
}
</script>

<template>
  <div class="flex flex-col h-full">
    <Search local-name="dict_management" @callback="handleSearch">
      <template #main>
        <LabelInput v-model="searchForm.dictTypeName" label="字典名称" />
        <LabelInput v-model="searchForm.dictTypeCode" label="字典编码" />
        <LabelSelect v-model="searchForm.status" label="状态" :option="searchOptions.status" />
      </template>
    </Search>

    <Container>
      <ElSpace class="mb-[20px]">
        <Button v-auth:user-list-add icon="Plus" @click="handleAdd">
          新增
        </Button>
        <Button v-auth:user-list-export icon="Close" type="danger" @click="handleDelete(false, true)">
          批量删除
        </Button>
      </ElSpace>

      <Table v-model:current-page="tableObject.currentPage" v-model:page-size="tableObject.pageSize" @register="register">
        <template #operation="{ row }">
          <ElButton v-auth:user-list-view link type="success" size="small" @click="handleDetail(row)">
            查看
          </ElButton>
          <ElButton v-auth:user-list-edit link type="primary" size="small" @click="handleEdit(row)">
            编辑
          </ElButton>
          <ElButton v-auth:user-list-update-password link type="primary" size="small" @click="handleDictConfig(row)">
            字典配置
          </ElButton>
          <ElButton v-auth:user-list-delete link type="danger" size="small" @click="handleDelete(row, false)">
            删除
          </ElButton>
        </template>
      </Table>
    </Container>
  </div>
</template>
