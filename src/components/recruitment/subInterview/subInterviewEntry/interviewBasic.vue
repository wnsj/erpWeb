<!-- author:dingdong -->
<template>
  <div class="tab-pane fade in active martop" id="basic">
    <form action="">
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">姓名：</label>
        <div class="col-md-3">
          <input type="text" class="form-control" v-model="interviewBase.name">
        </div>
        <label class="col-md-2 control-label text-right nopad">性别：</label>
        <div class="col-md-3">
          <select class="form-control" v-model="interviewBase.sex">
            <option v-for="(item,index) in sexStatus" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">民族：</label>
        <div class="col-md-3">
          <nation @nationChange='nationChange' ref="nation"></nation>
        </div>
        <label class="col-md-2 control-label text-right nopad">出生日期：</label>
        <div class="col-md-3">
          <date-picker v-model="interviewBase.birth" type="date" format="YYYY-MM-DD"></date-picker>
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">电话：</label>
        <div class="col-md-3">
          <input type="text" class="form-control" v-model="interviewBase.phone">
        </div>
        <label class="col-md-2 control-label text-right nopad">政治面貌：</label>
        <div class="col-md-3">
          <select class="form-control" v-model="interviewBase.ploitical">
            <option v-for="(item,index) in ploiticalState" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">邮箱：</label>
        <div class="col-md-3">
          <input type="text" class="form-control" v-model="interviewBase.mail">
        </div>
        <label class="col-md-2 ontrol-label text-right nopad">身份证号：</label>
        <div class="col-md-3">
          <input type="text" class="form-control" v-model="interviewBase.idNum">
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">QQ：</label>
        <div class="col-md-3">
          <input type="text" class="form-control" v-model="interviewBase.qq">
        </div>
        <label class="col-md-2 control-label text-right nopad">婚姻：</label>
        <div class="col-md-3">
          <select class="form-control" v-model="interviewBase.marital">
            <option v-for="(item,index) in maritalStatus" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">身高：</label>
        <div class="col-md-2">
          <input type="number" class="form-control" value="0" min="0" max="200" v-model="interviewBase.height">
        </div>
        <label class="col-md-1 control-label nopad">cm</label>
        <label class="col-md-2 ontrol-label text-right nopad">体重：</label>
        <div class="col-md-2">
          <input type="number" class="form-control" value="0" min="0" max="200" v-model="interviewBase.weight">
        </div>
        <label class="col-md-1 control-label nopad">kg</label>
      </div>
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">血型：</label>
        <div class="col-md-3">
          <select class="form-control" v-model="interviewBase.bloodType">
            <option v-for="(item,index) in bloodTypes" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
        <label class="col-md-2 control-label text-right nopad">户口性质：</label>
        <div class="col-md-3">
          <select class="form-control" v-model="interviewBase.accountProp">
            <option v-for="(item,index) in accountPropState" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">籍贯：</label>
        <div class="col-md-4">
          <input type="text" class="form-control" v-model="interviewBase.homeTown">
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">现住址：</label>
        <div class="col-md-8">
          <input type="text" class="form-control" v-model="interviewBase.address">
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">家庭住址：</label>
        <div class="col-md-8">
          <input type="text" class="form-control" v-model="interviewBase.homeAddress">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker'
  import nation from '../../../vuecommon/nation.vue'

  export default {
    components: {
      DatePicker,
      nation
    },
    data() {
      return {
        interviewBase: {
        },
        sexStatus: [
          {value: '1', label: '男'},
          {value: '0', label: '女'},
        ],
        ploiticalState: [
          {value: '0', label: '群众'},
          {value: '1', label: '团员'},
          {value: '2', label: '党员'},
        ],
        maritalStatus: [
          {value: '0', label: '未婚'},
          {value: '1', label: '已婚'},
        ],
        bloodTypes: [
          {value: '0', label: 'A'},
          {value: '1', label: 'B'},
          {value: '2', label: 'O'},
          {value: '3', label: 'AB'},
          {value: '4', label: '特殊'}
        ],
        accountPropState: [
          {value: '0', label: '农业'},
          {value: '1', label: '非农业'},
        ]
      };
    },
    methods: {
      initBasic(){
        Object.assign(this.$data, this.$options.data())
        this.$refs.nation.setNation('')
      },
      nationChange: function (nationName) {
        this.interviewBase.uNationName = nationName
      }
    }
  }
</script>

<style>
  .nopad {
    padding-left: 0;
    padding-right: 0;
    line-height: 34px;
  }

  .martop {
    margin-top: 30px;
  }
</style>
