module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    // 'plugin:vue/vue3-recommended',
    "plugin:vue/base",
    "plugin:vue/essential",
    "plugin:vue/strongly-recommended",
    "plugin:vue/recommended",
    'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    // override/add rules settings here, such as
      "vue/script-indent": ["error", 2, {
        "baseIndent": 0,
        "switchCase": 0,
        "ignores": []
      }],
    "indent": ["error", 2]
    
    // 'vue/no-unused-vars': 'error'
  }
}