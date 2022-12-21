<!-- 消息通知页面 -->
<template>
    <div class="messageNotif">
        <div class="message">
            <vue-scroll :ops="ops" ref="scroll">
                <el-timeline>
                    <el-timeline-item v-for="(activity, index) in activities" :key="index"
                        :timestamp="activity.timestamp" placement="top" color="#78c0ff">
                        <el-card>
                            {{ activity.content }}
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </vue-scroll>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activities: [{
                content: '支持使用图标',
                timestamp: '2018-04-12 20:46',
                size: 'large',
                type: 'warning',
                icon: 'el-icon-more'
            }, {
                content: '支持自定义颜色',
                timestamp: '2018-04-03 20:46',
                color: '#0bbd87'
            }, {
                content: '支持自定义尺寸',
                timestamp: '2018-04-03 20:46',
                size: 'large'
            }, {
                content: '默认样式的节点',
                timestamp: '2018-04-03 20:46'
            }]
            // activities: []
        };
    },
    mounted() {

    },
};
</script>
<style scoped>
.messageNotif {
    margin-top: 40px;
    margin-left: 20%;
    margin-right: 20%;
    border-radius: 10px;
    border: 1px solid #cfd6dc;
    box-shadow: 0 0 25px #909399;
    background-color: rgba(255, 255, 255, 0.6);
}

.message {
    margin: 20px;
}
</style>