<template>
  <div>

    <div v-if="searchable && searchPlace === 'top'" class="search-con search-con-top" style="float: right">
      <Select v-model="searchKey" class="search-col">
        <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">
          {{ item.title }}
        </Option>
      </Select>
      <Input  @on-change="handleClear" clearable :placeholder="$t('searchByKeyWords')" class="search-input"
             v-model="searchValue"/>
      <ul>
        <li v-for="item in inputList" :key="item.consNo" @click="changeInput(item)">
          {{item.consName}}-{{item.consNo}}
        </li>
      </ul>
<!--      <Select v-model="searchValue" clearable style="width:100px" @on-change="handleClear" clearable class="search-input">-->
<!--        <Option v-for="item in inputList" :value="item.consName" :key="item.consNo">{{ item.consName }}-{{item.consNo}}</Option>-->
<!--      </Select>-->
      <Button @click="handleSearch" class="search-btn" type="primary">
        <Icon type="search"/>&nbsp;&nbsp;{{$t('search')}}
      </Button>
    </div>

    <div style="clear: both"></div>
    <div class="w-table">
      <Table ref="tablesMain"
             :id="id"
             :data="insideTableData"
             :columns="insideColumns"
             :stripe="stripe"
             :border="border"
             :show-header="showHeader"
             :width="width"
             :height="height"
             :loading="loading"
             :disabled-hover="disabledHover"
             :highlight-row="highlightRow"
             :row-class-name="rowClassName"
             :size="size"
             :no-data-text="noDataText"
             :context="context"
             :no-filtered-data-text="noFilteredDataText"
             :draggable="draggable"
             @on-current-change="onCurrentChange"
             @on-select="onSelect"
             @on-select-cancel="onSelectCancel"
             @on-select-all="onSelectAll"
             @on-selection-change="onSelectionChange"
             @on-sort-change="onSortChange"
             @on-filter-change="onFilterChange"
             @on-row-click="onRowClick"
             @on-row-dblclick="onRowDblclick"
             @on-expand="onExpand"
             @on-select-all-cancel="onSelectAllCancel"
             @on-drag-drop="onDragDrop">
        <slot name="header" slot="header"></slot>
        <slot name="footer" slot="footer"></slot>
        <slot name="loading" slot="loading"></slot>
      </Table>
    </div>

    <!--<Button @click="exportCsv">导出</Button>-->
    <Row style="margin-top: 10px;padding-left: 10px;margin-bottom: 10px;">
      <Col span="20" v-if="showPage">
        <Page :current="tmpCurrent" :total="total" :page-size="tmpPageSize"
              :page-size-opts="pageSizeOpts"
              :placement="placement" :size="size" :simple="simple" :show-total="showTotal" :show-elevator="showElevator"
              :show-sizer="showSizer" :class-name="className" :styles="styles" :transfer="transfer"
              :prev-text="prevText"
              :next-text="nextText" @on-change="onChange" @on-page-size-change="onPageSizeChange"/>
      </Col>
      <Col :span="showPage ? 4 : 24">
        <Dropdown style="float: right" v-if="showExport" @on-click="exportFile">
          <Button type="primary">
            {{$t('export.export')}}
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <!--todo 2019年5月10日 导出 图片 pdf 导出出现滚动条导出不全，不想复制dom进行渲染，怕页面加载多会卡-->
            <DropdownItem name="exportCurrentCvs">{{$t('export.exportCurrentCvs')}}</DropdownItem>
            <DropdownItem name="exportCurrentExcel">{{$t('export.exportCurrentExcel')}}</DropdownItem>
            <DropdownItem name="exportTotalExcel">{{$t('export.exportTotalExcel')}}</DropdownItem>
            <!--<DropdownItem name="exportCurrentPic">{{$t('export.exportCurrentPic')}}</DropdownItem>-->
            <!--<DropdownItem name="exportCurrentPdf">{{$t('export.exportCurrentPdf')}}</DropdownItem>-->
          </DropdownMenu>
        </Dropdown>
        <Poptip v-if="selectColumns" style="float: right; margin-right: 10px" trigger="hover" :title="$t('columnScreen')" content="content" placement="top">
          <div slot="content">
            <Checkbox-group v-model="tableColumnsChecked" @on-change="changeTableColumns">
              <div v-for="(item,index) in this.tmpColumns" :key="index">
                <Checkbox :label="item.key">{{item.title}}</Checkbox>
                <br>
              </div>
            </Checkbox-group>
          </div>
          <Button type="primary">
            <Icon type="ios-funnel"/>
          </Button>
        </Poptip>
      </Col>
    </Row>
  </div>
