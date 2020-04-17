<template>
<view>
<view class="main" v-if="!showEmedia&&!showmultiEmedia">
	<chat-suit-audio ref="audio" :username="username" :chatType="chatType" @newAudioMsg="saveSendMsg"></chat-suit-audio>

	<chat-msglist ref="msglist" :username="username" @render="onRender" @clickMsg="onClickInviteMsg" @msglistTap="normalScroll"></chat-msglist>
</view>
	<chat-inputbar ref="inputbar" :username="username" :chatType="chatType" @newTextMsg="saveSendMsg" @newImageMsg="saveSendMsg" @newLocationMsg="saveSendMsg" @newVideoMsg="saveSendMsg" @tapSendAudio="toggleRecordModal" @inputFocused="shortScroll" @inputBlured="normalScroll" @makeVideoCall="onMakeVideoCall" @makeAudioCall="onMakeAudioCall" :style="'display: ' + inputbarVisible"></chat-inputbar>

	<!-- <chat-emedia 
		bind:createConfrSuccess="onCreateConfrSuccess"
		username="{{ username }}"
		wx:if="{{showEmedia}}"/> -->
		
	<chat-multiEmedia :style="'display: ' + multiEmediaVisible" :username="username" :action="emediaAction" @inviteMember="onInviteMember" @createConfrSuccess="onCreateConfrSuccess" @hangup="onHangup" v-if="showmultiEmedia"></chat-multiEmedia>

	<chat-emediaInvite :username="username" :action="action" @startConfr="onStartConfr" @goBack="onGoBack" v-if="showEmediaInvite"></chat-emediaInvite>
</view>
</template>

<script>
let msgStorage = require("./msgstorage");
let msgType = require("./msgtype");
let WebIM = require("../../utils/WebIM")["default"];
import chatMsglist from "./msglist/msglist";
import chatInputbar from "./inputbar/inputbar";
import chatSuitAudio from "./inputbar/suit/audio/audio";
import chatEmedia from "./emedia/emedia";
import chatMultiEmedia from "./multiEmedia/multiEmedia";
import chatEmediaInvite from "./emediaInvite/emediaInvite";

export default {
  data() {
    return {
      __comps__: {
        msglist: null,
        inputbar: null,
        audio: null
      },
      pubUrl: '',
      subUrl: '',
      showEmedia: false,
      showmultiEmedia: false,
      showEmediaInvite: false,
      action: null,
      emediaAction: null,
      multiEmediaVisible: 'block',
      inputbarVisible: 'block',
      confrId: '',
      confrMember: ['wangyundong','wanger']
    };
  },

  components: {
    chatMsglist,
    chatInputbar,
    chatSuitAudio,
    chatEmedia,
    chatMultiEmedia,
    chatEmediaInvite
  },
  props: {
    username: {
      type: Object,
      default: () => ({})
    },
    chatType: {
      type: String,
      default: msgType.chatType.SINGLE_CHAT
    }
  },

  // lifetimes
  created() {},

  beforeMount() {},

  mounted() {
    console.log('this data >> ', this);
    /* this.__comps__.inputbar = this.selectComponent("#chat-inputbar");
    this.__comps__.msglist = this.selectComponent("#chat-msglist");
    this.__comps__.audio = this.selectComponent("#chat-suit-audio"); */
  },

  moved() {},

  destroyed() {},

  methods: {
    toggleRecordModal() {
      this.$refs.audio.toggleRecordModal();
    },

    normalScroll() {
      this.$refs.msglist.normalScroll();

      this.$refs.inputbar.cancelEmoji();
    },

    shortScroll() {
      this.$refs.msglist.shortScroll();
    },

    saveSendMsg(evt) {
      msgStorage.saveMsg(evt.detail.msg, evt.detail.type);

      this.$refs.inputbar.cancelEmoji();
    },

    getMore() {
      this.selectComponent('#chat-msglist').getHistoryMsg();
    },

    onMakeVideoCall() {
      this.setData({
        showEmediaInvite: true,
        inputbarVisible: 'none',
        action: 'create' //showEmedia: true

      });
    },

    onStartConfr(data) {
      console.log('发起邀请的回调', data);
      this.setData({
        showEmediaInvite: false,
        showmultiEmedia: true,
        multiEmediaVisible: 'block',
        inputbarVisible: 'none',
        //confrMember: data.detail.confrMember,
        emediaAction: {
          action: 'create'
        }
      });

      if (data.action == 'invite') {
        this.sendInviteMsg(this.confrMember, getApp().globalData.confrId);
      }
    },

    onGoBack() {
      this.setData({
        showEmediaInvite: false,
        showmultiEmedia: true,
        multiEmediaVisible: 'block',
        inputbarVisible: 'none',
        //confrMember: []
      });
    },

    onInviteMember() {
      this.setData({
        action: 'invite',
        showEmediaInvite: true,
        inputbarVisible: 'none',
        //showmultiEmedia: false
        multiEmediaVisible: 'none'
      });
    },

    onMakeAudioCall() {
      this.setData({
        showEmediaInvite: true,
        showmultiEmedia: false,
        inputbarVisible: 'none'
      });
    },

    onCreateConfrSuccess(data) {
      console.log('创建会议回调', data);
      this.setData({
        confrId: data.confrId
      });
      getApp().globalData.confrId = data.confrId;
      this.sendInviteMsg(this.confrMember, data.confrId);
    },

    sendInviteMsg(members, confrId) {
      console.log("&c members", "background: green");
      console.log(members);
      members && members.forEach(value => {
        let id = WebIM.conn.getUniqueId();
        let msg = new WebIM.message('txt', id);
        msg.set({
          msg: wx.WebIM.conn.context.userId + ' invite you to video call',
          from: wx.WebIM.conn.context.userId,
          to: value,
          roomType: false,
          chatType: 'chat',
          ext: {
            msg_extension: JSON.stringify({
              inviter: wx.WebIM.conn.context.userId,
              group_id: this.username.groupId
            }),
            password: '',
            conferenceId: confrId
          },

          success(id, serverMsgId) {
            console.log('发送邀请消息成功 to: ' + value); //disp.fire('em.chat.sendSuccess', id, me.data.userMessage);
          },

          fail(id, serverMsgId) {
            console.log('发送邀请消息失败了');
          }

        }); // if(this.data.chatType == msgType.chatType.CHAT_ROOM){
        // 	msg.setGroup("groupchat");
        // }

        console.log('发送邀请');
        WebIM.conn.send(msg.body);
      });
    },

    onClickInviteMsg(data) {
      console.log('收到邀请消息');
      console.log(data);
      let confrId = data.detail.conferenceId;
      let msg_extension = typeof data.detail.msg_extension == 'string' ? JSON.parse(data.detail.msg_extension) : data.detail.msg_extension;
      let password = data.detail.password || '';
      this.setData({
        emediaAction: {
          action: 'join',
          confrId: confrId,
          password: password
        },
        showEmediaInvite: false,
        showmultiEmedia: true,
        inputbarVisible: 'none',
        username: {
          groupId: msg_extension.group_id
        }
      });
    },

    onHangup() {
      this.setData({
        showEmediaInvite: false,
        showmultiEmedia: false,
        inputbarVisible: 'block'
      });
      getApp().globalData.confrId = '';
    },

    onRender() {
      wx.pageScrollTo({
        scrollTop: 5000,
        duration: 300,
        success: function () {
          console.log('滚动成功');
        },
        fail: function () {
          console.log('滚动失败');
        }
      });
    }

  }
};
</script>
<style>
@import "./chat.css";
</style>