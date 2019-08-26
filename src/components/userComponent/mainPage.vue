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
    CallVueMethod,
    isBlank
  } from '@/assets/js/constant.js'

  // const exportMethod = null;
  const exportMethod = {
    method: null,
    setMethod(method) {
      this.method = method;
    },
    getMethod(title,context) {
      return this.method;
    }
  }
  //
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
        accountId: ''
      }
    },
    methods: {
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
        }
      },
      //建立WEBSOCKET连接
      STAFF_WEBSOCKET() {
        //var url = "ws://172.16.213.210:8080/ERP/websocket/" + accountId;
        var websocket = null;
        var url = "ws://172.16.56.1:8080/websocket/" + this.accountId;
        if ('WebSocket' in window) {
          websocket = new WebSocket(url);
        } else if ('MozWebSocket' in window) {
          websocket = new MozWebSocket(url);
        } else {
          websocket = new SockJS("http://172.16.56.1:8080/websocket/" + this.accountId);
        }
        this.STAFF_UPDATEWEBSOCKET(websocket);
      },
      //重新连接WEBSOCKET
      reConnect() {
        if (this.websocketConnectSucess) return;
        setTimeout(this.STAFF_WEBSOCKET(), 30000);
        if (!this.websocketConnectSucess) this.reConnect();
      },
      //心跳检测
      checkHeart() {
        if (this.websocket.readyState == this.websocket.CONNECTING) {
          console.log("websocket 连接中。。。")
        } else if (this.websocket.readyState == this.websocket.OPEN) {
          this.websocket.send("心跳检测!");
        } else {
          // this.websocketConnectSucess = false;
          // this.reConnect();
        }
      },
      //连接成功，初始化websocket
      STAFF_UPDATEWEBSOCKET(websocket) {
        this.websocket = websocket;
        CallVueMethod.setApproves(this.checkHeart);
        //连接成功建立的回调方法
        this.websocket.onopen = function() {
          this.websocketConnectSucess = true;
          console.log("websocket 连接成功!")
        }

        //连接发生错误的回调方法
        this.websocket.onerror = function() {
          this.websocketConnectSucess = false;
          console.log("WebSocket连接发生错误")
        };

        //接收到消息的回调方法
        this.websocket.onmessage = function(event) {
          this.websocketConnectSucess = true;
          var resData = event.data;
          console.log("接收到消息:" + resData);
          if (!isBlank(resData)) {
            //if (resData.retCode == '1111') return;
            //var contentData = resData.retData;
            // var title = contentData.title;
            // var body = contentData.body;
            //exportMethod.getMethod();
           // that.$options.methods.
           //that.$options.methods.popNotice('123','456');
           //that.$options.methods.popNotice('123','456')
          }
        }

        //连接关闭的回调方法
        this.websocket.onclose = function() {
          this.websocketConnectSucess = false;
          let innerHTML = "WebSocket连接关闭";
          console.log(innerHTML);
        }
        setInterval(CallVueMethod.getApproves(), 10 * 1000);
      },
      //关闭WebSocket连接
      closeWebSocket() {
        this.websocket.close();
      },
      popNotice(title, context) {
        if (!window.Notification) {
          alert('浏览器不支持Notification');
          return;
        }
        // var text = document.getElementById('text');
        // var title = "Hi，帅哥：";
        // var context = {
        //   body: '可以加你为好友吗？',
        //   icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565946516414&di=2f925456dfc0bbfc8ba457c6e38fb0ce&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201607%2F13%2F20160713110827_vyiPR.thumb.700_0.png'
        // }
        // 检查用户是否同意接受通知
        if (Notification.permission == "granted") {
          var notification = new Notification(title, context);
          notification.onclick = function() {
            if (!isBlank(context.url)) window.open(context.url);
            notification.close();
          };
        } else if (Notification.permission !== 'denied') {
          // 否则我们需要向用户获取权限
          Notification.requestPermission(function(permission) {
            // 如果用户同意，就可以向他们发送通知
            if (permission === "granted") {
              var notification = new Notification(title, context);
              notification.onclick = function() {
                if (!isBlank(context.url)) window.open(context.url);
                notification.close();
              };
            }
          });
        }
      }
    },
    created() {

    },
    mounted() {
      init();
      this.accountData = JSON.parse(Cookies.get("accountData"));
      this.accountId = this.accountData.account.account_ID;
      if (!this.isBlank(this.accountData.account.account_ID)) {
        this.STAFF_WEBSOCKET();
        //this.reConnect();
      }
      //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function() {
        this.closeWebSocket();
      }

      exportMethod.setMethod(this.popNotice);
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
