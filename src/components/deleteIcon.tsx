import { defineComponent } from "vue";
import { Warning } from "@element-plus/icons-vue";

export default defineComponent({
  name: "deleteIcon",
  setup() {
    return () => (
      <div class="text-center py-2 text-sm h-full">
        <el-icon size={100}>
          <Warning />
        </el-icon>
      </div>
    );
  },
});
