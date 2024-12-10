import type { FormSchema } from "@/types/form";
import { ElCheckbox, ElCheckboxButton } from "element-plus";
import { defineComponent } from "vue";

export const useRenderCheckbox = () => {
  const renderCheckboxOptions = (item: FormSchema) => {
    // 如果有别名，就取别名
    const labelAlias = item?.componentProps?.optionsAlias?.labelField;
    const valueAlias = item?.componentProps?.optionsAlias?.valueField;
    const Com = (item.component === "Checkbox" ? ElCheckbox : ElCheckboxButton) as ReturnType<typeof defineComponent>;
    return item?.componentProps?.options?.map((option: { [x: string]: any }) => {
      return <Com label={option[labelAlias || "value"]}>{option[valueAlias || "label"]}</Com>;
    });
  };

  return {
    renderCheckboxOptions,
  };
};
