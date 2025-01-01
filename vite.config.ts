import { fileURLToPath, URL } from "node:url";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// import Inspect from 'vite-plugin-inspect'

const pathSrc = path.resolve(__dirname, "src"); // commonjs
// https://vitejs.dev/config/

export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd());
  const baseUrl = viteEnv.VITE_SERVICE_BASE_URL; //后端的地址
  return {
    envPrefix: ["VITE_"],
    plugins: [
      vue(),
      vueJsx(),
      // element-plus 自动导入
      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue"],

        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver(),

          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: "Icon",
          }),
        ],

        dts: path.resolve(pathSrc, "auto-imports.d.ts"),
      }),

      Components({
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"],
          }),
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
        ],

        dts: path.resolve(pathSrc, "components.d.ts"),
      }),

      Icons({
        autoInstall: true,
      }),

      // Inspect(),
    ],
    resolve: {
      alias: {
        /**
         * fileURLToPath 去掉 file://
         * import.meta.url: file:///xxx/vue3.4-template/vite.config.ts
         * new URL("./src", import.meta.url): file:///xxx/vue3.4-template/src
         */
        "@": fileURLToPath(new URL("./src", import.meta.url)), // 和 "@": pathSrc 等价
      },
    },
    server: {
      proxy: {
        /**
         * 将/uploads开头的请求代理到baseUrl
         * ex: http://localhost:3000/uploads/xxx.png -> baseUrl/uploads/xxx.png
         */
        "/uploads": {
          target: baseUrl,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  };
});
