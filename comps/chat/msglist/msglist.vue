<template>
<view>
<template name="txt">
	<text class="msg-text" style="float:left">{{ item.data }}</text>
</template>
<template name="emoji">
	<image class="avatar" :src="'../../../images/faces/' + item.data" style="width:25px height:25px margin:0 0 2px 0 float:left"></image>
</template>
<template name="img">
	<image class="avatar" :src="item.msg.data" style="width:90px height:120px margin:2px auto" mode="aspectFit" @tap="previewImage" :data-url="item.msg.data"></image>
</template>
<template name="video">
	<video :src="item.msg.data" controls autoplay></video>
</template>
<template name="audio">
	<audio :src="item.msg.url" controls autoplay></audio>
</template>


<!-- view 换成 scroll-view效果更好 用view是为了要stopPullDownRefresh -->
<view scroll-y="true" :class="view + ' wrap ' + (isIPX?'scroll_view_X': '')" @tap="onTap" @scroll="scrollmore" @scrolltoupper="refresh" upper-threshold="-50" :scroll-into-view="toView">
	<view class="message" v-for="(item, mid) in chatMsg" :key="mid" :id="item.mid">
		<!-- <view class="time">
			<text class="time-text">{{ item.time }}</text>
		</view> -->
		<view class="main">
			<view class="user">
				<!-- yourname：就是消息的 from -->
				<text class="user-text">{{ item.yourname + ' ' + item.time}}</text>
			</view>
			<image class="avatar" src="/static/images/theme@2x.png"></image>
			<view class="msg">
				<image :class="'err ' + ((item.style == 'self' && item.isFail) ? 'show' : 'hide')" src="/static/images/msgerr.png"></image>

				<image v-if="item.style == 'self'" src="/static/images/poprightarrow@2x.png" class="msg_poprightarrow"></image>
				<image v-if="item.style == ''" src="/static/images/popleftarrow@2x.png" class="msg_popleftarrow"></image>
				<view v-if="item.msg.type == 'img' || item.msg.type == 'video'">
					<!-- 下行template对应的wxml不存在，无法替换，代码已注释 -->
<!-- <template :is="item.msg.type" :data="item"></template>-->

				</view>
				<audio-msg v-if="item.msg.type == 'audio'" :msg="item"></audio-msg>
				<view v-else-if="item.msg.type == 'txt' || item.msg.type == 'emoji'" :data-msg="item" @tap="clickMsg">
					<view class="template" v-for="(item, index) in item.msg.data" :key="index">
						<!-- 下行template对应的wxml不存在，无法替换，代码已注释 -->
<!-- <template :is="item.type" :data="item"></template>-->

					</view>
				</view>
			</view>
		</view>
	</view>
</view>
<view style="height: 1px"></view>
</view>
</template>

<script>
let msgStorage = require("../msgstorage");
let disp = require("../../../utils/broadcast");
let LIST_STATUS = {
  SHORT: "scroll_view_change",
  NORMAL: "scroll_view"
};
let page = 0;
let Index = 0;
let curMsgMid = '';
let isFail = false;
import audioMsg from "./type/audio/audio";

