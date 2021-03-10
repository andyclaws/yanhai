<template>
  <div class="singleLineSvg">
    <svg width="3700" height="3300" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      style="background: black;">
      <g id="map"></g>
    </svg>
    <Modal v-model="modal" :transition-names='transitionName' footer-hide width="950" class="modal">
      <p slot="header">
        <span>电压损失法计算流程</span>
      </p>
      <div class="content">
        <svg width="350" height="420" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background: black;">
          <g class="svg-left">
            <circle cx="50" cy="80" r="15" stroke="#ff0000" class="publicSub"></circle>
            <circle cx="50" cy="95" r="15" stroke="#ff0000" class="publicSub"></circle>
            <line x1="50" y1="50" x2="50" y2="200" style="stroke: red;stroke-width:1"/>
            <rect x="40" y="130" width="22" height="35" style="fill:#ff0000;stroke:#ff0000;stroke-width:1;"/>
            <line x1="50" y1="200" x2="180" y2="200" style="stroke: red;stroke-width:1"/>
            <rect x="80" y="190" width="35" height="22" style="fill:#ff0000;stroke:#ff0000;stroke-width:1;"/>
            <line x1="180" y1="200" x2="180" y2="310" style="stroke: red;stroke-width:1"/>
            <rect x="170" y="220" width="22" height="35" style="fill:#ff0000;stroke:#ff0000;stroke-width:1;"/>
            <line x1="180" y1="310" x2="250" y2="310" style="stroke: red;stroke-width:1"/>
            <rect x="200" y="300" width="35" height="22" style="fill:#ff0000;stroke:#ff0000;stroke-width:1;"/>
            <rect x="250" y="295" width="30" height="30" style="fill:#ff0000;stroke:#ff0000;stroke-width:1;" class="box"/>
            <text x="260" y="315" stroke="#fff" lengthAdjust="spacing" style="font-size: 10pt; font-weight: normal; font-family: YouYUan;" class="box">{{is_hplc}}</text>
            <text x="290" y="315" stroke="#fff" lengthAdjust="spacing" style="font-size: 10pt; font-weight: normal; font-family: YouYUan;" class="user">{{meter.cis_cons_name}}</text>
          </g>
        </svg>
        <div class="step-one" v-show="stepOne">
          <svg width="200" height="420" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background: black;">
            <g class="svg-right">
              <circle cx="50" cy="80" r="15" stroke="#fff"></circle>
              <circle cx="50" cy="95" r="15" stroke="#fff"></circle>
              <line x1="50" y1="110" x2="50" y2="160" stroke="#fff"></line>
              <circle cx="50" cy="165" r="5" stroke="#999" fill="#999"></circle>
              <line x1="50" y1="170" x2="50" y2="220" stroke="#fff"></line>
              <circle cx="50" cy="225" r="5" stroke="#999" fill="#999"></circle>
              <line x1="50" y1="230" x2="50" y2="280" stroke="#fff"></line>
              <line x1="45" y1="275" x2="50" y2="280" stroke="#fff"></line>
              <line x1="55" y1="275" x2="50" y2="280" stroke="#fff"></line>
              <rect x="20" y="280" width="60" height="30" style="fill:#000000;stroke:#fff;stroke-width:1;"/>
              <text x="30" y="300" stroke="#fff" lengthAdjust="spacing" style="font-size: 10pt; font-weight: normal; font-family: YouYUan;">{{meter.cis_cons_name}}</text>
              <text x="20" y="150" stroke="#fff" lengthAdjust="spacing" style="font-size: 15pt; font-weight: normal; font-family: YouYUan;">I</text>
              <text x="28" y="150" stroke="#fff" lengthAdjust="spacing" style="font-size: 10pt; font-weight: normal; font-family: YouYUan;">1</text>
              <text x="20" y="200" stroke="#fff" lengthAdjust="spacing" style="font-size: 15pt; font-weight: normal; font-family: YouYUan;">I</text>
              <text x="28" y="200" stroke="#fff" lengthAdjust="spacing" style="font-size: 10pt; font-weight: normal; font-family: YouYUan;">2</text>
              <text x="20" y="250" stroke="#fff" lengthAdjust="spacing" style="font-size: 15pt; font-weight: normal; font-family: YouYUan;">I</text>
              <text x="28" y="250" stroke="#fff" lengthAdjust="spacing" style="font-size: 10pt; font-weight: normal; font-family: YouYUan;">3</text>
              <text x="60" y="150" stroke="#fff" lengthAdjust="spacing" style="font-size: 15pt; font-weight: normal; font-family: YouYUan;">dU</text>
              <text x="90" y="150" stroke="#fff" lengthAdjust="spacing" style="font-size: 10pt; font-weight: normal; font-family: YouYUan;">1</text>
              <text x="60" y="200" stroke="#fff" lengthAdjust="spacing" style="font-size: 15pt; font-weight: normal; font-family: YouYUan;">dU</text>
              <text x="90" y="200" stroke="#fff" lengthAdjust="spacing" style="font-size: 10pt; font-weight: normal; font-family: YouYUan;">2</text>
              <text x="60" y="250" stroke="#fff" lengthAdjust="spacing" style="font-size: 15pt; font-weight: normal; font-family: YouYUan;">dU</text>
              <text x="90" y="250" stroke="#fff" lengthAdjust="spacing" style="font-size: 10pt; font-weight: normal; font-family: YouYUan;">3</text>
              <text x="80" y="100" stroke="#fff" lengthAdjust="spacing" style="font-size: 15pt; font-weight: normal; font-family: YouYUan;">U</text>
              <text x="100" y="100" stroke="#fff" lengthAdjust="spacing" style="font-size: 10pt; font-weight: normal; font-family: YouYUan;">trans</text>
              <text x="90" y="300" stroke="#fff" lengthAdjust="spacing" style="font-size: 15pt; font-weight: normal; font-family: YouYUan;">U</text>
              <text x="110" y="300" stroke="#fff" lengthAdjust="spacing" style="font-size: 10pt; font-weight: normal; font-family: YouYUan;">meter</text>
            </g>
          </svg>
          <div>
            <img src="./static/images/step1.png">
          </div>
        </div>
        <div class="step-two" v-show="stepTwo" style="width: 600px;padding-left: 10px;">
          <div class="row-1">
            <div style="padding-top: 10px;">
              <img src="./static/images/NeutralLine1.png" >
            </div>
            <div style="padding-top: 17px;">
              <img src="./static/images/NeutralLine2.png" >
            </div>
            <div style="padding-top: 15px;">
              <img src="./static/images/NeutralLine3.png" >
            </div>
          </div>
          <div>
            <img src="./static/images/NeutralLine4.png" >
          </div>
          <div>
            <img src="./static/images/NeutralLine5.png" >
          </div>
        </div>
        <div class="step-three" v-show="stepThree">
          <img src="./static/images/step3.png" class="img-3">
        </div>
        <div class="step-four" v-show="stepFour">
          <img src="./static/images/step4.png" class="img-4">
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'
export default {
  data () {
    return {
      modal: false,
      transitionName: ['slide-right', 'slide-right'],
      meter: {},
      is_hplc: '',
      stepOne: true,
      stepTwo: false,
      stepThree: false,
      stepFour: false
    }
  },
  methods: {
    initLoad () {
      // $.ajax({
      // url: 'http://localhost:9999/sea-svg/lowVoltSvgController/query',
      // data: { 'terminalAddr': '340960413', statDate: '20190517' },
      // dataType: 'json',
      // success: function (result) {
      var result = require('./static/utils/test.json')
      // var POLE_DIAMETER = 10// 电线杆半径长度
      var SWITCH_HEIGHT = 22// 开关高度||
      var SWITCH_WIDTH = 35// 开关宽度||
      var TRIANGLE_SIDE = 30// 专变三角形边长||
      var TRIANGLE_LINE_LENGTH = 50// 专变线段长度
      var PUBLICSUB_DIAMETER = 30// 公变圆形的直径||
      var PUBLICSUB_LINE_LENGTH = 30// 公变线段长度
      // var BUSBAR_HLINE_LENGTH = 32 // 熔断器横线长度
      // var BUSBAR_VLINE_LENGTH = BUSBAR_HLINE_LENGTH / 4// 熔断器竖线长度
      // var BUSBAR_SPACE = 4// 熔断器竖线与矩形的间距
      // var BUSBAR_LESS = 2// 熔断器竖线的长度与矩形高的差
      // var BUSBARANDPUBLICSUB_LENGTH = 25// 母线和公变组合 杆与母线之间线段长度
      // var BUSBARANDPUBLICSUB_SPACE = 3// 母线和公变组合 母线与线路的间距
      // var BUSBARANDSPECIALSUB_LENGTH = 25// 母线和专变组合 杆与母线之间线段长度
      // var BUSBARANDSPECIALSUB_SPACE = 3// 母线和专变组合 母线与线路的间距
      // var CCONS_SPACE = 50// 用户间距
      var LEFT_TO_RIGHT = 0// ||
      var TOP_TO_BOTTOM = 2// ||
      var Map = function (id) {
        return Snap(id)
      }
      // 文本
      Map.Text = function (map, x, y, txt, color, className, meter) {
        var t = map.text(x, y, txt)
        if (typeof (color) !== 'undefined' && color !== null) {
          t.attr({ stroke: color })
        } else {
          t.attr({ stroke: 'white' })
        }
        t.attr({
          'font-size': '10pt',
          'font-weight': 'normal',
          'font-family': 'YouYuan',
          lengthAdjust: 'spacing',
          class: className,
          meter: meter
        })
      }
      Map.LegendText = function (map, x, y, txt, c, className) {
        var color = 'red'
        if (typeof (c) !== 'undefined' && c !== null) {
          color = c
        }
        var t = map.text(x, y, txt)
        t.attr({
          stroke: color,
          'font-size': '10pt',
          'font-weight': 'normal',
          'font-family': 'YouYuan',
          lengthAdjust: 'spacing',
          class: `${className}`
        })
      }
      Map.VerticalText = function (map, x, y, txt) {
        var t = map.text(x, y, txt)
        t.attr({
          stroke: 'white',
          'font-size': '10pt',
          'font-weight': 'normal',
          'font-family': 'YouYuan',
          'writing-mode': 'tb',
          'glyph-orientation-vertical': '0'
        })
      }
      // 低压线路
      Map.Line = function (m, x1, y1, x2, y2, c, className) {
        var color = 'red'
        if (typeof (c) !== 'undefined' && c !== null) {
          color = c
        }
        var l = m.line(x1, y1, x2, y2)
        l.attr({ stroke: color, 'stroke-width': 1, class: className })
      }
      // 开关
      Map.Switch = function (m, x, y, direction) {
        var color = 'red'
        if (typeof (direction) === 'undefined' || direction === null || direction === LEFT_TO_RIGHT) {
          let r = m.rect(x, y - SWITCH_HEIGHT / 2, SWITCH_WIDTH, SWITCH_HEIGHT)
          r.attr({ stroke: color, fill: color })
        } else if (direction === TOP_TO_BOTTOM) {
          let r = m.rect(x - SWITCH_HEIGHT / 2, y, SWITCH_HEIGHT, SWITCH_WIDTH)
          r.attr({ stroke: color, fill: color })
        }
      }
      Map.MeterSwitch = function (m, x, y, direction) {
        var color = 'red'
        if (typeof (direction) === 'undefined' || direction === null || direction === LEFT_TO_RIGHT) {
          let r = m.rect(x, y - SWITCH_HEIGHT / 2, SWITCH_WIDTH, SWITCH_HEIGHT)
          r.attr({ stroke: color, fill: 'black' })
        } else if (direction === TOP_TO_BOTTOM) {
          let r = m.rect(x - SWITCH_HEIGHT / 2, y, SWITCH_HEIGHT, SWITCH_WIDTH)
          r.attr({ stroke: color, fill: 'black' })
        }
      }
      Map.LegendSwitch = function (m, x, y, direction, c) {
        var color = 'red'
        if (typeof (c) !== 'undefined' && c !== null) {
          color = c
        }
        if (typeof (direction) === 'undefined' || direction === null || direction === LEFT_TO_RIGHT) {
          let r = m.rect(x, y - 16 / 2, 16, 16)
          r.attr({ stroke: 'red', fill: color })
        } else if (direction === TOP_TO_BOTTOM) {
          let r = m.rect(x - 16 / 2, y, 16, 16)
          r.attr({ stroke: 'red', fill: color })
        }
      }
      // 箱子
      Map.Box = function (m, x, y, width, height, c1, c2, className) {
        var color1 = 'red'
        if (typeof (c1) !== 'undefined' && c1 !== null) {
          color1 = c1
        }
        var color2 = 'red'
        if (typeof (c2) !== 'undefined' && c2 !== null) {
          color2 = c2
        }
        var r = m.rect(x, y, width, height)
        r.attr({ stroke: color1, fill: color2, class: className })
        return r
      }
      // 专变三角形
      Map.Triangle = function (m, x, y, c) {
        var color = 'red'
        if (typeof (c) !== 'undefined' && c !== null) {
          color = c
        }
        var x1 = x
        var x2 = x - TRIANGLE_SIDE / 2
        var x3 = x + TRIANGLE_SIDE / 2
        var y1 = y - Math.sqrt(TRIANGLE_SIDE * TRIANGLE_SIDE * 3 / 4) * 2 / 3
        var y2 = y + Math.sqrt(TRIANGLE_SIDE * TRIANGLE_SIDE * 3 / 4) / 3
        var y3 = y + Math.sqrt(TRIANGLE_SIDE * TRIANGLE_SIDE * 3 / 4) / 3
        var t = m.polygon([x1, y1, x2, y2, x3, y3])
        t.attr({ stroke: color, fill: 'black' })
        return t
      }
      // 专变
      Map.SpecialSub = function (m, x, y, direction, c) {
        var color = 'red'
        if (typeof (c) !== 'undefined' && c !== null) {
          color = c
        }
        if (typeof (direction) === 'undefined' || direction === null || direction === LEFT_TO_RIGHT) {
          var t = this.Triangle(m, x + TRIANGLE_LINE_LENGTH, y, color)
          var r = m.rect(x + TRIANGLE_LINE_LENGTH - TRIANGLE_SIDE / 4 - 2, y + TRIANGLE_SIDE / 4, TRIANGLE_SIDE / 2 + 4, TRIANGLE_SIDE / 2 - 2)
          r.attr({ stroke: color, fill: 'none' })
          var sub = m.g(t, r)
        } else if (direction === TOP_TO_BOTTOM) {
          t = this.Triangle(m, x, y + TRIANGLE_LINE_LENGTH, color)
          r = m.rect(x - TRIANGLE_SIDE / 4 - 2, y + TRIANGLE_LINE_LENGTH + TRIANGLE_SIDE / 4, TRIANGLE_SIDE / 2 + 4, TRIANGLE_SIDE / 2 - 2)
          r.attr({ stroke: color, fill: 'black' })
          sub = m.g(t, r)
        }
      }
      // 公变
      Map.PublicSub = function (m, x, y, direction, c, className) {
        var color = 'red'
        if (typeof (c) !== 'undefined' && c !== null) {
          color = c
        }
        if (typeof (direction) === 'undefined' || direction === null || direction === LEFT_TO_RIGHT) {
          var c1 = m.circle(x + PUBLICSUB_LINE_LENGTH + PUBLICSUB_DIAMETER / 2, y, PUBLICSUB_DIAMETER / 2)
          c1.attr({ stroke: color, fill: 'black' })
          var c2 = m.circle(x + PUBLICSUB_LINE_LENGTH + PUBLICSUB_DIAMETER, y, PUBLICSUB_DIAMETER / 2)
          c2.attr({ stroke: color, fill: 'black' })
          var sub = m.g(c1, c2)
        } else if (direction === TOP_TO_BOTTOM) {
          c1 = m.circle(x, y + PUBLICSUB_LINE_LENGTH + PUBLICSUB_DIAMETER / 2, PUBLICSUB_DIAMETER / 2)
          c1.attr({ stroke: color, fill: 'black' })
          c2 = m.circle(x, y + PUBLICSUB_LINE_LENGTH + PUBLICSUB_DIAMETER, PUBLICSUB_DIAMETER / 2)
          c2.attr({ stroke: color, fill: 'black' })
          sub = m.g(c1, c2)
        }
        c1.attr({ class: className })
        c2.attr({ class: className })
      }

      var map = Map('#map')
      map.clear()
      var trans = result
      if (trans === null) {
        return
      }
      map.attr('width', trans.width < 1600 ? 1600 : trans.width)
      map.attr('height', trans.height < 900 ? 900 : trans.height)
      Map.Line(map, trans.startA.x, trans.startA.y, trans.endA1.x, trans.endA2.y, 'orange')
      Map.Line(map, trans.startB.x, trans.startB.y, trans.endB1.x, trans.endB2.y, 'green')
      Map.Line(map, trans.startC.x, trans.startC.y, trans.endC1.x, trans.endC2.y, 'red')
      // todo
      Map.Line(map, trans.startN.x, trans.startN.y, trans.endN1.x, trans.endN2.y, 'white')
      Map.Switch(map, trans.startB.x + 2, trans.endB1.y - 80, 2)
      Map.PublicSub(map, trans.startB.x, trans.startB.y, 2, 'red')
      Map.Text(map, trans.startB.x + 30, trans.startB.y + 50, '变压器名称：' + trans.tran_equip_name)
      Map.Text(map, trans.startB.x + 30, trans.startB.y + 70, '台区名称：' + trans.cis_tg_name)
      Map.Text(map, trans.startB.x + 30, trans.startB.y + 90, '终端地址：' + trans.terminal_addr)
      for (let i = 0; i < trans.switches.length; i++) {
        var swi = trans.switches[i]
        Map.Line(map, swi.startA.x, swi.startA.y, swi.endA.x, swi.endA.y, 'orange')
        Map.Line(map, swi.startB.x, swi.startB.y, swi.endB.x, swi.endB.y, 'green')
        Map.Line(map, swi.startC.x, swi.startC.y, swi.endC.x, swi.endC.y, 'red')
        // todo
        Map.Line(map, swi.startN.x, swi.startN.y, swi.endN.x, swi.endN.y, 'white')
        Map.Switch(map, swi.startB.x + 30, swi.startB.y + 2, 0)
        Map.VerticalText(map, swi.start.x - 25, swi.start.y + 5, swi.switch_id + '号开关柜')
        for (let j = 0; j < swi.meases.length; j++) {
          var meas = swi.meases[j]
          var a = Map.Box(map, meas.start.x, meas.start.y, meas.width, meas.height, 'red', 'black')
          Map.Line(map, meas.startA.x, meas.startA.y, meas.endA.x, meas.endA.y, 'orange')
          Map.Line(map, meas.startB.x, meas.startB.y, meas.endB.x, meas.endB.y, 'green')
          Map.Line(map, meas.startC.x, meas.startC.y, meas.endC.x, meas.endC.y, 'red')
          // todo
          Map.Line(map, meas.startN.x, meas.startN.y, meas.endN.x, meas.endN.y, 'white')
          Map.Switch(map, meas.startB.x + 2, meas.startB.y + 30, 2)
          var meas_state_off = 0
          var meas_state_onoff = 0
          for (let k = 0; k < meas.meters.length; k++) {
            var meter = meas.meters[k]
            Map.Line(map, meter.startA.x, meter.startA.y, meter.endA.x, meter.endA.y, 'orange')
            Map.Line(map, meter.startB.x, meter.startB.y, meter.endB.x, meter.endB.y, 'green')
            Map.Line(map, meter.startC.x, meter.startC.y, meter.endC.x, meter.endC.y, 'red')
            Map.Line(map, meter.startN.x, meter.startN.y, meter.endN.x, meter.endN.y, 'white')
            Map.Box(map, meter.start.x, meter.start.y, meter.width, meter.height, 'red', meter.color)
            if (meter.is_hplc === null || meter.is_hplc === 'null') {
              Map.Text(map, meter.start.x + 10, meter.start.y + 20, 'U', 'white', 'box')
            } else if (meter.is_hplc === '01') {
              Map.Text(map, meter.start.x + 10, meter.start.y + 20, 'H', 'white', 'box')
            } else {
              Map.Text(map, meter.start.x + 10, meter.start.y + 20, 'C', 'white', 'box')
            }
            if (meter.color === 'green') {
              meas_state_off++
            } else if (meter.color === 'orange') {
              meas_state_onoff++
            }
            let meterJson = JSON.stringify(meter)
            Map.Text(map, meter.start.x + meter.width + 3, meter.start.y + 15, meter.cis_cons_name, 'white', 'user', meterJson)// +'，'+meter.elec_addr
            Map.Switch(map, meter.start.x - 40, meter.start.y + meter.height / 2, 0)
          }
          if (meas_state_off !== 0) {
            Map.LegendSwitch(map, meas.start.x + 35, meas.start.y - 22, 2, 'green')
            Map.Text(map, meas.start.x + 30 + 20, meas.start.y - 10, '表箱id：' + meas.meas_id) // + '正在发生停电'
            a.addClass('box')
          } else if (meas_state_onoff !== 0) {
            Map.LegendSwitch(map, meas.start.x + 35, meas.start.y - 22, 2, 'orange')
            Map.Text(map, meas.start.x + 30 + 20, meas.start.y - 10, '表箱id：' + meas.meas_id) // + '已复电'
          } else {
            Map.LegendSwitch(map, meas.start.x + 35, meas.start.y - 22, 2, 'red')
            Map.Text(map, meas.start.x + 30 + 20, meas.start.y - 10, '表箱id：' + meas.meas_id)
          }
        }
      }
      // 图例
      var legend = map.rect(trans.start.x + 300 + 100, trans.start.y, 50, 170)
      legend.attr({ stroke: 'red', fill: 'none' })
      Map.Text(map, trans.start.x + 310 + 100, trans.start.y + 20, '图例:')

      var legend2 = map.rect(trans.start.x + 350 + 100, trans.start.y, 150, 80)
      legend2.attr({ stroke: 'red', fill: 'none' })
      Map.LegendText(map, trans.start.x + 400 + 100, trans.start.y + 20, '未停电', 'red')
      Map.LegendSwitch(map, trans.start.x + 375 + 100, trans.start.y + 8, 2, 'red')
      Map.LegendText(map, trans.start.x + 400 + 100, trans.start.y + 40, '停电后复电', 'orange')
      Map.LegendSwitch(map, trans.start.x + 375 + 100, trans.start.y + 28, 2, 'orange')
      Map.LegendText(map, trans.start.x + 400 + 100, trans.start.y + 60, '实时停电', 'green')
      Map.LegendSwitch(map, trans.start.x + 375 + 100, trans.start.y + 48, 2, 'green')

      var legend3 = map.rect(trans.start.x + 350 + 100, trans.start.y + 80, 150, 90)
      legend3.attr({ stroke: 'red', fill: 'none' })
      // A
      Map.LegendText(map, trans.start.x + 400 + 100, trans.start.y + 100, 'A相', 'orange')
      Map.Line(map, trans.start.x + 360 + 100, trans.start.y + 95, trans.start.x + 390 + 100, trans.start.y + 95, 'orange')
      Map.LegendText(map, trans.start.x + 400 + 100, trans.start.y + 120, 'B相', 'green')
      Map.Line(map, trans.start.x + 360 + 100, trans.start.y + 115, trans.start.x + 390 + 100, trans.start.y + 115, 'green')
      Map.LegendText(map, trans.start.x + 400 + 100, trans.start.y + 140, 'C相', 'red')
      Map.Line(map, trans.start.x + 360 + 100, trans.start.y + 135, trans.start.x + 390 + 100, trans.start.y + 135, 'red')
      Map.LegendText(map, trans.start.x + 400 + 100, trans.start.y + 160, '中性线', 'white')
      Map.Line(map, trans.start.x + 360 + 100, trans.start.y + 155, trans.start.x + 390 + 100, trans.start.y + 155, 'white')
      // }
      // })
      map = Snap('#map')

      var that = this
      // 鼠标进入用户
      $('.user').bind('mouseover', function () {
        $(this).attr('stroke', 'aqua')
      })
      // 鼠标离开用户
      $('.user').bind('mouseleave', function () {
        $(this).attr('stroke', '#fff')
      })
      // 点击用户
      $('.singleLineSvg .user').bind('click', function () {
        that.stepTwo = that.stepThree = that.stepFour = false
        that.stepOne = true
        $('.svg-left').css('opacity', '0')
        $('.step-one').css('opacity', '0')
        that.meter = JSON.parse($(this).attr('meter'))
        if (that.meter.is_hplc === null || that.meter.is_hplc === 'null') {
          that.is_hplc = 'U'
        } else if (meter.is_hplc === '01') {
          that.is_hplc = 'H'
        } else {
          that.is_hplc = 'C'
        }
        that.modal = true
        $('.svg-left,.step-one').stop()
        $('.svg-left').animate({ opacity: '1' }, 3000, 'linear', function () {
          that.stepOne = true
          $('.step-one').animate({ opacity: '1' }, 3000, 'linear', function () {

          })
        })
      })
      // 点击用户
      $('.modal .user').bind('click', function () {
        that.stepTwo = that.stepThree = that.stepFour = false
        that.stepOne = true
        $('.step-one').css('opacity', '0')
        $('.step-one').stop().animate({ opacity: '1' }, 3000, 'linear')
      })
      // 点击变压器
      $('.publicSub').bind('click', function () {
        that.stepOne = that.stepThree = that.stepFour = false
        that.stepTwo = true
        $('.step-two').css('opacity', '0')
        $('.step-two').stop().animate({ opacity: '1' }, 3000, 'linear')
      })
      // 点击表箱box
      $('.box').bind('click', function () {
        that.stepOne = that.stepTwo = that.stepFour = false
        that.stepThree = true
        $('.img-3').css('opacity', '0')
        $('.img-3,.img-4').stop()
        $('.img-3').animate({ opacity: '1' }, 3000, 'linear', function () {
          setTimeout(function () {
            $('.img-3').animate({ opacity: '0' }, 3000, 'linear', function () {
              that.stepThree = false
              that.stepFour = true
              $('.img-4').css('opacity', '0')
              $('.img-4').animate({ opacity: '1' }, 3000, 'linear')
            })
          }, 2000)
        })
      })
      //   }
      // })
    }
  },
  mounted () {
    this.initLoad()
  }
}
</script>
<style lang="less">
.modal{
  .ivu-modal-header{
    display: none;
  }
  .ivu-icon-ios-close{
    color: #999;
  }
  .ivu-icon-ios-close:hover{
    color: #999 !important;
  }
  .ivu-modal-body{
    height: 420px !important;
    padding: 0 !important;
    background-color: #000 !important;
    p{
      font-weight: 700;
      font-size: 16px;
    }
  }
  .row-1{
    display: flex;
    justify-content: space-between;
  }
  .content{
    display: flex;
    svg{
      vertical-align: bottom;
    }
    .svg-left{
      opacity: 0;
    }
    .step-one{
      width: 650px;
      display: flex;
      position: relative;
      img{
        height: 380px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%)
      }
    }
    .step-four,.step-three{
      width: 650px;
      position: relative;
      img{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
    }
  }
  .publicSub,.box,.user{
    cursor: pointer;
  }
}
.singleLineSvg{
  .user{
    cursor: pointer;
  }
}
</style>
