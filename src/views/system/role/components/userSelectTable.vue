<script setup lang="ts">
import { addRoleUser, getRoleUserList } from "@/api";
import useTable from "@/hooks/useTable";
import type { TableProps } from "@/components/table/src/types";

const props = defineProps<{ roleId: string }>();
const columns = [
  { label: "排序", field: "sort" },
  { label: "用户账号", field: "username" },
  { label: "用户姓名", field: "realName" },
  { label: "状态", field: "statusStr" },
  { label: "操作", field: "operation", fixed: "right" },
];
const tableProps: TableProps = reactive({ columns, selection: false, pagination: {} });
const searchForm = ref({ username: "", realName: "" });
const handleSearch = (type: "query" | "reset") => {
  methods.setSearchParams(type === "query" ? searchForm.value : {});
};

const { register, tableObject, methods } = useTable({ getListApi: getRoleUserList, props: tableProps }, { type: 0 });

const handleRelevance = async (row: any) => {
  const res = await addRoleUser({ roleId: props.roleId, userIds: [row.id as number] });
  ElMessage.success(res.message);
  methods.getList();
};
</script>

<template>
  <Container>
    <Search local-name="dict_config_management" @callback="handleSearch">
      <template #main>
        <LabelInput v-model="searchForm.username" label="用户账号" />
        <LabelInput v-model="searchForm.realName" label="用户姓名" />
      </template>
    </Search>

    <Table @register="register" v-model:current-page="tableObject.currentPage" v-model:page-size="tableObject.pageSize" :selection="false" :height="300">
      <template #operation="{ row }">
        <ElButton v-has="'user-list/btn-view'" link type="primary" size="small" @click="handleRelevance(row)">关联用户</ElButton>
      </template>
    </Table>
  </Container>
</template>
