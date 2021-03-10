<template>
  <Layout style="height: 100%">
    <Row>
      <Col span="8">
        <Table :data="tableData1" :columns="tableColumns1" stripe draggable></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="100" :current="1" @on-change="changePage"></Page>
          </div>
        </div>
      </Col>
      <Col span="8">
        <Checkbox-group v-model="tableColumnsChecked" @on-change="changeTableColumns">
          <Checkbox label="show">Show</Checkbox>
          <Checkbox label="weak">Weak</Checkbox>
          <Checkbox label="signin">Signin</Checkbox>
          <Checkbox label="click">Click</Checkbox>
          <Checkbox label="active">Active</Checkbox>
          <Checkbox label="day7">7, retained</Checkbox>
          <Checkbox label="day30">30, retained</Checkbox>
          <Checkbox label="tomorrow">The next day left</Checkbox>
          <Checkbox label="day">Day Active</Checkbox>
          <Checkbox label="week">Week Active</Checkbox>
          <Checkbox label="month">Month Active</Checkbox>
        </Checkbox-group>
        <Table :data="tableData2" :columns="tableColumns2" border></Table>
      </Col>
      <Col span="8">
        <div style="margin: 10px">
          Display border <i-switch v-model="showBorder" style="margin-right: 5px"></i-switch>
          Display stripe <i-switch v-model="showStripe" style="margin-right: 5px"></i-switch>
          Display index <i-switch v-model="showIndex" style="margin-right: 5px"></i-switch>
          Display multi choice <i-switch v-model="showCheckbox" style="margin-right: 5px"></i-switch>
          Display header <i-switch v-model="showHeader" style="margin-right: 5px"></i-switch>
          Table scrolling <i-switch v-model="fixedHeader" style="margin-right: 5px"></i-switch>
          <br>
          <br>
          Table size
          <Radio-group v-model="tableSize" type="button">
            <Radio label="large">large</Radio>
            <Radio label="default">medium(default)</Radio>
            <Radio label="small">small</Radio>
          </Radio-group>
        </div>
        <Table :border="showBorder" :stripe="showStripe" :show-header="showHeader" :height="fixedHeader ? 250 : ''" :size="tableSize" :data="tableData3" :columns="tableColumns3"></Table>
      </Col>
    </Row>
  </Layout>
