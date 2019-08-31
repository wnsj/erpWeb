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
              <i class="fa fa-university" aria-hidden="true"></i>人员及权限<i class="fa fa-caret-down item-down" aria-hidden="true"></i>
            </li>
            <!-- 二级菜单 -->
            <ul class="second-menu">
              <li class="li-active">
                <router-link to="/employee"><i class="fa fa-circle" aria-hidden="true"></i>人员管理</router-link>
              </li>
              <li>
                <router-link to="/attendence"><i class="fa fa-table" aria-hidden="false" id="people02"></i>考勤管理</router-link>
              </li>
              <li>
                <router-link to="/recruitment"><i class="fa fa-table" aria-hidden="false" id="people03"></i>招聘管理</router-link>
              </li>
            </ul>
            <li>
              <i class="fa fa-university" aria-hidden="true" id="people04"></i>人员信息表<i class="fa fa-caret-down item-down"
                aria-hidden="true"></i>
            </li>
            <ul class="second-menu">
              <li>
                <router-link to="/perAnalysis/poresonnel"><i class="fa fa-circle" aria-hidden="false" id="people05"></i>在职人员分析表</router-link>
              </li>
              <li>
                <router-link to="/perAnalysis/abnormal"><i class="fa fa-table" aria-hidden="false" id="people06"></i>人力资源异动分析表</router-link>
              </li>
              <li>
                <router-link to="/perAnalysis/separation"><i class="fa fa-table" aria-hidden="false" id="people07"></i>离职人员分析表</router-link>
              </li>
              <li>
                <router-link to="/perAnalysis/effectiveness"><i class="fa fa-table" aria-hidden="false" id="people08"></i>招聘效果评估分析表</router-link>
              </li>
              <li>
                <router-link to="/perAnalysis/uilization"><i class="fa fa-table" aria-hidden="false" id="people09"></i>人力资源利用率分析表</router-link>
              </li>
            </ul>
            <li>
              <i class="fa fa-university" aria-hidden="true" id="offfice01"></i>无纸化办公<i class="fa fa-caret-down item-down"
                aria-hidden="true"></i>
            </li>
            <ul class="second-menu">
              <li>
                <router-link to="/paperlessOffice/askForLeave"><i class="fa fa-circle" aria-hidden="true" id="offfice02"></i>请假</router-link>
              </li>
              <li>
                <router-link to="/paperlessOffice/restdown"><i class="fa fa-table" aria-hidden="true" id="offfice03"></i>倒休</router-link>
              </li>
              <li>
                <router-link to="/paperlessOffice/report"><i class="fa fa-table" aria-hidden="true" id="offfice04"></i>请假报备</router-link>
              </li>
              <li>
                <router-link to="/paperlessOffice/officeSuppliesManage"><i class="fa fa-table" aria-hidden="true" id="offfice05"></i>办公用品管理</router-link>
              </li>
              <li>
                <router-link to="/paperlessOffice/clock"><i class="fa fa-table" aria-hidden="true" id="offfice06"></i>忘打卡证明</router-link>
              </li>

              <li>
                <router-link to="/paperlessOffice/conferenceRoomManage"><i class="fa fa-table" aria-hidden="true" id="offfice07"></i>会议室管理</router-link>
              </li>
              <li>
                <router-link to="/paperlessOffice/computerPreApplication"><i class="fa fa-table" aria-hidden="true" id="offfice08"></i>电脑预申请</router-link>
              </li>
              <li>
                <router-link to="/paperlessOffice/empRequire"><i class="fa fa-table" aria-hidden="true" id="offfice09"></i>人员需求</router-link>
              </li>
              <li>
                <router-link to="/paperlessOffice/leaveOffice"><i class="fa fa-table" aria-hidden="true" id="offfice10"></i>离职管理</router-link>
              </li>
            </ul>
            <!-- <li><i class="fa fa-area-chart" aria-hidden="true" id="item01"></i>item</li> -->
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
  import {
    isBlank
  } from '@/assets/js/constant.js'

  var vm = null;
  var setIntervalObj = null;
  export default {
    components: {},
    data() {
      return {
        accountInfo: this.$store.state.accountInfo,
        accountData: {
          account: ''
        },
        websocket: null,
        websocketConnectSucess: false,
        accountId: '',
      }
    },
    methods: {
      requestData(url, rquestParam) {
        return new Promise((resolve, reject) => {
          axios({
            method: "post",
            url: url,
            headers: {
              "Content-Type": this.contentType,
              "Access-Token": this.$root.accountAccessToken
            },
            data: rquestParam,
            dataType: "json"
          }).then((response) => {
            resolve(response.data);
          }).catch(
            function(error) {
              reject(error)
            }
          );
        });
      },
      //用户退出
      loginOut() {
        if (confirm("确定退出?") == false) {
          // this.$parent.setRouter("/mainPage");
          return;
        } else {
          //删除cookie
          Cookies.remove("accountData");
          Cookies.remove("accessToken");
          this.$parent.setRouter("/login");
          this.closeWebSocket();
          this.accountId = '';
          this.clearInterval();
        }
      },
      //建立WEBSOCKET连接
      STAFF_WEBSOCKET() {
        var websocket = null;
        //var url = "wss://172.16.56.1:8080/websocket/" + this.accountId;
        var url = null;
        if (this.url.startsWith("https")) {
          url = this.url.replace("https", 'ws');
        } else {
          url = this.url.replace("http", 'ws');
        }
        url = url.concat("/websocket/").concat(this.accountId);
        if (this.websocket != null) this.websocket.close();
        if ('WebSocket' in window) {
          websocket = new WebSocket(url);
        } else if ('MozWebSocket' in window) {
          websocket = new MozWebSocket(url);
        } else {
          websocket = new SockJS("http://172.16.56.1:8080/websocket/" + this.accountId);
        }
        this.STAFF_UPDATEWEBSOCKET(websocket);
      },
      //心跳检测
      checkHeart() {
        if (this.websocket.readyState == this.websocket.CONNECTING) {
          //console.log("websocket 连接中。。。")
        } else if (this.websocket.readyState == this.websocket.OPEN) {
          this.websocket.send("心跳检测!");
        } else if (this.websocket.readyState == this.websocket.CLOSING) {
          //console.log("websocket 连接正在关闭。。。")
        } else if (this.websocket.readyState == this.websocket.CLOSED) {
          //console.log("websocket 连接已经关闭，或者打开连接失败。。。(--准备重新连接websocket--)")
          this.STAFF_WEBSOCKET();
        }
      },
      //连接成功，初始化websocket
      STAFF_UPDATEWEBSOCKET(websocket) {
        this.websocket = websocket;
        //连接成功建立的回调方法
        this.websocket.onopen = function() {
          console.log("websocket 连接成功!")
        }

        //连接发生错误的回调方法
        this.websocket.onerror = function() {
          console.log("WebSocket连接发生错误")
        };

        //接收到消息的回调方法
        this.websocket.onmessage = function(event) {
          var jsonString = event.data;
          //console.log("接收到消息:" + jsonString);
          if (!isBlank(jsonString)) {
            var title = "";
            var context = {};
            var url = "";
            var resData = JSON.parse(jsonString);
            if (resData.retCode == '1111') return;
            var contentData = resData.retData;
            title = contentData.title;
            context.body = contentData.body;
            if (!isBlank(contentData.url)) url = contentData.url;
            if (!isBlank(contentData.icon)) context.icon = contentData.icon;
            if (!window.Notification) {
              console.log('浏览器不支持Notification');
              return;
            }
            var notification = null;
            // 检查用户是否同意接受通知
            if (Notification.permission == "granted") {
              notification = new Notification(title, context);
            } else if (Notification.permission !== 'denied') {
              // 否则我们需要向用户获取权限
              Notification.requestPermission(function(permission) {
                // 如果用户同意，就可以向他们发送通知
                if (permission === "granted") {
                  notification = new Notification(title, context);
                }
              });
            }
            notification.onclick = function() {
              if (!isBlank(contentData.requestUrl)) {
                vm.requestData(contentData.requestUrl, contentData.requestParam).then((responseData) => {
                  if (responseData.retCode == '0000') {
                    //alert(responseData.retData);
                  } else {
                    //alert(responseData.retMsg);
                  }
                }, (error) => {
                  console.log("请求失败处理");
                });
              }
              if (!isBlank(url)) window.open(url, '_self');
              notification.close();
            };
          }
        }

        //连接关闭的回调方法
        this.websocket.onclose = function() {
          let innerHTML = "WebSocket连接关闭";
          console.log(innerHTML);
        }
        if (setIntervalObj != null) clearInterval(setIntervalObj);
        setIntervalObj = setInterval(function() {
          vm.checkHeart();
        }, 10000);
      },
      //关闭WebSocket连接
      closeWebSocket() {
        this.websocket.close();
      },
      //清除setInterval
      clearInterval() {
        if (setIntervalObj != null) clearInterval(setIntervalObj);
      }
    },
    created() {

    },
    mounted() {
      init();
      vm = this;
      this.accountData = JSON.parse(Cookies.get("accountData"));
      this.accountId = this.accountData.account.account_ID;
      if (!this.isBlank(this.accountData.account.account_ID)) {
        this.STAFF_WEBSOCKET();
      }
      //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function() {
        vm.closeWebSocket();
        vm.clearInterval();
      }
    },
    computed: {

    }
  }
