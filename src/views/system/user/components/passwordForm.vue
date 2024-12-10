<script setup lang="ts">
import type { FormProps } from "@/components/form/src/types";
import useForm from "@/hooks/useForm";
import { userAdd } from "@/api";
import type { User } from "@/api/system/user/user";

const props = defineProps<User.EditUserDto>();
const emits = defineEmits(["close"]);

const formProps = reactive<FormProps>({
  inline: true,
  isCol: false,
  schema: [
    { field: "username", label: "用户账号", component: "Input" },
    {
      field: "password",
      label: "登录密码",
      component: "Input",
      componentProps: { showPassword: true, style: { width: "540px" } },
      formItemProps: {
        rules: {
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (value === "") {
              callback(new Error("请输入密码"));
            } else if (value.length < 6 || value.length > 20 || !/^[A-Za-z0-9]+$/.test(value)) {
              callback(new Error("密码长度为6-20位，允许使用纯字母、纯数字或他们的组合"));
            } else {
              callback();
            }
          },
        },
      },
    },
    {
      field: "confirmPassword",
      label: "确认密码",
      component: "Input",
      componentProps: { showPassword: true, style: { width: "540px" } },
      formItemProps: {
        rules: {
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (value === "") {
              callback(new Error("请输入密码"));
            } else if (value.length < 6 || value.length > 20 || !/^[A-Za-z0-9]+$/.test(value)) {
              callback(new Error("密码长度为6-20位，允许使用纯字母、纯数字或他们的组合"));
            } else {
              callback();
            }
          },
        },
      },
    },
  ],
});

const emptyForm = (data: any) => {
  const empty = {};
  return Object.assign(empty, data);
};
const { register, elFormRef, methods } = useForm(formProps);

const handleConfirm = async () => {
  elFormRef.value?.validate(async (valid) => {
    if (valid) {
      const data = await methods.getFormData();
      if (data?.password !== data?.confirmPassword) {
        ElMessage.error("密码不一致");
        return;
      }
      const res = await userAdd(data as User.EditUserDto);
      ElMessage.success(res.message);
      emits("close");
    }
  });
};

onMounted(async () => {
  methods.setValues(emptyForm(props));
});

defineExpose({ elFormRef, methods });
</script>

<template>
  <div class="text-center">
    <Form @register="register">
      <template #username>
        <div class="w-[540px] text-left">{{ username }}</div>
      </template>
    </Form>
    <Footer cancel confirm @cancel="emits('close')" @confirm="handleConfirm"></Footer>
  </div>
</template>
