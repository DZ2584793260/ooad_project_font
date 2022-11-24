# 目前代码主要是了解不同view和组件的结构
1. App.vue主要包含的是所有页面共同需要的东西，值得注意的是，背景处理上，虽然引用代码写在了各页面当中，但是样式定义在了App.vue中，防止代码重复。粒子特效的样式同样如此。
2. views中包含的是不同的页面
3. components中包含的是页面当中引用的组件

# 使用的插件
1. vue ui 中安装elementui，axios
2. npm install vue-particles --save-dev （各种登录页面的粒子特效）

# 待改进或编写
1. 登录页面感觉代码较为冗余
2. 登录页面前后端狡猾
3. UserHome的表格待完善，分页的功能需要测试
