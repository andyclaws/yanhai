<template>
<div>
  <Form ref="formValidate" :model="form" :rules="ruleValidate" :label-width="100">
      <Row>
        <Col span="6">
          <FormItem :label="$t('menuName')" prop="menuName">
            <Input v-model="form.menuName" :placeholder="$t('please_input_menuName')" clearable></Input>
          </FormItem>
        </Col>
<!--        <Col span="6">-->
<!--          <FormItem :label="$t('pMenuName')" prop="pMenuName">-->
<!--            <Input v-model="form.pMenuName" :placeholder="$t('please_input_pMenuName')" clearable></Input>-->
<!--          </FormItem>-->
<!--        </Col>-->
        <Col span="6">
          <FormItem :label="$t('status')" prop="status">
            <Select v-model="form.status" :placeholder="$t('please_input_status')" clearable>
              <Option v-for="item in menuStatus" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label-width="20">
            <Button type="primary" @click="query">{{$t('inquiry')}}</Button>
            <Button type="primary" @click="addOrUpdateMenu()" style="margin-left: 8px">{{$t('add')}}</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>

  <Card class="menu-manage-card">
    <tree-table
      expand-key="name"
      :expand-type="false"
      :selectable="false"
      :columns="columns"
      :data="data"
      stripe
      border
      :row-style="{height: '36px'}" style="height: 600px">
      <template slot="icon" slot-scope="scope">
<!--        <CommonIcon :size="20" :type="scope.row.icon"/>-->
      </template>
      <template slot="type" slot-scope="scope">
        <Button type="info" ghost v-if="scope.row.type === 0">目录</Button>
        <Button type="success" ghost v-else-if="scope.row.type === 1">菜单</Button>
        <Button type="warning" ghost v-else>按钮</Button>
      </template>
      <template slot="status" slot-scope="scope">
        <Button type="info" v-if="scope.row.isValid === 1">正常</Button>
        <Button type="info" v-else>停用</Button>
      </template>
      <template slot="operate" slot-scope="scope">
        <Button type="text" @click="changeStatus(scope.row.menuId)">修改状态</Button>
        <Button type="text" @click="addOrUpdateMenu(scope.row.menuId)">修改</Button>
        <Button type="text" @click="deleteMenu(scope.row.menuId)" >删除</Button>
      </template>
    </tree-table>
  </Card>

  <Modals v-model="showModels"
          @on-cancel="closeModal"
          :title="isAddMenu ? '新增' : '修改'"
          :fullscreen="fullscreen"
          :draggable="draggable"
          width='600'
          footer-hide
  >
    <add-or-update @cancel="showModels = false" ref="addOrUpdate"></add-or-update>
  </Modals>
</div>
</template>

<script>
import AddOrUpdate from './addOrUpdate'
import CommonIcon from '_c/common-icon'
import Modals from '_c/modals'
import { list, deleteMenu, changeStatus } from '@/api/system/permission/menu-manage/menu-manage'
export default {
  name: 'menu-manage',
  components: {
    AddOrUpdate,
    CommonIcon,
    Modals
  },
  data () {
    return {
      columns: [
        {
          title: '菜单名称',
          key: 'name',
          width: '200px'
        },
        {
          title: '上级菜单',
          key: 'parentName'
        },
        {
          title: '图标',
          key: 'icon',
          type: 'template',
          template: 'icon'
        },
        {
          title: '类型',
          key: 'type',
          type: 'template',
          template: 'type'
        },
        {
          title: '排序号',
          key: 'orderNum'
        },
        {
          title: '菜单URL',
          key: 'url',
          width: '200px'
        }, {
          title: '组件位置',
          key: 'componentAddr',
          width: '300px'
        },
        {
          title: '授权标识',
          key: 'perms'
        },
        {
          title: '状态',
          key: 'sortNo',
          type: 'template',
          template: 'status'
        },
        {
          title: '操作',
          key: 'sortNo',
          type: 'template',
          template: 'operate',
          width: '300px'
        }
      ],
      data: [],
      menuStatus: [
        {
          code: 1,
          name: '正常'
        },
        {
          code: 2,
          name: '停用'
        }
      ],
      form: {
        menuName: '',
        pMenuName: '',
        status: ''
      },
      ruleValidate: {},
      showModels: false,
      fullscreen: true,
      draggable: false,
      isAddMenu: true
    }
  },
  methods: {
    addOrUpdateMenu (menuId) {
      console.log(menuId)
      this.isAddMenu = menuId === undefined
      this.showModels = true
      this.$refs.addOrUpdate.init(menuId)
    },
    deleteMenu (menuId) {
      deleteMenu(menuId).then(res => {
        console.log(res)
      })
    },
    changeStatus (menuId) {
      console.log(menuId)
      changeStatus(menuId).then(res => {
        console.log(res)
      })
    },
    query () {
      let data = {
        // 'menuName': '',
        // 'pMenuId': '',
        // 'pmenuName': '',
        // // 'status': 1,
        // 'isValid':'',
        // 'type': ''
        menuName: this.form.menuName,
        // pMenuName: this.form.pMenuName,
        status: this.form.status
      }
      list(data).then(res => {
        const data = res.data
        if (data.code === 200 && data.data) {
          this.data = data.data
        } else {
          this.$Message.success('查询失败!')
        }
      }).catch(err => {

      })
    },
    closeModal (refresh) {
      this.showModels = false
      if (refresh) {
        this.query()
      }
    }
  }
}
</script>

<style lang="less">
  .menu-manage-card{
    .zk-table__body-wrapper{
      min-height: 500px;
    }
  }
</style>
