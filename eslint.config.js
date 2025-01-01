import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'ts/no-use-before-define': 'off', // 关闭变量提升检查
    'jsdoc/require-returns-check': 'off', // 关闭返回值检查
  },
})
