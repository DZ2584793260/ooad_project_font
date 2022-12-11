# 目前代码主要是了解不同view和组件的结构
1. App.vue主要包含的是所有页面共同需要的东西，值得注意的是，背景处理上，虽然引用代码写在了各页面当中，但是样式定义在了App.vue中，防止代码重复。粒子特效的样式同样如此。
2. views中包含的是不同的页面
3. components中包含的是页面当中引用的组件

# 使用的插件
1. vue ui 中安装elementui，axios
2. npm install vue-particles --save-dev （各种登录页面的粒子特效）

# 前后端交互Api
1. 前端接口已经进行了封装
2. 登录页面交互完成
3. utils的request.js当中放了baseURL，主要用于后端IP地址发生改变的时候，我们不需要该很多交互的接口，只需要在其中改baseURL就可以
4. apis中的loginApi放的是类似与方法的API接口，包含了所有登录需要的API，后面可以模仿里面的写。需要的话，要重新建一个.js文件，存放比如说userHome或者订单管理的API使结构更清晰。

# 待改进或编写
页面间的传参
this.$router.push({ path: "/client/tableSelect", query: { hotelName: row.hotelName } });
另一个页面在methods中获得参数：var x=this.$route.query.hotelName;
但是使用此种方式参数拼接在URL上，能被看见，不安全，不过目前好像没有涉及安全性，暂时可以使用此种方式




