<template>
    <div>
        <table>
            <tr>
                <table>
                    <td>
                        <div class="shadow myborder" id="charts1" style="width:800px;height:400px;}"></div>
                    </td>
                    <td>
                        <div class="shadow myborder" id="charts3" style="width:800px;height:400px;}"></div>
                    </td>
                </table>
            </tr>
            <tr>
                <td width="1560px">
                    <div class="myborder shadow" id="charts2" style="width:1608px;height:400px;}"></div>
                </td>
            </tr>
        </table>


    </div>
</template>

<script>
    var a1 = [296, 272, 279, 295, 364, 452, 425, 458, 389, 407, 454, 452, 362, 257, 403, 408, 213, 225, 295, 382, 307, 209, 294, 244];
    var a2 = [119, 106, 118, 81, 95, 86, 111, 112, 92, 104, 94, 104, 81, 83, 111, 86, 118, 101, 86, 117, 109, 108, 95, 103];
    var a3 = [0.85, 0.78, 0.94, 0.85, 0.96, 0.80, 0.97, 0.75, 0.72, 0.93, 0.99, 0.92, 0.72, 0.97, 0.95, 0.74, 0.93, 0.96, 0.93, 0.88, 0.82, 0.80, 0.79, 0.77];
    var a4 = [193, 258, 287, 330, 170, 283, 127, 251, 211, 239, 343, 160, 224, 332, 256, 247, 278, 173, 313, 217, 330, 226, 248, 165]
    var echarts = require('echarts');
    export default {
        name: "jscx2",
        mounted() {
            var myChart1 = echarts.init(document.getElementById('charts1'), 'light');
            var myChart2 = echarts.init(document.getElementById('charts2'), 'light');
            var myChart3 = echarts.init(document.getElementById('charts3'), 'light');
            myChart1.setOption({

                title: {
                    x: 'center',
                    text: '工业用户：电负荷功率曲线'
                },
                tooltip: {
                    trigger: 'axis'
                },

                xAxis: {
                    type: 'category',
                    data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
                },
                yAxis: {
                    name: '功率（kW）',
                    type: 'value',
                    max: 1000,
                    min: 0,
                    splitNumber: 10,
                    axisLine: {show: false},
                    axisTick: {show: false},
                },

                series:
                    {

                        name: '功率',

                        data: a1,

                        type: 'line',
                        symbol: 'circle',

                    }


            })
            myChart2.setOption({

                title: {
                    x: 'center',
                    text: '工业用户:新能源消纳及利用率'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    x: 'center',
                    y: 'bottom',

                    data: ['消纳', '利用率']
                },
                xAxis: {
                    type: 'category',
                    data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
                },
                yAxis: [{
                    name: '消纳（kWh）',
                    type: 'value',
                    max: 500,
                    min: 0,
                    splitNumber: 5,
                    axisLine: {show: false},
                    axisTick: {show: false},
                },
                    {
                        name: '利用率',
                        type: 'value',
                        max: 1,
                        min: 0,

                        splitLine: {show: false},
                        axisLine: {show: false},
                        axisTick: {show: false},
                    }],
                series: [
                    {

                        name: '消纳',
                        yAxisIndex: 0,

                        data: a2,

                        type: 'bar',


                    },
                    {

                        name: '利用率',
                        yAxisIndex: 1,
                        data: a3,
                        type: 'line', symbol: 'circle',
                    },

                ]
            })
            myChart3.setOption({

                title: {
                    x: 'center',
                    text: '工业用户：储能情况'
                },
                tooltip: {
                    trigger: 'axis'
                },

                xAxis: {
                    type: 'category',
                    data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
                },
                yAxis: {
                    name: '储能（kWh）',
                    type: 'value',
                    max: 1000,
                    min: 0,
                    splitNumber: 10,
                    axisLine: {show: false},
                    axisTick: {show: false},
                },

                series:
                    {

                        name: '储能',

                        data: a4,

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
