<script setup lang="ts">
import type { FormProps } from "@/components/form/src/types";
import useForm from "@/hooks/useForm";
import { statusOptions } from "@/utils/option";
import type { Role } from "@/api/system/role/role";
import { addRole, editRole } from "@/api";
import { useValidator } from "@/hooks/useValidator";

const props = defineProps<Role.RoleItem & { beforeClose: () => void }>();
const emits = defineEmits(["close"]);
const { rules } = useValidator();

const formProps = reactive<FormProps>({
  inline: true,
  isCol: false,
  schema: [
    { field: "roleName", label: "角色名称", component: "Input", componentProps: { style: { width: "240px" } }, formItemProps: { rules: rules("请输入角色名称") } },
    { field: "roleCode", label: "角色编号", component: "Input", componentProps: { style: { width: "240px" } }, formItemProps: { rules: rules("请输入角色编号") } },
    {
      field: "status",
      label: "角色状态",
      component: "Select",
      componentProps: { options: statusOptions, optionsAlias: { labelField: "dictLabel", valueField: "dictValue" }, style: { width: "240px" } },
      formItemProps: { rules: rules("请选择角色状态"), style: { width: "670px" } },
    },
    {
      field: "remark",
      label: "备注",
      component: "Input",
      componentProps: { style: { width: "590px" }, type: "textarea", resize: "none", autosize: { minRows: 4, maxRows: 4 }, maxlength: 500, showWordLimit: true },
      formItemProps: {},
    },
  ],
});

const emptyForm = (data: any) => {
  const empty = {
    id: null,
    roleName: null,
    roleCode: null,
    status: null,
    remark: null,
  };
  return Object.assign(empty, data);
};
const { register, elFormRef, methods } = useForm(formProps);

const handleConfirm = async () => {
  const data = await methods.getFormData();
  elFormRef.value?.validate(async (valid) => {
    if (valid) {
      const fn = props.id ? editRole : addRole;
      const res = await fn(data as Role.RoleItem);
      ElMessage.success(res.message);
      props?.beforeClose();
      emits("close");
    }
  });
};

onMounted(() => {
  methods.setValues(emptyForm(props));
});
defineExpose({ elFormRef, methods });
</script>

<template>
  <div class="text-center">
    <Form @register="register" class="p-4"></Form>
    <Footer cancel confirm @cancel="emits('close')" @confirm="handleConfirm"></Footer>
  </div>
</template>
