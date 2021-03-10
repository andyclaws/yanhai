## API sea-line-lose-analysis (线损分析框)
#### props
属性 | 说明 | 类型 | 默认值 | 备注
---|---|---|---|---
tabs | 菜单 | Array |  | `[{ title: '采集覆盖率', name: 'coverRate', pic: 'coverRatePic', isWarn: false, data: '100%', popTip: '建议1' }]` `pic 可选项 coverRatePic successRatePic measurementAbnormalPic powerAbnormalPic zeroElectricityPic`

#### events

事件名 | 说明 | 返回值
---|---|---
change-tab | tab切换事件 | 返回两个值，tab 以及 tab的name
#### slot
slot的name与属性tabs的name相对应