</template>

<script>
import TablesEdit from './edit.vue'
import handleBtns from './handle-btns'
import CommonIcon from '_c/common-icon'
import { contains, getUUID } from '@/libs'
import './index.less'
import axios from '@/libs/api.request'
import { deepCopy } from '@/libs/util'
import { export_array_to_excel } from '@/libs/excel'
import config from '@/config'
import { savePic, savePdf } from '@/libs/exportUtil'

export default {
  name: 'Tables',
  components: {
    CommonIcon
  },
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    size: {
      type: String,
      default () {
        return 'small'
      }
    },
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String],
      default: 400
    },
    stripe: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default () {
        return ''
      }
    },
    context: {
      type: Object
    },
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    disabledHover: {
      type: Boolean
    },
    /**
       * @description 全局设置是否可编辑
       */
    editable: {
      type: Boolean,
      default: false
    },
    /**
       * @description 是否可搜索
       */
    searchable: {
      type: Boolean,
      default: false
    },
    /**
       * @description 是否显示列筛选
       */
    selectColumns: {
      type: Boolean,
      default: true
    },
    /**
       * @description 搜索控件所在位置，'top' / 'bottom'
       */
    searchPlace: {
      type: String,
      default: 'top'
    },
    placement: {
      default: 'bottom'
    },
    transfer: {
      type: Boolean
    },
    simple: {
      type: Boolean,
      default: false
    },
    showTotal: {
      type: Boolean,
      default: true
    },
    showElevator: {
      type: Boolean,
      default: true
    },
    showSizer: {
      type: Boolean,
      default: true
    },
    className: {
      type: String
    },
    styles: {
      type: Object
    },
    prevText: {
      type: String,
      default: ''
    },
    nextText: {
      type: String,
      default: ''
    },
    draggable: {
      type: Boolean,
      default: false
    },
    bottomTools: {
      type: Array,
      default () {
        return ['page', 'export']
      }
    },
    // 请求数据方法
    axiosMethod: {
      type: String,
      default: 'post'
    },
    // 请求参数
    axiosData: {
      type: Object
    },
    // 请求地址
    axiosUrl: {
      type: String
    },
    filename: {
      type: String,
      default: '用电采集系统数据'
    }
  },
  /**
     * Events
     * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
     * @on-cancel-edit 返回值 {Object} 同上
     * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
     */
  data () {
    return {
      inputList: [],
      id: '',
      insideColumns: [],
      insideTableData: [],
      edittingCellId: '',
      edittingText: '',
      searchValue: '',
      searchKey: '',
      tmpColumns: [],
      tableColumnsChecked: [],
      tmpCurrent: 1,
      tmpPageSize: 25,
      dragState: {
        start: -9, // 起始元素的 index
        end: -9, // 移动鼠标时所覆盖的元素 index
        dragging: false, // 是否正在拖动
        direction: undefined // 拖动方向
      },
      showPage: false,
      showExport: false,
      loading: false,
      current: 1,
      total: 0,
      pageSize: 25,
      pageSizeOpts: [25, 50, 100, 200, 500],
      excelExport: {
        key: [],
        title: []
      }
    }
  },
  methods: {
    // todo 待测 改变搜索框输入值
    changeInput (item) {
      this.searchValue = item.consName
    },
    suportEdit (item, index) {
      item.render = (h, params) => {
        return h(TablesEdit, {
          props: {
            params: params,
            value: this.insideTableData[params.index][params.column.key],
            edittingCellId: this.edittingCellId,
            editable: this.editable,
            regular: params.column.edit.regular,
            verifyMsg: params.column.edit.verifyMsg,
            editType: params.column.edit.editType,
            editItemType: params.column.edit.editItemType,
            editItemMax: params.column.edit.max,
            editItemMin: params.column.edit.min,
            editItemFormat: params.column.edit.format,
            selectOption: params.column.edit.selectOption,
            timeSteps: params.column.edit.timeSteps,
            step: params.column.edit.step,
            precision: params.column.edit.precision,
            validFunction: params.column.edit.validFunction
          },
          on: {
            'input': val => {
              this.edittingText = val
            },
            'on-start-edit': (params) => {
              this.edittingCellId = `editting-${params.index}-${params.column.key}`
              this.$emit('on-start-edit', params)
            },
            'on-cancel-edit': (params) => {
              this.edittingCellId = ''
              this.$emit('on-cancel-edit', params)
            },
            'on-save-edit': (params) => {
              this.value[params.row.initRowIndex][params.column.key] = this.edittingText
              this.$emit('input', this.value)
              this.$emit('on-save-edit', Object.assign(params, {
                value: this.edittingText
              }))
              this.edittingCellId = ''
            }
          }
        })
      }
      return item
    },
    surportHandle (item) {
      let options = item.options || []
      let insideBtns = []
      options.forEach(item => {
        if (handleBtns[item]) insideBtns.push(handleBtns[item])
      })
      let btns = item.button ? [].concat(insideBtns, item.button) : insideBtns
      item.render = (h, params) => {
        params.tableData = this.value
        return h('div', btns.map(item => item(h, params, this)))
      }
      return item
    },
    /**
       * @description 除去iview提供的column属性，edit 属性
       * columns(Object):
       edit(Object):
       editable 是否可以编辑
       regular 正则表达式验证规则
       verifyMsg 正则验证不通过信息
       editType 编辑框类型 默认input框
       editItemType form组件类型
       max 最大值
       min 最小值
       precision 数值精度
       format 展示的时间格式
       selectOption(Array):
       item(Object):
       label
       value
       step 每次改变的步伐，可以是小数
       timeSteps 下拉列表的时间间隔，数组的三项分别对应小时、分钟、秒。例如设置为 [1, 15] 时，分钟会显示：00、15、30、45。
       validFunction 验证函数
       * @param params
       */
    handleColumns (columns) {
      let _this = this
      let exportExcelKey = []
      let exportExcelTitle = []
      this.insideColumns = columns.map((item, index) => {
        let res = item
        if (res.edit && res.edit.editable) res = this.suportEdit(res, index)
        if (res.key === 'handle') res = this.surportHandle(res)
        if (!res.width) res.width = ''
        if (!res.renderHeader) {
          item.renderHeader = function (createElement, {
            column
          }) {
            return createElement(
              'span', {
                'class': ['thead-cell'],
                on: {
                  mousedown: ($event) => {
                    _this.handleMouseDown($event, column)
                  },
                  mouseup: ($event) => {
                    _this.handleMouseUp($event, column)
                  },
                  mousemove: ($event) => {
                    _this.handleMouseMove($event, column)
                  }
                }
              }, [
                createElement('span', column.title)
              ])
          }
        }

        if (res.key !== 'handle') {
          exportExcelKey.push(item.key)
          exportExcelTitle.push(item.title)
        }
        // 默认加上排序
        res.sortable = true
        return res
      })

      this.excelExport.key = exportExcelKey
      this.excelExport.title = exportExcelTitle
      if (this.showHeader) {
        this.$nextTick(() => {
          let tTD
          let table = document.getElementById(this.id).childNodes[0].childNodes[2].childNodes[0]
          for (let j = 0; j < table.rows[0].cells.length; j++) {
            let curr = j
            table.rows[0].cells[curr].onmousedown = function () {
              tTD = this
              if (event.offsetX > tTD.offsetWidth - 10) {
                tTD.mouseDown = true
                tTD.oldX = event.x
                tTD.oldWidth = tTD.offsetWidth
              }
            }
            table.rows[0].cells[curr].onmouseup = function () {
              // 结束宽度调整
              if (tTD === undefined) tTD = this
              tTD.mouseDown = false
              tTD.style.cursor = 'default'
            }
            table.rows[0].cells[curr].onmousemove = function () {
              // 更改鼠标样式
              if (event.offsetX > this.offsetWidth - 10) {
                this.style.cursor = 'col-resize'
              } else {
                this.style.cursor = 'default'
              }
              // 取出暂存的Table Cell
              if (tTD === undefined) tTD = this
              // 调整宽度
              if (tTD.mouseDown != null && tTD.mouseDown === true) {
                tTD.style.cursor = 'default'
                if (tTD.oldWidth + (event.x - tTD.oldX) > 0) {
                  tTD.width = tTD.oldWidth + (event.x - tTD.oldX)
                }
                // 调整列宽
                // tTD.style.width = tTD.width
                _this.insideColumns[tTD.cellIndex].width = tTD.width
                tTD.style.cursor = 'col-resize'
                // 调整该列中的每个Cell
                table = tTD
                while (table.tagName !== 'TABLE') table = table.parentElement
                for (let i = 0; i < table.rows.length; i++) {
                  table.rows[i].cells[tTD.cellIndex].width = tTD.width
                }
              }
            }
          }
        })
      }
    },
    setDefaultSearchKey () {
      this.searchKey = this.columns[0].key !== 'handle' ? this.columns[0].key : (this.columns.length > 1 ? this.columns[1]
        .key : '')
    },
    handleClear (e) {
      if (e.target.value === '') this.insideTableData = this.value
    },
    handleSearch () {
      // let numReg = /^[0-9]+$/
      // if(this.searchValue.length >= 8 && numReg.test(this.searchValue)){
      //   if(this.searchValue.length in (9,10,12,14,15)){
      //     this.$emit('getCondition',this.searchValue)
      //   }else{
      //     this.$Message.error('请输入以下长度的数字(9,10,12,14,15)')
      //   }
      // }
      this.$emit('getExtroCondition', this.searchValue)

      // this.insideTableData = this.value.filter(item => item[this.searchKey].indexOf(this.searchValue) > -1)
    },
    handleTableData () {
      this.insideTableData = this.value.map((item, index) => {
        let res = item
        res.initRowIndex = index
        return res
      })
    },
    /**
       * params(Object):
       filename 文件名，默认为 table.csv
       original 是否导出为原始数据，默认为 true
       noHeader 不显示表头，默认为 false
       columns 自定义导出的列数据
       data 自定义导出的行数据
       callback 添加此函数后，不会下载，而是返回数据
       separator 数据分隔符，默认是逗号(,)
       quoted 每项数据是否加引号，默认为 false
       说明：columns 和 data 需同时声明，声明后将导出指定的数据，建议列数据有自定义render时，可以根据需求自定义导出内容
       * @param params
       */
    exportCsv (params) {
      this.$refs.tablesMain.exportCsv(params)
    },
    /**
     *
     * @param params(Object)
     * key, eg: ['orgName', 'consName', 'consNo']
     * data, eg: [{orgName: '', consName: '', consNo: ''}]
     * title, eg: ['供电单位', '用户名称', '用户编号']
     * filename, eg: '用电信息采集系统'
     * autoWidth eg: 0
     */
    exportToExcel (params) {
      export_array_to_excel(params)
    },
    clearCurrentRow () {
      this.$refs.talbesMain.clearCurrentRow()
    },
    exportFile (name) {
      this.showMsg(name === 'exportTotalExcel' ? '正在为您导出全量，等待时间可能会长一些，请您耐心等待！' : undefined)
      setTimeout(() => {
        switch (name) {
          case 'exportCurrentExcel':
            let currParam = {
              key: this.excelExport.key,
              data: this.insideTableData,
              title: this.excelExport.title,
              filename: this.filename,
              autoWidth: 0
            }
            this.exportToExcel(currParam)
            break
          case 'exportCurrentCvs':
            this.exportCsv({ filename: this.filename })
            break
          case 'exportTotalExcel':
            let queryData = deepCopy(this.axiosData)
            queryData['page'] = 1
            queryData['limit'] = config.exportExcelMax

            this.loading = true
            axios.request({
              method: this.axiosMethod,
              data: queryData,
              url: this.axiosUrl
            }).then(res => {
              this.loading = false
              const data = res.data
              if (res.status === 200 && data.data) {
                let totalParam = {
                  key: this.excelExport.key,
                  data: data.data.list,
                  title: this.excelExport.title,
                  filename: this.filename,
                  autoWidth: 0
                }
                this.exportToExcel(totalParam)
              } else {
                this.$Message.error('后台程序异常, 导出全部失败!')
              }
            }).catch(() => {
              this.$Message.error('导出服务调用失败!')
              this.loading = false
            })
            break
          case 'exportCurrentPic':
            let picParam = {
              id: this.id,
              exportFileName: this.filename
            }
            savePic(picParam)
            break
          case 'exportCurrentPdf':
            let pdfParam = {
              id: this.id,
              exportFileName: this.filename
            }
            savePdf(pdfParam)
            break
        }
      }, 400)
    },
    onCurrentChange (currentRow, oldCurrentRow) {
      this.$emit('on-current-change', currentRow, oldCurrentRow)
    },
    onSelect (selection, row) {
      this.$emit('on-select', selection, row)
    },
    onSelectCancel (selection, row) {
      this.$emit('on-select-cancel', selection, row)
    },
    onSelectAll (selection) {
      this.$emit('on-select-all', selection)
    },
    onSelectAllCancel (selection) {
      this.$emit('on-select-all-cancel', selection)
    },
    onSelectionChange (selection) {
      this.$emit('on-selection-change', selection)
    },
    onSortChange (column, key, order) {
      this.$emit('on-sort-change', column, key, order)
    },
    onFilterChange (row) {
      this.$emit('on-filter-change', row)
    },
    onRowClick (row, index) {
      this.$emit('on-row-click', row, index)
    },
    onRowDblclick (row, index) {
      this.$emit('on-row-dblclick', row, index)
    },
    onExpand (row, status) {
      this.$emit('on-expand', row, status)
    },
    onChange (page) {
      this.tmpCurrent = page
      this.queryTableData(this.tmpCurrent, this.tmpPageSize)
    },
    onPageSizeChange (pageSize) {
      this.tmpPageSize = pageSize
      this.tmpCurrent = 1
      this.queryTableData(this.tmpCurrent, this.tmpPageSize)
    },
    onPageChange (page, pageSize) {
      this.tmpCurrent = page
      this.tmpPageSize = pageSize
      this.queryTableData(this.tmpCurrent, this.tmpPageSize)
    },
    changeTableColumns () {
      let columns = this.columns
      let columnsTmp = []
      columns.forEach(column => {
        this.tableColumnsChecked.forEach(item => {
          if (column.key === item) {
            columnsTmp.push(column)
          }
        })
      })
      this.handleColumns(columnsTmp)
    },
    cloneHead (item) {
      let tmp = []
      item.forEach(it => {
        let tepObj = {}
        tepObj.title = it.title
        tepObj.key = it.key
        tepObj.show = it.show !== false
        tmp.push(tepObj)
      })
      return tmp
    },
    getHead (item) {
      let tmp = []
      item.forEach(it => {
        if (it.show !== false) {
          tmp.push(it.key)
        }
      })
      return tmp
    },
    // 按下鼠标开始拖动
    handleMouseDown (e, column) {
      this.dragState.dragging = true
      this.dragState.start = parseInt(column._index)
      // 给拖动时的虚拟容器添加宽高
      // let table = document.getElementsByClassName('w-table')[0]
      // let virtual = document.getElementsByClassName('virtual')
      // console.log(table, virtual)
      // for (let item of virtual) {
      //   item.style.height = table.clientHeight - 1 + 'px'
      //   item.style.width = item.parentElement.parentElement.clientWidth + 'px'
      // }
      document.addEventListener('mouseup', this.handleMouseUp)

      let createDiv = document.createElement('div')
      createDiv.className = 'cdiv'
      createDiv.id = 'cdiv'
      createDiv.innerText = column.title
      let X = e.x
      let Y = e.y
      createDiv.style.left = X + 'px'
      createDiv.style.top = Y + 'px'
      document.body.appendChild(createDiv)
    },

    // 鼠标放开结束拖动
    handleMouseUp () {
      this.dragColumn(this.dragState)
      // 初始化拖动状态
      this.dragState = {
        start: -9,
        end: -9,
        dragging: false,
        direction: undefined
      }
      document.removeEventListener('mouseup', this.handleMouseUp)
      let bodyParent = document.getElementsByTagName('body')[0]
      let childNode = document.getElementById('cdiv')
      bodyParent.removeChild(childNode)
    },

    // 拖动中
    handleMouseMove (e, column) {
      if (this.dragState.dragging === true) {
        let cDiv = document.getElementById('cdiv')
        cDiv.style.top = e.y + 'px'
        cDiv.style.left = e.x + 'px'
      }

      if (this.dragState.dragging) {
        let index = parseInt(column._index) // 记录起始列
        if (index - this.dragState.start !== 0) {
          this.dragState.direction = index - this.dragState.start < 0 ? 'left' : 'right' // 判断拖动方向
          this.dragState.end = parseInt(column._index)
        } else {
          this.dragState.direction = undefined
        }
      } else {
        return false
      }
    },
    // 拖动易位
    dragColumn ({
      start,
      end,
      direction
    }) {
      let tempData = []
      let left = direction === 'left'
      let min = left ? end : start - 1
      let max = left ? start + 1 : end
      for (let i = 0; i < this.insideColumns.length; i++) {
        if (i === end) {
          tempData.push(this.insideColumns[start])
        } else if (i > min && i < max) {
          tempData.push(this.insideColumns[left ? i - 1 : i + 1])
        } else {
          tempData.push(this.insideColumns[i])
        }
      }
      this.insideColumns = tempData
    },
    onDragDrop (index1, index2) {
      console.log(index1, index2)
    },
    // 查询数据
    queryTableData (current, pageSize) {
      let queryData = deepCopy(this.axiosData)
      queryData['page'] = current || this.current
      queryData['limit'] = pageSize || this.pageSize

      this.loading = true
      this.insideTableData = []
      axios.request({
        method: this.axiosMethod,
        data: queryData,
        url: this.axiosUrl
      }).then(res => {
        this.loading = false
        const data = res.data
        console.log('res----->', data)
        if (res.status === 200 && data.data) {
          this.insideTableData = data.data.list
          this.$emit('on-load-data', this.insideTableData)
          this.total = data.data.totalCount
          this.tmpCurrent = queryData['page']
          this.$emit('on-load-data-page-info', this.tmpCurrent, this.tmpPageSize, this.total, data.data.totalPage)
        } else {
          this.$Message.info(data.msg)
        }
      }).catch(() => {
        // this.$Message.error('查询服务调用失败!')
        this.loading = false
      })
    },
    initUuid () {
      this.id = getUUID().replace(/-/g, '')
      this.id = 'T' + this.id.substr(this.id.length - 12)
    },
    showMsg (msg = '正在为您保存，请您耐心等待！') {
      this.$Message.info({
        duration: 3,
        content: msg
      })
    }
  },
  watch: {
    // todo 待测。。。
    //  匹配搜索框输入中文并动态生成推荐值
    searchValue (n, o) {
      let ChineseReg = /[\u4e00-\u9fa5]{2}/
      if (n.length >= 2) {
        if (ChineseReg.test(n.substring(0, 2))) {
          axios.request({
            method: 'POST',
            url: '/sea-omid/alarmDetailQuery/queryForConsNameList',
            data: {
              input: n
            }
          }).then(response => {
            this.inputList = []
            response.data.forEach(item => {
              this.inputList.push(item)
            })
          })
        }
      }
    },
    columns (columns) {
      this.handleColumns(columns)
      this.setDefaultSearchKey()
    },
    value (val) {
      this.handleTableData()
      if (this.searchable) this.handleSearch()
    }
  },
  created () {
    this.tmpCurrent = parseInt(this.current)
    this.tmpPageSize = parseInt(this.pageSize)
    this.initUuid()
  },
  mounted () {
    this.tmpColumns = this.cloneHead(this.columns)
    this.tableColumnsChecked = this.getHead(this.columns)
    this.setDefaultSearchKey()
    this.handleTableData()
    this.changeTableColumns()

    this.showPage = contains(this.bottomTools, 'page')
    this.showExport = contains(this.bottomTools, 'export')
  }
}
</script>
<style lang="less">
  .cdiv{
    padding: 5px 10px;
    background: rgb(0, 0, 0, 0.4);
    color: white;
    font-weight: bold;
    border: 1px solid #CCCCCC;
    box-sizing: border-box;
    font-size: 0.75rem;
    border-radius: 5px;
    position: absolute;
    z-index: 999999999;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  /*.ivu-poptip-content{*/
    /*width: 180px !important;*/
  /*}*/
  th .ivu-table-cell {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
