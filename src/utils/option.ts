const statusOptions = [
  { dictLabel: "启用", dictValue: 1, id: 1 },
  { dictLabel: "停用", dictValue: 0, id: 0 },
];

/**
 * table根据状态渲染不同样式的状态 启用-停用
 * @param param0
 * @returns
 */
const formatter = ({ status }: { status: number | undefined }) => (status === 1 ? h("span", { class: "text-[#06bb9a]" }, "启用") : h("span", { class: "text-[#FFB402]" }, "停用"));

/**
 * table根据状态渲染不同样式的状态 正常-冻结
 * @param param0
 * @returns
 */
const formatterFreeze = ({ status }: { status: number | undefined }) => (status === 1 ? h("span", { class: "text-[#06bb9a]" }, "启用") : h("span", { class: "text-[#FFB402]" }, "停用"));
/**
 * table根据状态渲染不同样式的状态 成功-失败
 * @param param0
 * @returns
 */
const formatterSuccess = ({ status }: { status: number | undefined }) => (status === 0 ? h("span", { class: "text-[#06bb9a]" }, "成功") : h("span", { class: "text-[#FFB402]" }, "失败"));

/**
 * select, option别名
 * @returns
 */
const optionsAlias = { labelField: "dictLabel", valueField: "id" };

export { statusOptions, formatter, formatterFreeze, formatterSuccess, optionsAlias };
