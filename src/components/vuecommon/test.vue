<template>
  <center id="testId">
    <h2>websocket的使用</h2>
    请输入Id：
    <input id="accountId" type="text">
    <button @click="startConection()">点击建立连接</button>
    <hr />
    <input id="text" type="text" />
    <button @click="send()">发送消息</button>
    <hr />
    <button @click="closeWebSocket()">关闭WebSocket连接</button>
    <hr />
    <div id="message"></div>
    <button id="button" @click="sendFMesg">有人想加你为好友</button>
    <p id="text"></p>
  </center>
</template>

<script>
  import axios from 'axios'
  import {
    CallVueMethod
  } from '@/assets/js/constant'
	
	var change=1
  export default {
    data() {
      return {
        files: [],
        uploadSuccess: 0,
        websocket: {},
        accountId: '123',
        lockReconnect: false
      }
    },
    methods: {
      setWebSocket() {
        CallVueMethod.setApproves(this.websocket);
      },
      startConection() {
        //判断当前浏览器是否支持WebSocket
        //var url = this.url.replace("http", 'wss').concat("/websocket/").concat(this.accountId);
        var url = "ws://172.16.213.210:8080/ERP/websocket/" + this.accountId;
        if ('WebSocket' in window) {

          this.websocket = new WebSocket(url);
        } else if ('MozWebSocket' in window) {
          this.websocket = new MozWebSocket(url);
        } else {
          this.websocket = new SockJS("http://172.16.2.248:8080/websocket/" + this.accountId);
        }
        this.setWebSocket();

        //连接发生错误的回调方法
        this.websocket.onerror = function() {
          this.lockReconnect = false;
          let innerHTML = "WebSocket连接发生错误";
          document.getElementById('message').innerHTML += innerHTML + '<br/>';
        };

        //连接成功建立的回调方法
        this.websocket.onopen = function() {
          let innerHTML = "WebSocket连接成功";
          document.getElementById('message').innerHTML += innerHTML + '<br/>';
        }

        //接收到消息的回调方法
        this.websocket.onmessage = function(event) {
					console.log('change:'+change)
					console.log('this-websocket-onmessage')
          let innerHTML = event.data;
          this.lockReconnect = false;
          document.getElementById('message').innerHTML += innerHTML + '<br/>';
        }

        //连接关闭的回调方法
        this.websocket.onclose = function() {
          let innerHTML = "WebSocket连接关闭";
          document.getElementById('message').innerHTML += innerHTML + '<br/>';
        }


        setInterval(function() {
          CallVueMethod.getApproves().send("心跳检测");
        }, 10 * 1000);

      },

      //关闭WebSocket连接
      closeWebSocket() {
        this.websocket.close();
      },

      //发送消息
      send() {
        var message = document.getElementById('text').value;
        this.websocket.send(message);
      },
      checkHeart() {
        if (this.lockReconnect) return;
        var message = "心跳检测";
        this.websocket.send(message);
        // if (this.websocket == null || this.websocket.readyState != WebSocket.OPEN) {
        //   this.reconnect();
        //   this.initEvent();
        // } else {
        //   var message = "心跳检测";
        //   this.websocket.send(message);
        // }
      },
      reconnect() {
        if (this.lockReconnect) {
          return;
        };
        this.lockReconnect = true;
        //没连接上会一直重连，设置延迟避免请求过多
        this.startConection();
        this.lockReconnect = false;
        // setTimeout(function() {
        //   this.startConection();
        //   this.lockReconnect = false;
        // }, 4000);
      },
      initEvent() {
        //连接发生错误的回调方法
        this.websocket.onerror = function() {
          this.lockReconnect = false;
          let innerHTML = "WebSocket连接发生错误";
          document.getElementById('message').innerHTML += innerHTML + '<br/>';
        };

        //连接成功建立的回调方法
        this.websocket.onopen = function() {
          let innerHTML = "WebSocket连接成功";
          document.getElementById('message').innerHTML += innerHTML + '<br/>';
        }

        //接收到消息的回调方法
        this.websocket.onmessage = function(event) {
          let innerHTML = event.data;
          this.lockReconnect = false;
          document.getElementById('message').innerHTML += innerHTML + '<br/>';
        }

        //连接关闭的回调方法
        this.websocket.onclose = function() {
          let innerHTML = "WebSocket连接关闭";
          document.getElementById('message').innerHTML += innerHTML + '<br/>';
        }

        setInterval(this.checkHeart(), 10 * 1000);
      },
      initDate() {},
      popNotice() {
        if (!window.Notification) {
          alert('浏览器不支持Notification');
          return;
        }
        //var button = document.getElementById('button');
        var text = document.getElementById('text');
        var title = "Hi，帅哥：";
        var context = {
          body: '可以加你为好友吗？',
          icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565946516414&di=2f925456dfc0bbfc8ba457c6e38fb0ce&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201607%2F13%2F20160713110827_vyiPR.thumb.700_0.png'
        }
        // 检查用户是否同意接受通知
        if (Notification.permission == "granted") {
          var notification = new Notification(title, context);
          notification.onclick = function() {
            text.innerHTML = '张小姐已于' + new Date().toTimeString().split(' ')[0] + '加你为好友！';
            window.open("https://172.16.213.210/ERP/dist/index.html#/perAnalysis/poresonnel");
            notification.close();
          };
        } else if (Notification.permission !== 'denied') {
          // 否则我们需要向用户获取权限
          Notification.requestPermission(function(permission) {
            // 如果用户同意，就可以向他们发送通知
            if (permission === "granted") {
              var notification = new Notification(title, context);
              notification.onclick = function() {
                text.innerHTML = '张小姐已于' + new Date().toTimeString().split(' ')[0] + '加你为好友！';
                window.open("http://www.baidu.com");
                notification.close();
              };
            }
          });
        }
      },
      sendFMesg() {
        this.popNotice();
      }
    },
    mounted() {
      //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function() {
        this.closeWebSocket();
      }
      //this.startConection();
    }

  }
</script>

<style>

</style>
<!-- accountInfo:{"permission":["1","2","3","4","5","6","7","70","72","74"],
"accessToken":"624d10794d40e33d7d81328e1aeba12f",
"account":{"departId":"55","departName":"开发组",
"positionName":"研发组长","account_State":"在用",
"account_Name":"王杰林","account_ID":"239","account_Pwd":"",
"position_ID":"73","account_Mac":null}} -->
<!-- // if (this.websocket != null) {
        //   switch (this.websocket.readyState) {
        //     case WebSocket.CONNECTING:
        //       // 值为0，表示正在连接。
        //       break;
        //     case WebSocket.OPEN:
        //       // 值为1，表示连接成功，可以通信了
        //       alert("已经连接了!");
        //       return;
        //     case WebSocket.CLOSING:
        //       // 值为2，表示连接正在关闭。
        //       break;
        //     case WebSocket.CLOSED:
        //       // 值为3，表示连接已经关闭，或者打开连接失败
        //       break;
        //   }
        // }
        //var accountId = document.getElementById('accountId').value;
        //this.accountId = accountId; -->
