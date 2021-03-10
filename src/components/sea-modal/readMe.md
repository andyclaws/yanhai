## API sea-modal (线损高逼格弹框,领导喜欢)
#### props
属性 | 说明 | 类型 | 默认值 | 备注
---|---|---|---|---
width | 模态框宽度 | Number, String | '800px' | -
title | 一级大标题 | String | `` | 样式需要定义好
titleStyle | 标题样式 | String | '' | 标题样式 1 代表虚线
subTitle | 二级小标题 | String | `` | 样式需要定义好
dateType | 日期类型 | String | 'dateRange' | 日期类型 支持 date(日期选择) dateRange(日期段) month(查询时间范围为月)
date | 日期数据 | String | '2020-08-08' | -
dateRange | 日期段数据 | Array | ['2020-01-01', '2020-12-31'] | -
score | 得分情况 | String | '' | 得分情况 默认为空，为空为不显示
tabs | 菜单 | Array |  | `[{title: '趋势分析', name: 'trendAnalysis', pic: 'errorAnalysisPic',activePic: 'errorAnalysisActivePic', active: true},{title: '分析报告', name: 'analysisReport', pic: 'lineLoseAnalysisPic',activePic: 'lineLoseAnalysisActivePic'}]` pic activePic 可选 （errorAnalysisPic errorAnalysisActivePic lineLoseAnalysisPic lineLoseAnalysisActivePic）
showOrg | 是否显示供电单位 | Boolean | false | -
orgName | 供电单位名称 | String | '' | -

#### events

事件名 | 说明 | 返回值
---|---|---
change-date | 日期选择事件 | 已经格式化后的日期（String）
change-date-range | 日期范围选择事件 | 已经格式化后的日期(Array)
change-tab | tab切换事件 | 返回两个值，tab 以及 tab的name
select-org | 供电单位选择事件 | 返回供电单位相应数据
#### slot
slot的name与属性tabs的name相对应
