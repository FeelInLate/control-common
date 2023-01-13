<template>
    <div>
        <el-row>
            <el-col :span="8">

                <el-card class="box-card" shadow="hover">
                    <div class="user">
                        <img src="../assets/logo.png" alt=""></img>
                        <div class="userinfo">
                            <p class="name">Admin</p>
                            <p class="access">超级管理员</p>
                        </div>
                    </div>
                    <div class="login-info">
                        <p>上次登录时间：<span>2021-7-19</span></p>
                        <p>上次登录地点：<span>武汉</span></p>
                    </div>
                </el-card>

                <el-card shadow="hover" style="margin-top:20px; height:424px;">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column v-for="(val, key) in tableLable" :prop="key" :label="val" />
                    </el-table>
                </el-card>
            </el-col>

            <el-col :span="16" style="padding-left: 20px">
                <div class="num">
                    <el-card shadow="hover" v-for="item in countData" :key="item.name"
                        :body-style="{ display: 'flex', padding: 0 }">
                        <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                        <div class="detail">
                            <p class="price">￥{{ item.value }}</p>
                            <P class="desc">{{ item.name }}</P>
                        </div>
                    </el-card>
                </div>

                <el-card style="height: 280px" shadow="hover">
                    <!-- 折线图 -->
                    <div ref="echart1" style="height:280px">
                    </div>
                </el-card>
                <div class="graph">
                    <el-card shadow="hover" style="height: 260px">
                        <div ref="echart2" style="height: 260px"></div>
                    </el-card>
                    <el-card shadow="hover" style="height: 260px">
                        <div ref="echart3" style="height: 200px"></div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { getData } from '../api'
import * as echarts from 'echarts';
export default {
    data() {
        return {
            countData: [
                {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
                {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                }
            ],
            tableData: [],
            tableLable: {
                name: '名字',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买'
            }
        };
    },
    mounted() {
        getData().then((data) => {
            //处理数据
            const { orderData, tableData, userData, videoData } = data.data.data//解构赋值
            console.log(data);
            this.tableData = tableData

            // 基于准备好的dom,初始化echarts实例
            const echart1 = echarts.init(this.$refs.echart1);
            // 绘制图表
            var echart1Option = {}
            const xAxis1 = Object.keys(orderData.data[0])
            echart1Option.xAxis = {
                data: xAxis1
            }
            echart1Option.yAxis = {}
            echart1Option.legend = {
                data: xAxis1
            }
            echart1Option.series = []
            xAxis1.forEach(key => {
                echart1Option.series.push({
                    name: key,
                    data: orderData.data.map(item => item[key]),
                    type: 'line'
                })
            })
            // 使用刚指定的配置项和数据显示图表。
            echart1.setOption(echart1Option);

            // 柱状图
            // 基于准备好的dom，初始化echarts实例
            var echart2 = echarts.init(this.$refs.echart2)

            var echart2Option = {
                legend: {
                    // 图例文字颜色
                    textStyle: {
                        color: "#333",
                    },
                },
                grid: {
                    left: "20%",
                },
                // 提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category", // 类目轴
                    data: userData.map(item => item.date),
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        color: "#333",
                    },
                },
                yAxis: [
                    {
                        type: "value",
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                        },
                    },
                ],
                color: ["#2ec7c9", "#b6a2de"],
                series: [
                    {
                        name: '新增用户',
                        data: userData.map(item => item.new),
                        type: 'bar'
                    },
                    {
                        name: '活跃用户',
                        data: userData.map(item => item.active),
                        type: 'bar'
                    }
                ]
            }
            echart2.setOption(echart2Option)
            // 饼状图
            var echart3 = echarts.init(this.$refs.echart3)

            var echart3Option = {
                tooltip: {
                    trigger: "item",
                },
                color: [
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series: [
                    {
                        type: 'pie',
                        data: videoData
                    }
                ]
            }
            echart3.setOption(echart3Option)
        })

    }
};
</script>
<style lang="less" scoped>
.user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;

    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .userinfo {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .access {
            color: #999999;
        }
    }
}

.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;

        span {
            color: #666666;
            margin-left: 60px;
        }
    }

}

.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
    }

    .detail {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .price {
            font-size: 20px;
            margin-bottom: 0px;
            line-height: 20px;
        }

        .desc {
            font-size: 10px;
            color: #999;
            text-align: center;
        }
    }

    .el-card {
        width: 32%;
        margin-bottom: 20px;
    }
}

.graph {
    display: flex;
    justify-content: space-between;
    padding-top: 15px;

    .el-card {
        width: 48%;
    }
}
</style>