export default {
  data() {
    return {
      view: LIST_STATUS.NORMAL,
      toView: "",
      chatMsg: [],
      __visibility__: false,
      isIPX: false
    };
  },

  components: {
    audioMsg
  },
  props: {
    username: {
      type: Object,
      default: () => ({})
    }
  },

  // lifetimes
  created() {},

  beforeMount() {
    this.__visibility__ = true;
    page = 0;
    Index = 0;
  },

  moved() {},

  destroyed() {
    this.__visibility__ = false;
  },

  mounted(event) {
    let me = this;

    if (getApp().globalData.isIPX) {
      this.setData({
        isIPX: true
      });
    }

    let username = this.username;
    let myUsername = wx.getStorageSync("myUsername");
    let sessionKey = username.groupId ? username.groupId + myUsername : username.your + myUsername;
    let chatMsg = wx.getStorageSync(sessionKey) || [];
    this.renderMsg(null, null, chatMsg, sessionKey);
    wx.setStorageSync(sessionKey, null); // disp.on("em.chat.sendSuccess", function(mid){
    // 	curMsgMid = mid
    // 	console.log('发送过去了', mid)
    // 	let msgList = me.data.chatMsg
    // 	msgList.map((item) =>{
    // 		if (item.mid.substring(item.mid.length - 10) == mid.substring(mid.length - 10)) {
    // 			console.log(111111, item)
    // 			item.msg.data[0].isSuc = true
    // 			item.isSuc = true
    // 			me.setData({
    // 				chatMsg: msgList
    // 			})
    // 		}
    // 	})
    // 	if (me.curChatMsg[0].mid == curMsgMid) {
    // 		me.curChatMsg[0].msg.data[0].isShow = true
    // 		me.curChatMsg[0].isShow = true
    // 	}
    // 	wx.setStorageSync("rendered_" + sessionKey, msgList);
    // 	console.log('msgList', msgList)
    // })

    disp.on('em.xmpp.error.sendMsgErr', function (err) {
      curMsgMid = err.data.mid;
      isFail = true;
      return;
      console.log('发送失败了');
      let msgList = me.chatMsg;
      msgList.map(item => {
        if (item.mid.substring(item.mid.length - 10) == curMsgMid.substring(curMsgMid.length - 10)) {
          item.msg.data[0].isFail = true;
          item.isFail = true;
          me.setData({
            chatMsg: msgList
          });
        }
      });

      if (me.curChatMsg[0].mid == curMsgMid) {
        me.curChatMsg[0].msg.data[0].isShow = false;
        me.curChatMsg[0].isShow = false;
      }

      wx.setStorageSync("rendered_" + sessionKey, msgList);
    });
    msgStorage.on("newChatMsg", function (renderableMsg, type, curChatMsg, sesskey) {
      me.curChatMsg = curChatMsg;
      if (!me.__visibility__) return; // 判断是否属于当前会话

      if (username.groupId) {
        // 群消息的 to 是 id，from 是 name
        if (renderableMsg.info.from == username.groupId || renderableMsg.info.to == username.groupId) {
          if (sesskey == sessionKey) {
            me.renderMsg(renderableMsg, type, curChatMsg, sessionKey, 'newMsg');
          }
        }
      } else if (renderableMsg.info.from == username.your || renderableMsg.info.to == username.your) {
        if (sesskey == sessionKey) {
          me.renderMsg(renderableMsg, type, curChatMsg, sessionKey, 'newMsg');
        }
      }
    });
  },

  methods: {
    clickMsg(data) {
      console.log(1, data);

      if (data.currentTarget.dataset.msg.ext && data.currentTarget.dataset.msg.ext.msg_extension) {
        this.$emit("clickMsg", data.currentTarget.dataset.msg.ext);
      }
    },

    normalScroll() {
      this.setData({
        view: LIST_STATUS.NORMAL
      });
    },

    shortScroll() {
      this.setData({
        view: LIST_STATUS.SHORT
      });
    },

    onTap() {
      this.$emit("msglistTap", null, {
        bubbles: true
      });
    },

    previewImage(event) {
      var url = event.target.dataset.url;
      wx.previewImage({
        urls: [url] // 需要预览的图片 http 链接列表

      });
    },

    getHistoryMsg() {
      let me = this;
      let username = this.username;
      let myUsername = wx.getStorageSync("myUsername");
      let sessionKey = username.groupId ? username.groupId + myUsername : username.your + myUsername;
      let historyChatMsgs = wx.getStorageSync("rendered_" + sessionKey) || [];

      if (Index < historyChatMsgs.length) {
        let timesMsgList = historyChatMsgs.slice(-Index - 10, -Index);
        this.setData({
          chatMsg: timesMsgList.concat(me.chatMsg),
          toView: timesMsgList[timesMsgList.length - 1].mid
        });
        Index += timesMsgList.length;

        if (timesMsgList.length == 10) {
          page++;
        }

        wx.stopPullDownRefresh();
      }
    },

    renderMsg(renderableMsg, type, curChatMsg, sessionKey, isnew) {
      let me = this;

      if (curChatMsg.length > 1) {
        this.chatMsg.map(function (elem, index) {
          curChatMsg.map(function (item, i) {
            if (elem.mid == item.mid) {
              //me.data.chatMsg.splice(index, 1)
              curChatMsg.splice(i, 1);
            }
          });
        });
      }

      var historyChatMsgs = wx.getStorageSync("rendered_" + sessionKey) || []; // if (curChatMsg.length) {
      // 	console.log(curMsgMid.substring(curMsgMid.length - 10) , curChatMsg[0].mid.substring(curChatMsg[0].mid.length - 10))
      // }
      // if(curChatMsg.length && curMsgMid.substring(curMsgMid.length - 10) == curChatMsg[curChatMsg.length - 1].mid.substring(curChatMsg[0].mid.length - 10)){
      // 	//curChatMsg[curChatMsg.length - 1].msg.data[0].isSuc = true
      // 	curChatMsg[curChatMsg.length - 1].isSuc = true
      // }

      historyChatMsgs = historyChatMsgs.concat(curChatMsg); //console.log('当前历史',renderableMsg)
      //console.log('历史消息', historyChatMsgs)

      if (!historyChatMsgs.length) return;

      if (isnew == 'newMsg') {
        this.setData({
          chatMsg: this.chatMsg.concat(curChatMsg),
          // 跳到最后一条
          toView: historyChatMsgs[historyChatMsgs.length - 1].mid
        });
      } else {
        this.setData({
          chatMsg: historyChatMsgs.slice(-10),
          // 跳到最后一条
          toView: historyChatMsgs[historyChatMsgs.length - 1].mid
        });
      }

      wx.setStorageSync("rendered_" + sessionKey, historyChatMsgs);
      let chatMsg = wx.getStorageSync(sessionKey) || [];
      chatMsg.map(function (item, index) {
        curChatMsg.map(function (item2, index2) {
          if (item2.mid == item.mid) {
            chatMsg.splice(index, 1);
          }
        });
      });
      wx.setStorageSync(sessionKey, chatMsg);
      Index = historyChatMsgs.slice(-10).length;
      console.log('111111111', this.chatMsg);
      wx.pageScrollTo({
        scrollTop: 5000,
        duration: 300
      });
      this.$emit('render');

      if (isFail) {
        this.renderFail(sessionKey);
      }
    },

    renderFail(sessionKey) {
      let me = this;
      let msgList = me.chatMsg;
      msgList.map(item => {
        if (item.mid.substring(item.mid.length - 10) == curMsgMid.substring(curMsgMid.length - 10)) {
          item.msg.data[0].isFail = true;
          item.isFail = true;
          me.setData({
            chatMsg: msgList
          });
        }
      });

      if (me.curChatMsg[0].mid == curMsgMid) {
        me.curChatMsg[0].msg.data[0].isShow = false;
        me.curChatMsg[0].isShow = false;
      }

      wx.setStorageSync("rendered_" + sessionKey, msgList);
      isFail = false;
    }

  }
};
</script>
<style>
@import "./msglist.css";
</style>