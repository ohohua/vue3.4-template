<script setup lang="ts">
import { getLogList } from '@/api'
import Button from '@/components/button/button.vue'
import useDialog from '@/hooks/useDialog'
import useTable from '@/hooks/useTable'
import operate from './composables/operate'
import search from './composables/search'
import { tableProps } from './composables/table'

const logDetail = defineAsyncComponent(() => import('./components/logDetail.vue'))

const { register, tableObject, methods } = useTable({ getListApi: getLogList, props: tableProps })

const { searchForm, searchOptions, handleSearch } = search(methods.setSearchParams)

const { handleEdit, handleExport } = operate(() => methods.getList())

const [handleDetail] = useDialog(logDetail, { dialogProps: { title: '日志详情' } })
</script>

<template>
  <div class="flex flex-col h-full">
    <Search local-name="log_management" @callback="handleSearch">
      <template #main>
        <LabelInput v-model="searchForm.operateObject" label="操作对象" />
        <LabelInput v-model="searchForm.operateAccount" label="操作账号" />
        <LabelSelect v-model="searchForm.operateType" label="操作类型" :option="searchOptions.operateType" />
      </template>
      <template #secondary>
        <LabelSelect v-model="searchForm.status" label="操作状态" :option="searchOptions.status" />
        <LabelSelect v-model="searchForm.logType" label="日志类型" :option="searchOptions.logType" />
        <LabelDatePicker
          v-model="searchForm.createTime"
          label="操作时间"
          format="YYYY-MM-DD HH:mm"
          value-format="YYYY-MM-DD HH:mm"
          type="daterange"
          :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)]"
        />
      </template>
    </Search>

    <Container>
      <ElSpace class="mb-[20px]">
        <Button v-auth:user-list-export icon="Upload" @click="handleExport">
          导出
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
        </template>
      </Table>
    </Container>
  </div>
</template>
