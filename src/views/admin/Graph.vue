<template>
    <div>
        <div class="proCharts" ref='charts'>
        </div>

    </div>

</template>

<script>
import echarts from 'echarts'   //npm install echarts@4.9.0
export default {
    data() {
        return {

            option: {
                color: ['#271A3F', '#238D99'],
                title: {
                    text: ''
                },
                tooltip: { //提示框
                    trigger: 'axis',
                },
                legend: {//图例的类型
                    icon: 'roundRect',//图例icon图标
                    data: [
                        {
                            name: "上周",
                            textStyle: {
                                color: '#F8815F',
                                fontSize: 20,
                            }

                        }, {
                            name: "本周",
                            textStyle: {
                                color: '#F8815F',
                                fontSize: 20,
                            }
                        },
                    ],

                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '17%',
                    color: "#000000",
                    containLabel: true //grid区域是否包含坐标轴的刻度标签
                },
                xAxis: {
                    type: 'category', //坐标轴类型。
                    boundaryGap: false, //坐标轴两边留白策略

                    //修改一下data的绑定
                    data: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],

                    axisLabel: {//坐标轴刻度标签的相关设置
                        interval: 0,
                        textStyle: {
                            color: '#F8815F',
                            fontSize: 20
                        },
                    },
                    axisLine: {//坐标轴轴线相关设置
                        show: true,
                        lineStyle: {
                            color: '#FA653B'
                        }
                    },
                    axisTick: { //坐标轴刻度相关设置。
                        show: false,
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: { //x轴的坐标文字
                        show: true,
                        textStyle: {
                            fontSize: 20,
                            color: '#F8815F' //文字的颜色
                        },

                    },
                    max: 100,//最大值100
                    axisLine: {//坐标轴轴线相关设置
                        show: true,
                        lineStyle: {
                            color: '#FA653B'
                        }
                    },
                    axisTick: { //坐标轴刻度相关设置。
                        show: false,
                    },
                    splitLine: {  //坐标在grid区域的分割线
                        lineStyle: { //设置分割线的样式(图表横线颜色)
                            color: ['#F0679B']
                        }
                    }
                },
                series: [
                    {
                        name: '上周',
                        type: 'line',
                        data: [20, 10, 20, 30, 4, 5, 10, 80],
                        lineStyle: {
                            color: '#271A3F' //线的颜色
                        }
                    },
                    {
                        name: '本周',
                        type: 'line',
                        data: [10, 20, 30, 40, 10, 20, 30],
                        lineStyle: {
                            color: '#238D99' //线的颜色
                        }
                    }
                ]
            }
        }
    },
    created() {

    },
    mounted() {
        this.mycharts()
        window.addEventListener("resize", function () {
            myChart.resize()  // myChart 是实例对象
        })
    },
    methods: {
        mycharts() {
            let myChart = echarts.init(this.$refs.charts, "macarons");
            myChart.setOption(this.option)
            //图表自适应
            window.addEventListener("resize", function () {
                myChart.resize()  // myChart 是实例对象
            })
        }
    }
}
</script>

<style scoped>
.proCharts {
    margin-top: 100px;
    width: 100%;
    height: 400px;
    background: #ffede9;
}
</style>