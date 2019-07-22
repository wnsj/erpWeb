<template>

  <div class='col-sm-8'>
    <table class="table table-bordered table-hover user-table">
      <thead>
        <tr>
          <th class="text-center"><span style="color: red;">*</span>名称</th>
          <th class="text-center"><span style="color: red;">*</span>数量</th>
          <th class="text-center"><span style="color: red;">*</span>规格与要求 </th>
          <th class="text-center">备注</th>
          <th class="text-center">删除</th>
          <th class="text-center"></th>
        </tr>
        <tr v-for="(item,index) in officeDataList" :key='index'>
          <td class="text-center" @click="isShow('spanId_'+index,'selectId_'+index)">
            <span style="display: block;" :id="'spanId_'+index">{{item.name}}</span>
            <select name="select" :id="'selectId_'+index" @change="selectChange('selectId_'+index,'textId_'+index)"
              v-model="item.name" style="position: relative;width: 120px;height: 28px;display: none;">
              <option v-for="(ite,idx) in testList" :key="idx" :value="ite.key">{{ite.key}}</option>
              <option :value="0">选择输入</option>
            </select>
            <input type="text" :id="'textId_'+index" placeholder="请输入名称..." v-model="item.name" style="display: none; position: absolute;
              width: 100px;height: 28px; border: 1;outline: none;display: none;" />
          </td>
          <td class="text-center">2</td>
          <td class="text-center">3</td>
          <td class="text-center">4</td>
          <td class="text-center">5</td>
          <td class="text-center">6</td>
        </tr>
      </thead>
    </table>
    <button v-on:click="testFnction()">testFnction</button>
  </div>

</template>

<script>
  import axios from 'axios'
  import $ from 'jquery'
  import {
    moment
  } from 'moment'

  export default {
    data() {
      return {
        checkEmpList: [],
        isValue: true,
        isHidden: true,
        testList: [{
          key: 'value1'
        }, {
          key: 'value2'
        }, {
          key: 'value3'
        }, {
          key: 'value4'
        }],
        officeDataList: [{
          name: '小本',
          num: 1,
          specification: '本'
        }, {
          name: '笔',
          num: 1,
          specification: '只'
        }, {
          name: '桌子',
          num: 1,
          specification: '张'
        }]
      }
    },
    methods: {
      isShow(spanId, selectId) {
        console.log("spanId:" + spanId + ",selectId:" + selectId);
        var oSelect = document.getElementById(selectId);
        var oText = document.getElementById(spanId);
        console.log(" oSelect.style.display:" + oSelect.style.display)
        oSelect.style.display = "block";
        oText.style.display = "none";
      },
      userAllInfo: function() {
        return {
          'id': 0,
          'name': 'muwenliang',
          'position': 'java组长',
          'depart': '公共事业部'
        }
      },
      testFnction: function() {
        alert('1')
        // this.getProject()
        // alert('2')
        // if (this.isValue == true) {
        //   alert('isvalue:' + this.isValue)
        // } else {
        //   alert('isvalue:' + this.isValue)
        // }

        this.officeDataList.forEach(item => {
          console.log("officeDataList:" + item)
        })
      },
      // 获取所有项目
      getProject: function() {
        var url = this.url + '/search/projectList'

        axios.get(url).then((response) => {
            this.projectList = response.data
            this.isValue = false
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error)
          });
      },
      selectChange(selectId, textId) {
        var oSelect = document.getElementById(selectId);
        var oText = document.getElementById(textId);
        if (oSelect.value == "0") {
          oText.value = '';
          oSelect.name = '';
          oText.name = 'select';
          oText.style.display = "block";
        } else {
          oSelect.name = 'select';
          oText.name = '';
          oText.style.display = "none";
        }
      }
    },
    mounted() {

    }
  }
</script>

<style>
  #select {
    position: relative;
    width: 120px;
    height: 28px;
  }

  #text {
    position: absolute;
    left: 92px;
    top: 47px;
    width: 100px;
    height: 28px;
    border: 1;
    outline: none;
    display: none;
  }
</style>