</script>

<style>
  #people02:before {
    content: "\f1ae";
  }

  #people03:before {
    content: "\f0ae";
  }

  #people04:before {
    content: "\f0c0";
  }

  #people05:before {
    content: "\f044";
  }

  #people06:before {
    content: "\f0f0";
  }

  #people07:before {
    content: "\f0f0";
  }

  #people08:before {
    content: "\f007";
  }

  #people09:before {
    content: "\f080";
  }

  #offfice01:before {
    content: "\f109";
  }

  #offfice02:before {
    content: "\f044";
  }

  #offfice03:before {
    content: "\f0ec";
  }

  #offfice04:before {
    content: "\f0e8";
  }

  #offfice05:before {
    content: "\f115";
  }

  #offfice06:before {
    content: "\f09d";
  }

  #offfice07:before {
    content: "\f044";
  }

  #offfice08:before {
    content: "\f108";
  }

  #offfice09:before {
    content: "\f113";
  }

  #item01:before {
    content: "\f115";
  }

  #aside-menu a {
    color: #fff;
  }

  /* .fa-sort-down:before, .fa-sort-desc:before {
    content: "\f0dd";
	display: none;
} */
  /* .fa-sort-down:after, .fa-sort-desc:after {
    content: "\f0d8";
} */
</style>
