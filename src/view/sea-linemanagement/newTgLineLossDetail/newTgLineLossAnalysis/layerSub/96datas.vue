<template>
  <div class="collectionDetails">
    <tables ref="tables" :height="tableHeight - 50" editable :columns="columns" :axiosUrl="axiosUrl" :axiosData="queryData" :filename="'96点数据'" />
  </div>
</template>
<script>
import Tables from '_c/tables'

export default {
  name: 'collectionDetails',
  props: ['queryData', 'axiosUrl'],
  components: {
    Tables
  },
  data () {
    return {
      tableHeight: 500,
      columns: [
        {
          title: '电表资产号',
          key: 'assetNo',
          width: 150,
          sortable: true
        },
        {
          title: '相位类型',
          key: 'meterFlag',
          width: 150,
          sortable: true
        },
        {
          title: '00:00',
          key: 'i01',
          width: 150,
          sortable: true
        },
        {
          title: '00:15',
          key: 'i02',
          width: 150,
          sortable: true
        },
        {
          title: '00:30',
          key: 'i03',
          width: 150,
          sortable: true
        },
        {
          title: '00:45',
          key: 'i04',
          width: 150,
          sortable: true
        },
        {
          title: '01:00',
          key: 'i05',
          width: 150,
          sortable: true
        },
        {
          title: '01:15',
          key: 'i06',
          width: 150,
          sortable: true
        },
        {
          title: '01:30',
          key: 'i07',
          width: 150,
          sortable: true
        },
        {
          title: '01:45',
          key: 'i08',
          width: 150,
          sortable: true
        },
        {
          title: '02:00',
          key: 'i09',
          width: 150,
          sortable: true
        },
        {
          title: '02:15',
          key: 'i10',
          width: 150,
          sortable: true
        },
        {
          title: '02:30',
          key: 'i11',
          width: 150,
          sortable: true
        },
        {
          title: '02:45',
          key: 'i12',
          width: 150,
          sortable: true
        },
        {
          title: '03:00',
          key: 'i13',
          width: 150,
          sortable: true
        },
        {
          title: '03:15',
          key: 'i14',
          width: 150,
          sortable: true
        },
        {
          title: '03:30',
          key: 'i15',
          width: 150,
          sortable: true
        },
        {
          title: '03:45',
          key: 'i16',
          width: 150,
          sortable: true
        },
        {
          title: '04:00',
          key: 'i17',
          width: 150,
          sortable: true
        },
        {
          title: '04:15',
          key: 'i18',
          width: 150,
          sortable: true
        },
        {
          title: '04:30',
          key: 'i19',
          width: 150,
          sortable: true
        },
        {
          title: '04:45',
          key: 'i20',
          width: 150,
          sortable: true
        },
        {
          title: '05:00',
          key: 'i21',
          width: 150,
          sortable: true
        },
        {
          title: '05:15',
          key: 'i22',
          width: 150,
          sortable: true
        },
        {
          title: '05:30',
          key: 'i23',
          width: 150,
          sortable: true
        },
        {
          title: '05:45',
          key: 'i24',
          width: 150,
          sortable: true
        },
        {
          title: '06:00',
          key: 'i25',
          width: 150,
          sortable: true
        },
        {
          title: '06:15',
          key: 'i26',
          width: 150,
          sortable: true
        },
        {
          title: '06:30',
          key: 'i27',
          width: 150,
          sortable: true
        },
        {
          title: '06:45',
          key: 'i28',
          width: 150,
          sortable: true
        },
        {
          title: '07:00',
          key: 'i29',
          width: 150,
          sortable: true
        },
        {
          title: '07:15',
          key: 'i30',
          width: 150,
          sortable: true
        },
        {
          title: '07:30',
          key: 'i31',
          width: 150,
          sortable: true
        },
        {
          title: '07:45',
          key: 'i32',
          width: 150,
          sortable: true
        },
        {
          title: '08:00',
          key: 'i33',
          width: 150,
          sortable: true
        },
        {
          title: '08:15',
          key: 'i34',
          width: 150,
          sortable: true
        },
        {
          title: '08:30',
          key: 'i35',
          width: 150,
          sortable: true
        },
        {
          title: '08:45',
          key: 'i36',
          width: 150,
          sortable: true
        },
        {
          title: '09:00',
          key: 'i37',
          width: 150,
          sortable: true
        },
        {
          title: '09:15',
          key: 'i38',
          width: 150,
          sortable: true
        },
        {
          title: '09:30',
          key: 'i39',
          width: 150,
          sortable: true
        },
        {
          title: '09:45',
          key: 'i40',
          width: 150,
          sortable: true
        },
        {
          title: '10:00',
          key: 'i41',
          width: 150,
          sortable: true
        },
        {
          title: '10:15',
          key: 'i42',
          width: 150,
          sortable: true
        },
        {
          title: '10:30',
          key: 'i43',
          width: 150,
          sortable: true
        },
        {
          title: '10:45',
          key: 'i44',
          width: 150,
          sortable: true
        },
        {
          title: '11:00',
          key: 'i45',
          width: 150,
          sortable: true
        },
        {
          title: '11:15',
          key: 'i46',
          width: 150,
          sortable: true
        },
        {
          title: '11:30',
          key: 'i47',
          width: 150,
          sortable: true
        },
        {
          title: '11:45',
          key: 'i48',
          width: 150,
          sortable: true
        },
        {
          title: '12:00',
          key: 'i49',
          width: 150,
          sortable: true
        },
        {
          title: '12:15',
          key: 'i50',
          width: 150,
          sortable: true
        },
        {
          title: '12:30',
          key: 'i51',
          width: 150,
          sortable: true
        },
        {
          title: '12:45',
          key: 'i52',
          width: 150,
          sortable: true
        },
        {
          title: '13:00',
          key: 'i53',
          width: 150,
          sortable: true
        },
        {
          title: '13:15',
          key: 'i54',
          width: 150,
          sortable: true
        },
        {
          title: '13:30',
          key: 'i55',
          width: 150,
          sortable: true
        },
        {
          title: '13:45',
          key: 'i56',
          width: 150,
          sortable: true
        },
        {
          title: '14:00',
          key: 'i57',
          width: 150,
          sortable: true
        },
        {
          title: '14:15',
          key: 'i58',
          width: 150,
          sortable: true
        },
        {
          title: '14:30',
          key: 'i59',
          width: 150,
          sortable: true
        },
        {
          title: '14:45',
          key: 'i60',
          width: 150,
          sortable: true
        },
        {
          title: '15:00',
          key: 'i61',
          width: 150,
          sortable: true
        },
        {
          title: '15:15',
          key: 'i62',
          width: 150,
          sortable: true
        },
        {
          title: '15:30',
          key: 'i63',
          width: 150,
          sortable: true
        },
        {
          title: '15:45',
          key: 'i64',
          width: 150,
          sortable: true
        },
        {
          title: '16:00',
          key: 'i65',
          width: 150,
          sortable: true
        },
        {
          title: '16:15',
          key: 'i66',
          width: 150,
          sortable: true
        },
        {
          title: '16:30',
          key: 'i67',
          width: 150,
          sortable: true
        },
        {
          title: '16:45',
          key: 'i68',
          width: 150,
          sortable: true
        },
        {
          title: '17:00',
          key: 'i69',
          width: 150,
          sortable: true
        },
        {
          title: '17:15',
          key: 'i70',
          width: 150,
          sortable: true
        },
        {
          title: '17:30',
          key: 'i71',
          width: 150,
          sortable: true
        },
        {
          title: '17:45',
          key: 'i72',
          width: 150,
          sortable: true
        },
        {
          title: '18:00',
          key: 'i73',
          width: 150,
          sortable: true
        },
        {
          title: '18:15',
          key: 'i74',
          width: 150,
          sortable: true
        },
        {
          title: '18:30',
          key: 'i75',
          width: 150,
          sortable: true
        },
        {
          title: '18:45',
          key: 'i76',
          width: 150,
          sortable: true
        },
        {
          title: '19:00',
          key: 'i77',
          width: 150,
          sortable: true
        },
        {
          title: '19:15',
          key: 'i78',
          width: 150,
          sortable: true
        },
        {
          title: '19:30',
          key: 'i79',
          width: 150,
          sortable: true
        },
        {
          title: '19:45',
          key: 'i80',
          width: 150,
          sortable: true
        },
        {
          title: '20:00',
          key: 'i81',
          width: 150,
          sortable: true
        },
        {
          title: '20:15',
          key: 'i82',
          width: 150,
          sortable: true
        },
        {
          title: '20:30',
          key: 'i83',
          width: 150,
          sortable: true
        },
        {
          title: '20:45',
          key: 'i84',
          width: 150,
          sortable: true
        },
        {
          title: '21:00',
          key: 'i85',
          width: 150,
          sortable: true
        },
        {
          title: '21:15',
          key: 'i86',
          width: 150,
          sortable: true
        },
        {
          title: '21:30',
          key: 'i87',
          width: 150,
          sortable: true
        },
        {
          title: '21:45',
          key: 'i88',
          width: 150,
          sortable: true
        },
        {
          title: '22:00',
          key: 'i89',
          width: 150,
          sortable: true
        },
        {
          title: '22:15',
          key: 'i90',
          width: 150,
          sortable: true
        },
        {
          title: '22:30',
          key: 'i91',
          width: 150,
          sortable: true
        },
        {
          title: '22:45',
          key: 'i92',
          width: 150,
          sortable: true
        },
        {
          title: '23:00',
          key: 'i93',
          width: 150,
          sortable: true
        },
        {
          title: '23:15',
          key: 'i94',
          width: 150,
          sortable: true
        },
        {
          title: '23:30',
          key: 'i95',
          width: 150,
          sortable: true
        },
        {
          title: '23:45',
          key: 'i96',
          width: 150,
          sortable: true
        }
      ],
      axiosData: {}
    }
  },
  methods: {
    changeHeight () {
      this.tableHeight = window.innerHeight > 800 ? window.innerHeight - 300 : 500
    }
  },
  mounted () {
    let that = this
    window.onresize = () => {
      return (() => {
        that.changeHeight()
      })()
    }
  }
}
</script>
<style lang="less">
</style>
