<template>
  <div class="root">
    <div class="container-fluid clear-mp" id="Odiv">
      <div class="row clear-mp">
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 my-aside clear-mp" id="Adiv">
          <div class="aside-logo">
            <h2 class="clear-mp">ERP系统</h2>
          </div>
          <ul id="aside-menu">
            <li>
              <i class="fa fa-university" aria-hidden="true"></i>人员及权限<i class="fa fa-sort-desc item-down" aria-hidden="true"></i>
            </li>
            <!-- 二级菜单 -->
            <ul class="second-menu">
              <li class="li-active">
                <router-link to="/employee"><i class="fa fa-circle" aria-hidden="true"></i>人员管理</router-link>
              </li>
              <li>
                <router-link to="/attendence"><i class="fa fa-table" aria-hidden="false"></i>考勤管理</router-link>
              </li>
              <li>
                <router-link to="/recruitment"><i class="fa fa-table" aria-hidden="false"></i>招聘管理</router-link>
              </li>
            </ul>
            <li>
              <i class="fa fa-university" aria-hidden="true"></i>人员信息表<i class="fa fa-sort-desc item-down" aria-hidden="true"></i>
            </li>
            <ul class="second-menu">
              <li>
                <router-link to="/perAnalysis/poresonnel"><i class="fa fa-circle" aria-hidden="false"></i>在职人员分析表</router-link>
              </li>
              <li>
                <router-link to="/perAnalysis/abnormal"><i class="fa fa-table" aria-hidden="false"></i>人力资源异动分析表</router-link>
              </li>
              <li>
                <router-link to="/perAnalysis/separation"><i class="fa fa-table" aria-hidden="false"></i>离职人员分析表</router-link>
              </li>
              <li>
                <router-link to="/perAnalysis/effectiveness"><i class="fa fa-table" aria-hidden="false"></i>招聘效果评估分析表</router-link>
              </li>
              <li>
                <router-link to="/perAnalysis/uilization"><i class="fa fa-table" aria-hidden="false"></i>人力资源利用率分析表</router-link>
              </li>
            </ul>
            <li>
              <i class="fa fa-university" aria-hidden="true"></i>无纸化办公<i class="fa fa-sort-desc item-down" aria-hidden="true"></i>
            </li>
            <ul class="second-menu">
              <li>
                <router-link to="/paperlessOffice/askForLeave"><i class="fa fa-table" aria-hidden="true"></i>请假</router-link>
              </li>
              <li>
                <router-link to="/paperlessOffice/restdown"><i class="fa fa-table" aria-hidden="true"></i>倒休</router-link>
              </li>
              <li>
                <router-link to="/report"><i class="fa fa-table" aria-hidden="true"></i>请假报备</router-link>
              </li>
              <li>
                <router-link to="/paperlessOffice/officeSuppliesManage"><i class="fa fa-table" aria-hidden="true"></i>办公用品管理</router-link>
              </li>
              <li>
                <router-link to="/clock"><i class="fa fa-table" aria-hidden="true"></i>忘打卡证明</router-link>
              </li>
            </ul>
            <!-- <li><i class="fa fa-area-chart" aria-hidden="true"></i>item</li> -->
          </ul>
        </div>
        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 my-content clear-mp" id="Cdiv">
          <nav class="navbar navbar-default my-navbar">
            <div class="container-fluid">
              <div class="navbar-header">
                <a class="navbar-brand my-navbar-brand" href="#">
                  <!-- <img alt="Brand" src="..."> -->
                  <i class="fa fa-home fa-2x"></i>
                </a>
              </div>
              <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav navbar-right my-signed">
                  <li>
                    <a href="#"><i class="fa fa-user fa-fw"></i>{{accountData.account.account_Name}}</a>
                  </li>
                  <li><a href="#">个人中心</a></li>
                  <li><a href="#" @click="loginOut">退出</a></li>
                </ul>
              </div>
            </div>
          </nav>

          <div class="embed-responsive embed-responsive-16by9 my-main">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Cookies from 'js-cookie'
  import {
    init
  } from '@/../static/js/common.js'

  export default {
    components: {},
    data() {
      return {
        accountInfo: this.$store.state.accountInfo,
        accountData: {
          account: ''
        }
      }
    },
    methods: {
      //用户退出
      loginOut() {
        if (confirm("确定退出?") == false) {
          this.$parent.setRouter("/mainPage");
          return;
        } else {
          //删除cookie
          Cookies.remove("accountData");
          Cookies.remove("accessToken");
          this.$parent.setRouter("/login");
        }
      }
    },
    created() {

    },
    mounted() {
      this.accountData = JSON.parse(Cookies.get("accountData"));
      this.account = this.accountData.account_Name;
      init();
    },
    computed: {
      // accountInfo() {
      // 	return
      // }
    }
  }
</script>

<style>
</style>
