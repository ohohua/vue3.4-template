<script setup lang="ts">
import type { FormProps } from "@/components/form/src/types";
import useForm from "@/hooks/useForm";
import { getDictItemByCode, getRoleList, userAdd } from "@/api";
import type { FormSetPropsType } from "@/types/form";
import type { User } from "@/api/system/user/user";
import { optionsAlias } from "@/utils/option";

const props = defineProps<User.EditUserDto & { beforeClose: () => void }>();
const emits = defineEmits(["close"]);

const formProps = reactive<FormProps>({
  inline: true,
  isCol: false,
  schema: [
    { field: "username", label: "用户账号", component: "Input", componentProps: { autocomplete: "new-password", style: { width: "240px" } }, formItemProps: { required: true, showMessage: false } },
    {
      field: "password",
      label: "登录密码",
      component: "Input",
      componentProps: { showPassword: true, style: { width: "240px" }, autocomplete: "new-password" },
      formItemProps: { required: true, showMessage: false },
    },
    { field: "realName", label: "姓名", component: "Input", componentProps: { style: { width: "240px" } }, formItemProps: { required: true, showMessage: false } },
    {
      field: "major",
      label: "专业",
      component: "Select",
      componentProps: { options: [], optionsAlias, style: { width: "240px" } },
      formItemProps: { required: true, showMessage: false },
      api: async () => await getDictItemByCode("major"),
    },
    { field: "jobNumber", label: "人员编号", component: "Input", componentProps: { style: { width: "240px" } }, formItemProps: {} },
    {
      field: "jobLevel",
      label: "职务等级",
      component: "Select",
      componentProps: { options: [], optionsAlias, style: { width: "240px" } },
      formItemProps: {},
    },
    {
      field: "job",
      label: "职务",
      component: "Select",
      componentProps: { options: [], optionsAlias, style: { width: "240px" } },
      formItemProps: { required: true, showMessage: false },
    },
    { field: "orgId", label: "所属单位", component: "Input", componentProps: { style: { width: "240px" } }, formItemProps: {} },
    {
      field: "roleIds",
      label: "角色",
      component: "Select",
      componentProps: { options: [], multiple: true, optionsAlias: { labelField: "roleName", valueField: "id" }, style: { width: "240px" } },
      formItemProps: { required: true, showMessage: false },
    },
    { field: "birthday", label: "出生日期", component: "DatePicker", componentProps: { style: { width: "240px" }, format: "YYYY-MM-DD", valueFormat: "YYYY-MM-DD" }, formItemProps: {} },
    {
      field: "gender",
      label: "性别",
      component: "Select",
      componentProps: { options: [], optionsAlias, style: { width: "240px" } },
      formItemProps: {},
    },
    {
      field: "educationalBackground",
      label: "学历",
      component: "Select",
      componentProps: { options: [], optionsAlias, style: { width: "240px" } },
      formItemProps: {},
    },
    { field: "graduateAcademy", label: "毕业学校", component: "Input", componentProps: { style: { width: "240px" } }, formItemProps: {} },
    {
      field: "militaryRank",
      label: "军衔",
      component: "Select",
      componentProps: { options: [], optionsAlias, style: { width: "240px" } },
      formItemProps: {},
    },
    { field: "enlistenmentTime", label: "入伍日期", component: "DatePicker", componentProps: { style: { width: "240px" }, format: "YYYY-MM-DD", valueFormat: "YYYY-MM-DD" }, formItemProps: {} },
    {
      field: "status",
      label: "账号状态",
      component: "Select",
      componentProps: { options: [], optionsAlias, style: { width: "240px" } },
      formItemProps: { required: true, showMessage: false },
    },
  ],
});

const emptyForm = (data: any) => {
  const empty = {};
  return Object.assign(empty, data);
};
const { register, elFormRef, methods } = useForm(formProps);

const handleConfirm = async () => {
  const data = await methods.getFormData();
  elFormRef.value?.validate(async (valid) => {
    if (valid) {
      const res = await userAdd(data as User.EditUserDto);
      ElMessage.success(res.message);
      props.beforeClose();
      emits("close");
    }
  });
};

// 获取下拉选项
const getOption = async () => {
  // 处理 options
  const schemaProps: FormSetPropsType[] = (formProps.schema || [])
    ?.filter((item) => item.component === "Select")
    ?.map((item) => {
      return {
        field: item.field,
        path: ["componentProps", "options"],
        value: [],
      };
    });

  for (const item of schemaProps) {
    item.value = item.field === "roleIds" ? (await getRoleList({ pageIndex: 1, pageSize: 9999 })).data.list : (await getDictItemByCode(item.field)).data;
  }

  methods.setSchema(schemaProps);
};
onMounted(async () => {
  methods.setValues(emptyForm(props));
  // 编辑不要密码
  if (props.id) {
    formProps.schema?.splice(1, 1, {
      field: "password",
      label: "",
      formItemProps: { style: { width: "320px" } },
    });
  }

  getOption();
});

defineExpose({ elFormRef, methods });
</script>

<template>
  <div class="text-center">
    <Form class="p-4" @register="register"></Form>
    <Footer cancel confirm @cancel="emits('close')" @confirm="handleConfirm"></Footer>
  </div>
</template>
