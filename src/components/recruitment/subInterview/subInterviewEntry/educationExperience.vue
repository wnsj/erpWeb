<!-- author:dingdong -->
<template>
  <div class="tab-pane fade" id="education">
    <div class="eduExp_info clearfix">
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">学历：</label>
        <div class="col-md-3">
          <select class="form-control" v-model="eduAndExpInfo.education">
            <option v-for="(item,index) in educationState" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
        <label class="col-md-2 control-label text-right nopad">专业：</label>
        <div class="col-md-3">
          <input type="text" class="form-control" v-model="eduAndExpInfo.profession"/>
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">毕业时间：</label>
        <div class="col-md-3">
          <date-picker v-model="eduAndExpInfo.graduation" type="date" format="YYYY-MM-DD"></date-picker>
        </div>
        <label class="col-md-2 control-label text-right nopad">是否在学：</label>
        <div class="col-md-3">
          <select class="form-control" v-model="eduAndExpInfo.atSchool">
            <option v-for="(item,index) in atSchoolStatus" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">毕业学校：</label>
        <div class="col-md-4">
          <input type="text" class="form-control" v-model="eduAndExpInfo.school">
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">相关经验：</label>
        <div class="col-md-2">
          <input type="text" value="0" class="form-control" v-model="eduAndExpInfo.workexp">
        </div>
        <label class="col-md-1 control-label nopad">个月</label>
      </div>
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">工作单位：</label>
        <div class="col-md-8">
          <input type="text" class="form-control" v-model="eduAndExpInfo.workCompany">
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">技能证书：</label>
        <div class="col-md-8">
          <input type="text" class="form-control" v-model="eduAndExpInfo.certificate">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker'
  export default {
    components: {
      DatePicker
    },
    data() {
      return {
        eduAndExpInfo: {
          education: '0',
          atSchool: '0',
        },
        educationState: [
          {value: '0', label: '未知'},
          {value: '1', label: '博士'},
          {value: '2', label: '硕士研究生'},
          {value: '3', label: '本科'},
          {value: '4', label: '专科'},
          {value: '5', label: '高中/中专'},
          {value: '6', label: '初中及以下'},
        ],
        atSchoolStatus: [
          {value: '0', label: '否'},
          {value: '1', label: '是'},
        ],
      };
    },
    methods: {
      initEdu(){
        Object.assign(this.$data, this.$options.data())
      }
    }
  }
</script>

<style>
  .eduExp_info {
    margin-top: 30px;
  }
</style>
