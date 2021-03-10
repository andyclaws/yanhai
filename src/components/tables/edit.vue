<template>
  <div class="tables-edit-outer">
    <div v-if="!isEditting" class="tables-edit-con">
      <p v-if="value === ''">&nbsp;</p>
      <span class="value-con">{{ value }}</span>
      <Button v-if="editable" @click="startEdit" class="tables-edit-btn" style="padding: 2px 4px;" type="text">
        <Icon type="md-create"></Icon>
      </Button>
    </div>
    <div v-else class="tables-editting-con">
      <!--input 框-->
      <Input  v-if="editType === 'input'" :value="value" @input="handleInput" clearable :class="valid ? 'tables-edit-input' : 'tables-edit-input-error'"/>
      <!--select 框-->
      <Select v-if="editType === 'select'" v-model="tmpVal" filterable  clearable :class="valid ? 'tables-edit-input' : 'tables-edit-input-error'">
        <Option v-for="item in selectOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <!--DatePicker 框-->
      <DatePicker v-if="editType === 'datePicker'" :value="tmpVal" placeholder="Select date and time"
                  :type="editItemType && editItemType !== '' ? editItemType : 'date'"
                  :format="editItemFormat && editItemFormat !== '' ? editItemFormat : 'yyyy-MM-dd'"
                  clearable :class="valid ? 'tables-edit-input' : 'tables-edit-input-error'" @on-change="changeData"></DatePicker>
      <!--TimePicker 框-->
      <TimePicker v-if="editType === 'timePicker'" :value="tmpVal" placeholder="Select time" :steps="timeSteps"
                  :type="editItemType && editItemType !== '' ? editItemType : 'time'"
                  :format="editItemFormat && editItemFormat !== '' ? editItemFormat : 'HH:mm:ss'"
                  confirm clearable :class="valid ? 'tables-edit-input' : 'tables-edit-input-error'" @on-change="changeData"></TimePicker>
      <!--InputNumber 框-->
      <InputNumber v-if="editType === 'inputNumber'" v-model="tmpValNum" @on-change="changeData"
                   :precision="precision" :step="step"
                   :class="valid ? 'tables-edit-input' : 'tables-edit-input-error'"></InputNumber>

      <Button @click="checkEdit" style="padding: 6px 4px;" type="text">
        <Icon type="md-checkmark"></Icon>
      </Button>
      <Button @click="canceltEdit" style="padding: 6px 4px;" type="text">
        <Icon type="md-close"></Icon>
      </Button>
    </div>
  </div>
</template>

<script>
import { oneOf } from '@/libs/tools'
export default {
  name: 'TablesEdit',
  props: {
    value: [String, Number],
    edittingCellId: String,
    params: Object,
    editable: Boolean,
    regular: String,
    verifyMsg: String,
    /**
     * 编辑框类型, enum: ['input', 'select', 'datePicker', 'timePicker', 'inputNumber']
     */
    editType: {
      type: String,
      default: 'input',
      validator: (val) => {
        return oneOf(val, ['', 'input', 'select', 'datePicker', 'timePicker', 'inputNumber'])
      }
    },
    /**
     * 输入框类型, enum: ['text', 'password', 'textarea', 'url', 'email',
     'date', 'daterange', 'datetime', 'datetimerange', 'year', 'month',
     'time', 'timerange']
     */
    editItemType: {
      type: String,
      default: '',
      validator: (val) => {
        return oneOf(val, ['', 'text', 'password', 'textarea', 'url', 'email',
          'date', 'daterange', 'datetime', 'datetimerange', 'year', 'month',
          'time', 'timerange'])
      }
    },
    editItemMax: {
      type: [String, Number],
      default: 99999999
    },
    editItemMin: {
      type: [String, Number],
      default: -99999999
    },
    editItemFormat: String,
    selectOption: Array,
    timeSteps: Array,
    step: Number,
    precision: Number,
    validFunction: Function
  },
  data () {
    return {
      valid: true,
      tmpVal: '',
      tmpValNum: 0
    }
  },
  computed: {
    isEditting () {
      return this.edittingCellId === `editting-${this.params.index}-${this.params.column.key}`
    }
  },
  created () {
    this.tmpVal = this.value
  },
  watch: {
    tmpVal (val) {
      this.tmpValNum = isNaN(parseInt(val)) ? 0 : parseInt(val)
    }
  },
  methods: {
    handleInput (val) {
      this.tmpVal = val
      this.$emit('input', val)
    },
    startEdit () {
      this.$emit('on-start-edit', this.params)
      this.$emit('input', this.value)
    },
    checkEdit () {
      console.log(this.tmpVal)
      if (this.regular !== '' && this.regular !== undefined) {
        let reg = new RegExp(this.regular)
        if (reg.test(this.tmpVal)) {
          this.valid = true
          this.saveEdit()
        } else {
          this.valid = false
          this.$Message.error(this.verifyMsg ? this.verifyMsg : '验证不通过')
        }
      } else if (this.validFunction) {
        if (this.validFunction(this.tmpVal)) {
          this.valid = true
          this.saveEdit()
        } else {
          this.valid = false
        }
      } else {
        this.saveEdit()
      }
    },
    saveEdit () {
      this.$emit('input', this.tmpVal)
      this.$emit('on-save-edit', this.params)
    },
    canceltEdit () {
      this.tmpVal = this.value
      this.valid = true
      this.$emit('on-cancel-edit', this.params)
    },
    changeData (val) {
      this.tmpVal = val
    }
  }
}
</script>

<style lang="less">
  .tables-edit-outer {
    height: 100%;
    .tables-edit-con {
      position: relative;
      height: 100%;
      .value-con {
        vertical-align: middle;
      }
      .tables-edit-btn {
        position: absolute;
        right: 10px;
        top: 0;
        display: none;
      }
      &:hover {
        .tables-edit-btn {
          display: inline-block;
        }
      }
    }
    .tables-editting-con {
      .tables-edit-input {
        width: ~"calc(100% - 60px)";
      }
      .tables-edit-input-error{
        width: ~"calc(100% - 60px)";
        border: 1px solid red;
        box-shadow: 0 0 1px red;
        border-radius: 3px;
      }
    }
  }
</style>
