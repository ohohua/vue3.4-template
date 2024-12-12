<script setup lang="ts">
import useTable from "@/hooks/useTable";
import Button from "@/components/button/button.vue";
import search from "./composables/search";
import operate from "./composables/operate";
import { tableProps as props } from "./composables/table";
import { deleteMenu as delListApi, getMenuList as getListApi } from "@/api";
import useDialog from "@/hooks/useDialog";
const menuSubForm = defineAsyncComponent(() => import("./components/menuSubForm.vue"));

const { register, tableObject, methods, elTableRef } = useTable({ getListApi, delListApi, props });
const [handleAddSub] = useDialog(menuSubForm, {
  dialogProps: { title: "添加下级" },
  contentProps: { beforeClose: () => methods.getList() },
});

const { searchForm, searchOptions, handleSearch } = search(methods.setSearchParams);
const { handleAdd, handleEdit } = operate(() => methods.getList());

const handleDelete = async (row: any, multiple: boolean) => {
  const selected = await methods.getSelections();
  let msg = multiple ? `确认删除${selected.length}条菜单信息吗？` : "确认要将此菜单信息删除吗？";
  methods.delList(row ? [row.id] : selected.map((it) => it.id), multiple, msg);
};

//展开全部
const expand = () => doExpand(tableObject.tableList, true);

//折叠全部
const unExpand = () => doExpand(tableObject.tableList, false);

const doExpand = (data: any, expansion: boolean) => {
  if (data) {
    data.forEach((row: any) => {
      elTableRef.value?.toggleRowExpansion(row, expansion);
      doExpand(row.children, expansion);
    });
  }
};
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
        <Button v-has="'user-list/btn-add'" icon="Plus" @click="handleAdd()">新增</Button>
        <Button v-has="'user-list/btn-add'" icon="foldOpen" @click="expand">展开全部</Button>
        <Button v-has="'user-list/btn-add'" icon="foldClose" @click="unExpand">折叠全部</Button>
      </ElSpace>

      <Table @register="register" :tree-props="{ children: 'children' }" row-key="id" v-model:page-size="tableObject.pageSize" v-model:current-page="tableObject.currentPage">
        <template #operation="{ row }">
          <ElButton v-has="'user-list/btn-edit'" link type="primary" size="small" @click="handleEdit(row)">编辑</ElButton>
          <ElButton v-has="'user-list/btn-update-password'" link type="primary" size="small" @click="handleAddSub(row)">添加下级</ElButton>
          <ElButton v-has="'user-list/btn-delete'" link type="danger" size="small" @click="handleDelete(row, false)">删除</ElButton>
        </template>
      </Table>
    </Container>
  </div>
</template>
