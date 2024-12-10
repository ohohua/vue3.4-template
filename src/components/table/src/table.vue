<script lang="tsx">
import { setIndex } from "./helper";
import { getSlot } from "./tsxHelper";
import { set } from "lodash-es";
import type { PropType } from "vue";
import type { TableProps } from "./types";
import type { TableColumn, TableSlotDefault, Pagination, TableSetPropsType } from "@/types/table";
import type { ComponentRef, Recordable } from "@/types/form";
import type { ElTable } from "element-plus";

export default defineComponent({
  name: "CustomTable",
  props: {
    pageSize: { type: Number, default: 10 },
    currentPage: { type: Number, default: 1 },
    total: { type: Number, default: 0 },
    // 是否多选
    selection: { type: Boolean, default: true },
    // 是否所有的超出隐藏，优先级低于schema中的showOverflowTooltip,
    showOverflowTooltip: { type: Boolean, default: true },
    // 表头
    columns: { type: Array as PropType<TableColumn[]>, default: () => [] },
    // 展开行
    expand: { type: Boolean, default: false },
    // 是否展示分页
    pagination: {
      type: Object as PropType<Pagination>,
      default: (): Pagination | undefined => undefined,
    },
    // 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）
    reserveSelection: { type: Boolean, default: false },
    // 加载状态
    loading: { type: Boolean, default: false },
    // 是否叠加索引
    reserveIndex: { type: Boolean, default: false },
    // 对齐方式
    align: {
      type: String,
      default: "center",
      validate: (v: string) => ["left", "center", "right"].includes(v),
    },
    // 表头对齐方式
    headerAlign: {
      type: String,
      default: "center",
      validate: (v: string) => ["left", "center", "right"].includes(v),
    },

    data: {
      type: Array as PropType<Recordable[]>,
      default: () => [],
    },
    // 是否为flex 1表格
    isFlex: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:pageSize", "update:currentPage", "register"],
  setup(props, { attrs, slots, emit, expose }) {
    const elTableRef = ref<ComponentRef<typeof ElTable>>();

    // 注册
    onMounted(() => {
      const tableRef = unref(elTableRef);
      emit("register", tableRef?.$parent, elTableRef);
    });

    const pageSizeRef = ref(props.pageSize);

    const currentPageRef = ref(props.currentPage);

    // useTable传入的props
    const outsideProps = ref<TableProps>({});

    const mergeProps = ref<TableProps>({});

    const getProps = computed(() => {
      const propsObj = { ...props };
      Object.assign(propsObj, unref(mergeProps));
      return propsObj;
    });

    const setProps = (props: TableProps = {}) => {
      mergeProps.value = Object.assign(unref(mergeProps), props);
      outsideProps.value = props;
    };

    const setColumn = (columnProps: TableSetPropsType[], columnsChildren?: TableColumn[]) => {
      const { columns } = unref(getProps);
      for (const v of columnsChildren || columns) {
        for (const item of columnProps) {
          if (v.field === item.field) {
            set(v, item.path, item.value);
          } else if (v.children?.length) {
            setColumn(columnProps, v.children);
          }
        }
      }
    };

    const selections = ref<Recordable[]>([]);

    const selectionChange = (selection: Recordable[]) => {
      selections.value = selection;
    };

    expose({
      setProps,
      setColumn,
      selections,
      elTableRef,
    });

    const pagination = computed(() => {
      return Object.assign(
        {
          small: false,
          background: true,
          pagerCount: 7,
          layout: "prev, pager, next,sizes, jumper, total",
          pageSizes: [10, 20, 50, 100],
          disabled: false,
          hideOnSinglePage: false,
          total: 0,
        },
        unref(getProps).pagination,
      );
    });

    watch(
      () => unref(getProps).pageSize,
      (val: number) => {
        pageSizeRef.value = val;
      },
    );

    watch(
      () => unref(getProps).currentPage,
      (val: number) => {
        currentPageRef.value = val;
      },
    );

    watch(
      () => pageSizeRef.value,
      (val: number) => {
        emit("update:pageSize", val);
      },
    );

    watch(
      () => currentPageRef.value,
      (val: number) => {
        emit("update:currentPage", val);
      },
    );

    const getBindValue = computed(() => {
      const bindValue: Recordable = { ...attrs, ...props };
      delete bindValue.columns;
      delete bindValue.data;
      return bindValue;
    });

    const renderTableSelection = () => {
      const { selection, reserveSelection, align, headerAlign } = unref(getProps);
      // 渲染多选
      return selection ? <el-table-column type="selection" reserveSelection={reserveSelection} align={align} headerAlign={headerAlign} width="50"></el-table-column> : undefined;
    };

    const renderTableExpand = () => {
      const { align, headerAlign, expand } = unref(getProps);
      // 渲染展开行
      return expand ? (
        <el-table-column type="expand" align={align} headerAlign={headerAlign}>
          {{
            // @ts-ignore
            default: (data: TableSlotDefault) => getSlot(slots, "expand", data),
          }}
        </el-table-column>
      ) : undefined;
    };

    const renderTreeTableColumn = (columnsChildren: TableColumn[]) => {
      const { align, headerAlign, showOverflowTooltip } = unref(getProps);
      return columnsChildren.map((v, index) => {
        const props = { ...v };
        if (props.children) {
          delete props.children;
        }
        return (
          <el-table-column key={index} showOverflowTooltip={showOverflowTooltip} align={align} headerAlign={headerAlign} {...props} prop={v.field}>
            {{
              default: (data: TableSlotDefault) => {
                return v.children && v.children.length
                  ? renderTableColumn(v.children)
                  : // @ts-ignore
                    getSlot(slots, v.field, data) || v?.formatter?.(data.row, data.column, data.row[v.field], data.$index) || data.row[v.field];
              },
              // @ts-ignore
              header: getSlot(slots, `${v.field}-header`),
            }}
          </el-table-column>
        );
      });
    };

    const renderTableColumn = (columnsChildren?: TableColumn[]) => {
      const { columns, reserveIndex, pageSize, currentPage, align, headerAlign, showOverflowTooltip } = unref(getProps);
      return [...[renderTableExpand()], ...[renderTableSelection()]].concat(
        (columnsChildren || columns).map((v, index) => {
          // 自定生成序号
          if (v.type === "index") {
            return (
              <el-table-column
                type="index"
                index={v.index ? v.index : (index: number) => setIndex(reserveIndex, index, pageSize, currentPage)}
                align={v.align || align}
                headerAlign={v.headerAlign || headerAlign}
                label={v.label}
                width="65px"
              ></el-table-column>
            );
          }
          const props = { ...v };
          if (props.children) {
            delete props.children;
          }
          return (
            <el-table-column key={index} showOverflowTooltip={showOverflowTooltip} align={align} headerAlign={headerAlign} {...props} prop={v.field}>
              {{
                default: (data: TableSlotDefault) =>
                  v.children && v.children.length
                    ? renderTreeTableColumn(v.children)
                    : // @ts-ignore
                      getSlot(slots, v.field, data) || v?.formatter?.(data.row, data.column, data.row[v.field], data.$index) || data.row[v.field],
                // @ts-ignore
                header: () => getSlot(slots, `${v.field}-header`) || v.label,
              }}
            </el-table-column>
          );
        }),
      );
    };

    return () => (
      <div class={[unref(getProps).isFlex ? "flex flex-col h-0 flex-1" : "", "custom-table"]} v-loading={unref(getProps).loading}>
        <el-table
          // @ts-ignore
          ref={elTableRef}
          data={unref(getProps).data}
          onSelection-change={selectionChange}
          {...unref(getBindValue)}
          stripe
        >
          {{
            default: () => renderTableColumn(),
            // @ts-ignore
            append: () => getSlot(slots, "append"),
            empty: () => <el-empty image-size={80} description="暂无数据" />,
          }}
        </el-table>
        {unref(getProps).pagination ? (
          <el-pagination v-model:pageSize={pageSizeRef.value} v-model:currentPage={currentPageRef.value} class="mt-10px pagination" {...toValue(pagination)} />
        ) : undefined}
      </div>
    );
  },
});
</script>
<style lang="scss" scoped>
.custom-table {
  // 默认使用 `flex: 1` 撑开table
  // 当 isFlex 为 false 时使盒子自然撑开

  ::v-deep(.el-table) {
    max-height: 100%;
    .el-checkbox {
      vertical-align: middle;
    }
    .el-table__header,
    .el-table__row {
      height: 36px;
    }
    .el-table__inner-wrapper::before {
      display: none;
    }

    .el-table__header-wrapper {
      background-color: #f0f3f8;

      .el-table__cell {
        color: #333333;
        font-size: 14px;
        font-weight: bold;
        background-color: #f0f3f8;
        border-top: 1px solid #ebebeb;
        &:first-child {
          border-left: 1px solid #ebebeb;
        }

        &:last-child {
          border-right: 1px solid #ebebeb;
        }
      }
    }
    .el-table__body-wrapper .el-table-column--selection > .cell,
    .el-table__header-wrapper .el-table-column--selection > .cell {
      justify-content: center;
    }
    .el-table__body-wrapper {
      .el-table__row {
        .el-table__cell {
          &:first-child {
            z-index: 999;
            border-left: 1px solid #ebebeb;
          }

          &:last-child {
            padding-right: 8px;
            border-right: 1px solid #ebebeb;
          }
        }
      }
    }
    .el-scrollbar__view {
      height: 100%;
    }
  }

  // ::v-deep(.el-table) {
  //   height: 100%;
  //   .el-checkbox {
  //     vertical-align: middle;
  //   }
  //   .el-table__header,
  //   .el-table__row {
  //     height: 60px;
  //   }
  //   .el-table__inner-wrapper {
  //     &::before {
  //       display: none;
  //     }
  //   }

  //   .el-table__header-wrapper {
  //     border-radius: 8px;
  //     background-color: #f3f5ff;

  //     .el-table__cell {
  //       color: #333333;
  //       font-size: 16px;
  //       font-weight: bold;
  //       background-color: #f3f5ff;
  //       border-color: #f3f5ff;
  //     }
  //   }
  //   .el-table__body-wrapper .el-table-column--selection > .cell,
  //   .el-table__header-wrapper .el-table-column--selection > .cell {
  //     justify-content: center;
  //   }
  //   .el-table__body-wrapper {
  //     .el-table__row {
  //       .el-table__cell {
  //         &:first-child {
  //           z-index: 999;
  //           border-radius: 8px 0 0 8px;
  //         }

  //         &:last-child {
  //           padding-right: 8px;
  //           border-right: 1px solid #f5f6fa;
  //           border-radius: 0 8px 8px 0;
  //         }
  //       }
  //     }
  //     .tipsStyle {
  //       border: 1px solid red !important;
  //       background: rgb(255, 147, 75);
  //       z-index: 9999;
  //       border-radius: 8px;
  //     }
  //   }
  //   .el-scrollbar__view {
  //     height: 100%;
  //   }
  // }
  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
