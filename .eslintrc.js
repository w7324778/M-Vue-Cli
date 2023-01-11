module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
    amd: true
  },
  globals: {
    //声明全局对象
    ga: true,
    chrome: true,
    __DEV__: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [],
  // 解析 .vue 文件
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx', 'vue'] }
    }
  },
  rules: {
    // 0表示不不处理，1表示警告，2表示错误并退出
    'vue/multi-word-component-names': 'off', // 要求组件名称始终为多字
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '.*', args: 'none' }],
    camelcase: 1, // 驼峰命名
    'prettier/prettier': 0, // 会优先采用prettierrc.json的配置，不符合规则会提示错误
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': 'off',
    'import/prefer-default-export': 'off', // 优先export default导出
    'no-param-reassign': 'off', // 函数参数属性的赋值
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-types': 'error', //不允许某些类型。
    'no-unused-expressions': 'off', // 联式调用使用?
    'import/no-cycle': 'off', // 导入循环引用报错
    'arrow-parens': 'off', // 箭头函数一个参数可以不要括号
    'no-underscore-dangle': 'off', // 无下划线
    'no-plusplus': 'off', //  使用一元运算符
    'object-curly-newline': 'off',
    'no-restricted-syntax': 'off', // 使用for of
    'operator-linebreak': 'off', // after
    'arrow-body-style': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off', // ts每个函数都要显式声明返回值
    // 暂时屏蔽检测@别名
    'import/no-useless-path-segments': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off',
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 10 }],
    'linebreak-style': [0, 'error', 'windows'],
    'no-shadow': 'off', // 注意你必须禁用基本规则，因为它可以报告不正确的错误
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }
    ],
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'vue/comment-directive': 'off'
  }
}
