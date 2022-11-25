<template>
    <div class="show_picture">
        <!--动态将图片轮播图的容器高度设置成与图片一致-->
        <el-carousel :height="bannerHeight + 'px'">
            <!--遍历图片地址,动态生成轮播图-->
            <el-carousel-item v-for="item in img_list_1" :key="item">
                <img :src="item" alt />
            </el-carousel-item>
        </el-carousel>

        <el-carousel class="card_picture" :interval="4000" type="card" height="400px">
            <el-carousel-item v-for="item in img_list_2" :key="item">
                <img :src="item" alt />
            </el-carousel-item>
        </el-carousel>
    </div>

</template>
<script>
export default {
    name: "Information",
    data() {
        var img = require("../assets/test.png");
        var duola = require("../assets/duola.png")
        return {
            img_list_1: [img, img, img, img],
            img_list_2: [duola, duola, duola, duola],
            // 图片父容器高度
            bannerHeight: window.innerHeight,
            // 浏览器宽度
            screenWidth: window.innerWidth
        };
    },

    mounted() {
        // 首次加载时,需要调用一次
        this.screenWidth = window.innerWidth;
        this.bannerHeight = window.innerHeight;

        // 窗口大小发生改变时,调用一次
        window.onresize = () => {
            this.screenWidth = window.innerWidth;
            this.bannerHeight = window.innerHeight;

        };
    }
};
</script>
   
<style scoped>
img {
    /*设置图片宽度和浏览器宽度一致*/
    width: 100%;
    /* 和父组件el-carousel高度一致 */
    height: inherit;
}

.card_picture {
    width: 70%;
    margin: auto;
    position: relative;
}
</style>
    