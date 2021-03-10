<template>
    <div>
        <table>
            <tr>
                <td>
                    <div class="shadow myborder" id="charts1" style="width:800px;height:600px;"></div>
                </td>
                <td>
                    <div class="shadow myborder" style="width:800px;height:600px;">

                        <div>
                            <el-table
                                    :data="tableData"
                                    border
                                    stripe
                                    height="600"
                                    style="width: 800px;border-radius :15px">
                                <el-table-column
                                        prop="id"
                                        label="编号"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="fw"
                                        label="服务"
                                        width="599">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </td>
            </tr>
        </table>


    </div>
</template>

<script>
    var a1 = [148, 332, 195, 398, 338, 355, 312, 314, 188, 245, 167, 162, 316, 383, 286, 389, 322, 278, 207, 247, 176, 209, 198, 267];
    var a2 = [193, 198, 182, 154, 188, 183, 185, 175, 93, 125, 143, 106, 192, 84, 183, 178, 112, 95, 176, 138, 166, 116, 88, 114];
    var echarts = require('echarts');
    export default {
        name: "jscx3",
        data() {
            return {
                tableData: [{
                    id: '1',
                    fw: '1号增值服务',
                }, {
                    id: '2',
                    fw: '2号增值服务',
                }, {
                    id: '3',
                    fw: '3号增值服务',
                }, {
                    id: '4',
                    fw: '4号增值服务',
                }, {
                    id: '5',
                    fw: '5号增值服务',
                }, {
                    id: '6',
                    fw: '7号增值服务',
                }, {
                    id: '7',
                    fw: '7号增值服务',
                }, {
                    id: '8',
                    fw: '8号增值服务',
                }, {
                    id: '9',
                    fw: '9号增值服务',
                }, {
                    id: '10',
                    fw: '10号增值服务',
                }, {
                  id: '11',
                  fw: '11号增值服务',
                }, {
                  id: '12',
                  fw: '12号增值服务',
                }]
            }
        },
        mounted() {
            var myChart1 = echarts.init(document.getElementById('charts1'), 'light');
            myChart1.setOption({
                title: {
                    x: 'center',
                    text: '居民用户：负荷用电的费用和新能源并网收益'
                },
                tooltip: {
                    trigger: 'axis'
                },

                xAxis: {
                    type: 'category',
                    data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
                },
                yAxis: {
                    name: '费用与收益（元）',
                    type: 'value',
                    max: 1000,
                    min: 0,
                    splitNumber: 10,
                    axisLine: {show: false},
                    axisTick: {show: false},
                },

                series: [
                    {

                        name: '负荷用电的费用',

                        data: a1,

                        type: 'line',
                        symbol: 'circle',

                    }, {

                        name: '新能源并网收益',

                        data: a2,

                        type: 'line',
                        symbol: 'circle',

                    }]

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
