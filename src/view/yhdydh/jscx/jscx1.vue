<template>
    <div>
        <table>
            <tr>
                <td>
                    <div class="shadow myborder" id="charts1" style="width:800px;height:600px;}"></div>
                </td>
                <td>
                    <div class="myborder shadow" id="charts2" style="width:800px;height:600px;}"></div>
                </td>
            </tr>
        </table>


    </div>
</template>

<script>
    var a1 = [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 0.8, 0.8, 0.8];
    var a2 = [23, 45, 34, 54, 190, 225, 267, 356, 434, 526, 454, 483, 475, 427, 421, 367, 374, 332, 252, 152, 111, 78, 20];
    var a3 = [18.4, 36, 27.2, 43.2, 152, 180, 213.6, 284.8, 477.4, 578.6, 499.4, 531.3, 522.5, 447.7, 463.1, 403.7, 411.4, 365.2, 277.2, 167.2, 88.8, 62.4, 16];
    var echarts = require('echarts');
    export default {
        name: "jscx",
        mounted() {
            var myChart1 = echarts.init(document.getElementById('charts1'),'light');
            var myChart2 = echarts.init(document.getElementById('charts2'),'light');
            myChart1.setOption({

                title: {
                    x: 'center',
                    text: '供能商:售电价格与售能量'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    x: 'center',
                    y: 'bottom',

                    data: ['售电价格', '售能量']
                },
                xAxis: {
                    type: 'category',
                    data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
                },
                yAxis: [{
                    name: '售电价格（元/kWh）',
                    type: 'value',
                    max: 5,
                    min: 0,
                    splitNumber: 5,
                    axisLine: {show: false},
                    axisTick: {show: false},
                },
                    {
                        name: '售能量（kWh）',
                        type: 'value',
                        max: 1000,
                        min: 0,

                        splitLine: {show: false},
                        axisLine: {show: false},
                        axisTick: {show: false},
                    }],
                series: [
                    {

                        name: '售电价格',
                        yAxisIndex: 0,

                        data: a1,

                        type: 'bar',


                    },
                    {

                        name: '售能量',
                        yAxisIndex: 1,
                        data: a2,
                        type: 'line', symbol: 'circle',
                    },

                ]
            }) ,
                myChart2.setOption({

                    title: {
                        x: 'center',
                        text: '供能商：收益'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },

                    xAxis: {
                        type: 'category',
                        data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
                    },
                    yAxis: {
                        name: '收益（元）',
                        type: 'value',
                        max: 1000,
                        min: 0,
                        splitNumber: 10,
                        axisLine: {show: false},
                        axisTick: {show: false},
                    },

                    series:
                        {

                            name: '收益',

                            data: a3,

                            type: 'line',
                            symbol: 'circle',

                        }


                })
        }
    }
</script>

<style scoped>
    .myborder {
        border: 1px solid #ccc;
        border-radius: 15px;
    }

    .shadow:hover {
        -webkit-box-shadow: #ccc 0px 4px 4px;
        -moz-box-shadow: #ccc 0px 4px 4px;
        box-shadow: #ccc 0px 4px 4px;
    }
</style>
