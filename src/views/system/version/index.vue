<script setup lang="ts">
import useTable from "@/hooks/useTable";
import Button from "@/components/button/button.vue";
import search from "./composables/search";
import operate from "./composables/operate";
import { tableProps as props } from "./composables/table";
import { deleteVersion as delListApi, downloadVersion, getVersionList as getListApi } from "@/api";
import useDialog from "@/hooks/useDialog";
import type { Version } from "@/api/system/version/version";
import download from "@/utils/download";
const versionDetail = defineAsyncComponent(() => import("./components/versionDetail.vue"));

const { openDialog: handleDetail } = useDialog(versionDetail, { dialogProps: { title: "软件版本详情" } });
const { register, tableObject, methods } = useTable({ getListApi, delListApi, props });

const { searchForm, searchOptions, handleSearch } = search(methods.setSearchParams);
const { handleAdd, handleEdit } = operate(() => methods.getList());

const handleDownload = async (row: Version.List) => {
  const res = await downloadVersion(row.id as string);
  download(new Blob([res]), row.fileName?.split(".")[0] as string, row.fileName?.split(".")[1] as string);
};
const handleDelete = (row: Version.List) => methods.delList([row.id as string], false, true);
</script>

<template>
  <div class="flex flex-col h-full">
    <Search local-name="version_management" @callback="handleSearch">
      <template #main>
        <LabelSelect v-model="searchForm.softName" label="软件名称" :option="searchOptions.softName" />
        <LabelInput v-model="searchForm.versionCode" label="版本号" />
      </template>
    </Search>
    <Container>
      <ElSpace class="mb-[20px]">
        <Button v-has="'user-list/btn-add'" icon="Plus" @click="handleAdd">新增</Button>
      </ElSpace>

      <Table @register="register" v-model:page-size="tableObject.pageSize" v-model:current-page="tableObject.currentPage">
        <template #operation="{ row }">
          <ElButton v-has="'user-list/btn-view'" link type="success" size="small" @click="handleDetail(row)">查看</ElButton>
          <ElButton v-has="'user-list/btn-edit'" link type="primary" size="small" @click="handleEdit(row)">编辑</ElButton>
          <ElButton v-has="'user-list/btn-update-password'" link type="primary" size="small" @click="handleDownload(row)">下载</ElButton>
          <ElButton v-has="'user-list/btn-delete'" link type="danger" size="small" @click="handleDelete(row)">删除</ElButton>
        </template>
      </Table>
    </Container>
  </div>
</template>
