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
  </center>
</template>

<script>
  import axios from 'axios'
  import $ from 'jquery'

  export default {
    data() {
      return {
        files: [],
        uploadSuccess: 0,
        websocket: {}
      }
    },
    methods: {
      startConection() {
        if (this.websocket != null) {
          switch (this.websocket.readyState) {
            case WebSocket.CONNECTING:
              // 值为0，表示正在连接。
              break;
            case WebSocket.OPEN:
              // 值为1，表示连接成功，可以通信了
              alert("已经连接了!");
              return;
            case WebSocket.CLOSING:
              // 值为2，表示连接正在关闭。
              break;
            case WebSocket.CLOSED:
              // 值为3，表示连接已经关闭，或者打开连接失败
              break;
          }
        }
        var accountId = document.getElementById('accountId').value;
        //判断当前浏览器是否支持WebSocket
        if ('WebSocket' in window) {
          this.websocket = new WebSocket("ws://172.16.56.1:8080/websocket/" + accountId);
        } else if ('MozWebSocket' in window) {
          this.websocket = new MozWebSocket("ws://172.16.56.1:8080/websocket/" + accountId);
        } else {
          this.websocket = new SockJS("http://172.16.56.1:8080/websocket/" + accountId);
        }
        //连接发生错误的回调方法
        this.websocket.onerror = function() {
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
          document.getElementById('message').innerHTML += innerHTML + '<br/>';
        }

        //连接关闭的回调方法
        this.websocket.onclose = function() {
          let innerHTML = "WebSocket连接关闭";
          document.getElementById('message').innerHTML += innerHTML + '<br/>';
        }
      },
      //将消息显示在网页上
      setMessageInnerHTML(innerHTML) {
        document.getElementById('message').innerHTML += innerHTML + '<br/>';
      },

      //关闭WebSocket连接
      closeWebSocket() {
        this.websocket.close();
      },

      //发送消息
      send() {
        var message = document.getElementById('text').value;
        this.websocket.send(message);
      }
    },
    created() {
      //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function() {
        this.closeWebSocket();
      }
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