</template>
<script>
export default {
  name: 'tree',
  data: function () {
    return {
      tableData1: this.mockTableData1(),
      tableColumns1: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Status',
          key: 'status',
          render: (h, params) => {
            const row = params.row
            const color = row.status === 1 ? 'primary' : row.status === 2 ? 'success' : 'error'
            const text = row.status === 1 ? 'Working' : row.status === 2 ? 'Success' : 'Fail'

            return h('Tag', {
              props: {
                type: 'dot',
                color: color
              }
            }, text)
          }
        },
        {
          title: 'Portrayal',
          key: 'portrayal',
          render: (h, params) => {
            return h('Poptip', {
              props: {
                trigger: 'hover',
                title: params.row.portrayal.length + 'portrayals',
                placement: 'bottom'
              }
            }, [
              h('Tag', params.row.portrayal.length),
              h('div', {
                slot: 'content'
              }, [
                h('ul', this.tableData1[params.index].portrayal.map(item => {
                  return h('li', {
                    style: {
                      textAlign: 'center',
                      padding: '4px'
                    }
                  }, item)
                }))
              ])
            ])
          }
        },
        {
          title: 'People',
          key: 'people',
          render: (h, params) => {
            return h('Poptip', {
              props: {
                trigger: 'hover',
                title: params.row.people.length + 'customers',
                placement: 'bottom'
              }
            }, [
              h('Tag', params.row.people.length),
              h('div', {
                slot: 'content'
              }, [
                h('ul', this.tableData1[params.index].people.map(item => {
                  return h('li', {
                    style: {
                      textAlign: 'center',
                      padding: '4px'
                    }
                  }, item.n + '：' + item.c + 'People')
                }))
              ])
            ])
          }
        },
        {
          title: 'Sampling Time',
          key: 'time',
          render: (h, params) => {
            return h('div', 'Almost' + params.row.time + 'days')
          }
        },
        {
          title: 'Updated Time',
          key: 'update',
          render: (h, params) => {
            return h('div', this.formatDate(this.tableData1[params.index].update))
          }
        }
      ],

      tableData2: this.mockTableData2(),
      tableColumns2: [],
      tableColumnsChecked: ['show', 'weak', 'signin', 'click', 'active', 'day7', 'day30', 'tomorrow', 'day', 'week', 'month'],

      tableData3: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ],
      showBorder: false,
      showStripe: false,
      showHeader: true,
      showIndex: true,
      showCheckbox: false,
      fixedHeader: false,
      tableSize: 'default'
    }
  },
  created () {
  },
  methods: {
    mockTableData1 () {
      let data = []
      for (let i = 0; i < 10; i++) {
        data.push({
          name: 'Business' + Math.floor(Math.random() * 100 + 1),
          status: Math.floor(Math.random() * 3 + 1),
          portrayal: ['City', 'People', 'Cost', 'Life', 'Entertainment'],
          people: [
            {
              n: 'People' + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            },
            {
              n: 'People' + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            },
            {
              n: 'People' + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            }
          ],
          time: Math.floor(Math.random() * 7 + 1),
          update: new Date()
        })
      }
      return data
    },
    formatDate (date) {
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '-' + m + '-' + d
    },
    changePage () {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.tableData1 = this.mockTableData1()
    },

    mockTableData2 () {
      let data = []
      function getNum () {
        return Math.floor(Math.random() * 10000 + 1)
      }
      for (let i = 0; i < 10; i++) {
        data.push({
          name: 'Name ' + (i + 1),
          fav: 0,
          show: getNum(),
          weak: getNum(),
          signin: getNum(),
          click: getNum(),
          active: getNum(),
          day7: getNum(),
          day30: getNum(),
          tomorrow: getNum(),
          day: getNum(),
          week: getNum(),
          month: getNum()
        })
      }
      return data
    },
    getTable2Columns () {
      const table2ColumnList = {
        name: {
          title: 'Name',
          key: 'name',
          fixed: 'left',
          width: 200,
          render: (h, params) => {
            const fav = this.tableData2[params.index].fav
            const style = fav === 0 ? {
              cursor: 'pointer'
            } : {
              cursor: 'pointer',
              color: '#f50'
            }

            return h('div', [
              h('Icon', {
                style: style,
                props: {
                  type: fav === 0 ? 'ios-star-outline' : 'ios-star'
                },
                nativeOn: {
                  click: () => {
                    this.toggleFav(params.index)
                  }
                }
              }),
              h('span', ' ' + params.row.name)
            ])
          }
        },
        show: {
          title: 'Show',
          key: 'show',
          width: 150,
          sortable: true
        },
        weak: {
          title: 'Weak',
          key: 'weak',
          width: 150,
          sortable: true
        },
        signin: {
          title: 'Signin',
          key: 'signin',
          width: 150,
          sortable: true
        },
        click: {
          title: 'Click',
          key: 'click',
          width: 150,
          sortable: true
        },
        active: {
          title: 'Active',
          key: 'active',
          width: 150,
          sortable: true
        },
        day7: {
          title: '7, retained',
          key: 'day7',
          width: 150,
          sortable: true
        },
        day30: {
          title: '30, retained',
          key: 'day30',
          width: 150,
          sortable: true
        },
        tomorrow: {
          title: 'The next day left',
          key: 'tomorrow',
          width: 150,
          sortable: true
        },
        day: {
          title: 'Day Active',
          key: 'day',
          width: 150,
          sortable: true
        },
        week: {
          title: 'Week Active',
          key: 'week',
          width: 150,
          sortable: true
        },
        month: {
          title: 'Month Active',
          key: 'month',
          width: 150,
          sortable: true
        }
      }

      let data = [table2ColumnList.name]

      this.tableColumnsChecked.forEach(col => data.push(table2ColumnList[col]))

      return data
    },
    changeTableColumns () {
      this.tableColumns2 = this.getTable2Columns()
    },
    toggleFav (index) {
      this.tableData2[index].fav = this.tableData2[index].fav === 0 ? 1 : 0
    }
  },
  mounted () {
    this.changeTableColumns()
  },
  computed: {
    tableColumns3 () {
      let columns = []
      if (this.showCheckbox) {
        columns.push({
          type: 'selection',
          width: 60,
          align: 'center'
        })
      }
      if (this.showIndex) {
        columns.push({
          type: 'index',
          width: 60,
          align: 'center'
        })
      }
      columns.push({
        title: 'Date',
        key: 'date',
        sortable: true
      })
      columns.push({
        title: 'Name',
        key: 'name'
      })
      columns.push({
        title: 'Age',
        key: 'age',
        sortable: true,
        filters: [
          {
            label: 'Greater than 25',
            value: 1
          },
          {
            label: 'Less than 25',
            value: 2
          }
        ],
        filterMultiple: false,
        filterMethod (value, row) {
          if (value === 1) {
            return row.age > 25
          } else if (value === 2) {
            return row.age < 25
          }
        }
      })
      columns.push({
        title: 'Address',
        key: 'address',
        filters: [
          {
            label: 'New York',
            value: 'New York'
          },
          {
            label: 'London',
            value: 'London'
          },
          {
            label: 'Sydney',
            value: 'Sydney'
          }
        ],
        filterMethod (value, row) {
          return row.address.indexOf(value) > -1
        }
      })
      return columns
    }
  }
}
</script>
