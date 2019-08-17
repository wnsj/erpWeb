<!-- author:dingdong -->
<template>
  <div class="tab-pane fade" id="apply">
    <div class="apply_info clearfix">
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">应聘渠道：</label>
        <div class="col-md-3">
          <channel :channelId="apply.channelAddId" ref="channel" @channelChange='getChannelAddId'></channel>
        </div>
        <label class="col-md-2 control-label text-right nopad">邀约时间：</label>
        <div class="col-md-3">
          <date-picker v-model="apply.invitationDate" type="date" format="YYYY-MM-DD"></date-picker>
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">应聘部门：</label>
        <div class="col-md-3">
          <department @departChange='getDepartAddId' ref="dept"></department>
        </div>
        <label class="col-md-2 control-label text-right nopad">应聘职位：</label>
        <div class="col-md-3">
          <positionInfo :pid="apply.positionAddId" ref="position" @jobChange='getPositionAddId'></positionInfo>
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">期望薪资：</label>
        <div class="col-md-3">
          <input type="text" class="form-control" value="0" v-model="apply.wages">
        </div>
        <label class="col-md-1 control-label nopad">元</label>
      </div>
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">面试官：</label>
        <div class="col-md-3">
          <input type="text" class="form-control" v-model="apply.interviewer">
        </div>
        <label class="col-md-2 control-label text-right nopad">面试时间：</label>
        <div class="col-md-3">
          <date-picker v-model="apply.recruitDate" type="date" format="YYYY-MM-DD"></date-picker>
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">面试得分：</label>
        <div class="col-md-3">
          <input type="text" class="form-control" value="0" min="0" max="100" v-model="apply.score">
        </div>
        <label class="col-md-2 control-label text-right nopad">是否合格：</label>
        <div class="col-md-3">
          <select class="form-control" v-model="apply.isQualified">
            <option v-for="(item,index) in qualifiedStatus" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">是否报销路费：</label>
        <div class="col-md-3">
          <select class="form-control" v-model="apply.isPay">
            <option v-for="(item,index) in isPayStatus" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-md-2 control-label text-right nopad">备注：</label>
        <div class="col-md-10">
          <textarea class="textarea" placeholder="Remark" v-model="apply.remark"></textarea>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import moment from 'moment'
  import DatePicker from 'vue2-datepicker'
  import positionInfo from '../../../vuecommon/positionInfo.vue'
  import channel from '../../../vuecommon/channel.vue'
  import department from '../../../vuecommon/department.vue'

  export default {
    components: {
      moment,
      DatePicker,
      channel,
      department,
      positionInfo
    },
    data() {
      return {
        apply: {
          channelAddId:'',
          departAddId: '0',
          isQualified: '2',
          isPay: '0',
          positionAddId: '',
        },
        qualifiedStatus: [
          {value: '2', label: '待定'},
          {value: '1', label: '是'},
          {value: '0', label: '否'},
        ],
        isPayStatus: [
          {value: '0', label: '否'},
          {value: '1', label: '是'},
        ],
      };
    },
    methods: {
      getChannelAddId(val) {   // 渠道
        this.apply.channelAddId = val
      },
      getDepartAddId(val) {   // 部门
        this.apply.departAddId = val
      },
      getPositionAddId(positionId) { // 职位
        this.apply.positionAddId = positionId
      },
      initApply() {
        Object.assign(this.$data, this.$options.data())
        this.$refs.channel.getChannel()
        this.$refs.channel.setChannelId('')
        this.$refs.dept.setDpart(0)
        this.$refs.position.getPositionInfo()
        this.$refs.position.setPositionId('')
      }
    }
  }
</script>

<style>
  .textarea {
    resize: none;
    width: 79%;
    height: 120px;
  }

  .apply_info {
    margin-top: 30px;
  }
</style>
