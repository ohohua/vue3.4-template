<script lang="ts" setup>
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { useValidator } from "@/hooks/useValidator";
import { editConfig, getConfig } from "@/api";
import type { Config } from "@/api/system/config/config";
import { cloneDeep } from "lodash-es";

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<Config.EditParamsParams>({
  loginType: [],
  defaultLoginType: undefined,
  canUseWifi: undefined,
  bestTimes: undefined,
  maximumDuration: undefined,
});

const { required } = useValidator();
const rules = reactive<FormRules<Config.EditParamsParams>>({
  loginType: [required("请选择终端登录方式")],
  defaultLoginType: [required("请选择终端默认登录方式")],
  canUseWifi: [required("请选择终端是否禁用无线网络")],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const data: any = cloneDeep(ruleForm);
      data.loginType = data.loginType?.join(",");
      data.defaultLoginType = Number(data.loginType);
      const res = await editConfig(data);
      ElMessage.success(res.message);
    } else {
      console.log("error submit!", fields);
    }
  });
};

onMounted(async () => {
  const res = await getConfig();
  res.data.loginType = res.data.loginType.split(",");
  Object.assign(ruleForm, res.data);
});
</script>
<template>
  <Container>
    <el-form ref="ruleFormRef" style="max-width: 700px" :model="ruleForm" :rules="rules" label-width="180px" :size="formSize" status-icon>
      <el-form-item label="终端登录方式" prop="loginType">
        <el-checkbox-group v-model="ruleForm.loginType">
          <el-checkbox value="0" name="type">用户名登录</el-checkbox>
          <el-checkbox value="1" name="type">个人信息登录</el-checkbox>
          <el-checkbox value="2" name="type">扫码登录</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="终端默认登陆方式" prop="defaultLoginType">
        <el-select style="width: 240px" v-model="ruleForm.defaultLoginType" placeholder="请选择终端默认登陆方式">
          <el-option label="用户名登录" :value="0" />
          <el-option label="个人信息登录" :value="1" />
          <el-option label="扫码登录" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="终端是否禁用无线网络" prop="canUseWifi">
        <el-radio-group v-model="ruleForm.canUseWifi">
          <el-radio :value="0">否</el-radio>
          <el-radio :value="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="终端工作步骤停留时间" prop="type">
        <div class="flex">
          <div class="flex items-start gap-2 mr-10">
            <el-input-number :controls="false" style="width: 50px" v-model="ruleForm.bestTimes" />
            <span>最短时间/秒</span>
          </div>
          <div class="flex items-start gap-2">
            <el-input :controls="false" style="width: 50px" v-model="ruleForm.maximumDuration" />
            <span>最长时间/秒</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <Button type="primary" @click="submitForm(ruleFormRef)">保 存</Button>
      </el-form-item>
    </el-form>
  </Container>
</template>
