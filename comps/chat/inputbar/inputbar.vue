<template>
<view class="room_bar">
	<chat-suit-emoji ref="emoji" @newEmojiStr="emojiAction"></chat-suit-emoji>
	<chat-suit-main ref="main" :username="username" :chatType="chatType" @inputFocused="cancelEmoji"></chat-suit-main>
	<chat-suit-image ref="image" :username="username" :chatType="chatType"></chat-suit-image>
	<!-- <chat-suit-location id="chat-suit-location" username="{{ username }}"></chat-suit-location> -->
	<!-- <chat-suit-video id="chat-suit-video" username="{{ username }}"></chat-suit-video> -->
	<chat-suit-ptopcall ref="ptopcall" :chatType="chatType" @makeAudioCall="onMakeAudioCall" @makeVideoCall="onMakeVideoCall"></chat-suit-ptopcall>

	<view :class="'other_func ' + (isIPX? 'other_func_X': '')">
		<!-- <view class="open_emoji" bind:tap="openEmoji">
			<image src="../../../images/Emoji.png"/>
		</view> -->
		<view class="v-record" @tap="toggleRecordModal">
			<image class="icon-record" :src="recordStatus != RecordStatus.HIDE ? '../../../images/iconAudioActive@2x.png' : '../../../images/voice.png'" style="width:16px height: 24px"></image>
		</view>
		<view class="open_camera" @tap="openCamera">
			<image src="/static/images/camora.png" style="width:24px height: 18px"></image>
		</view>
		<view class="send_image" @tap="sendImage">
			<image src="/static/images/pic.png" style="height:22px width: 22px"></image>
		</view>
		<!-- <view class="send_image" bind:tap="sendLocation">
			<image src="../../../images/iconLocation@2x.png" style="height:18px;"/>
		</view> -->
		<view class="v-record" @tap="callVideo" v-if="username.groupId">
			<image src="/static/images/call2x.png" style="height:24px width: 15px"></image>
		</view>
	</view>
</view>
</template>

<script>
let RecordStatus = require("./suit/audio/record_status").RecordStatus;
let msgType = require("../msgtype");
import chatSuitEmoji from "./suit/emoji/emoji";
import chatSuitImage from "./suit/image/image";
import chatSuitLocation from "./suit/location/location";
import chatSuitMain from "./suit/main/main";
import chatSuitPtopcall from "./suit/ptopcall/ptopcall";

export default {
  data() {
    return {
      recordStatus: RecordStatus.HIDE,
      RecordStatus,
      __comps__: {
        main: null,
        emoji: null,
        image: null,
        location: null,
        //video: null,
        ptopcall: null
      },
      isIPX: ""
    };
  },

  components: {
    chatSuitEmoji,
    chatSuitImage,
    chatSuitLocation,
    chatSuitMain,
    chatSuitPtopcall
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

  moved() {},

  destroyed() {},

  mounted() {
    this.setData({
      isIPX: getApp().globalData.isIPX
    });
    /* let comps = this.__comps__;
    comps.main = this.selectComponent("#chat-suit-main");
    comps.emoji = this.selectComponent("#chat-suit-emoji");
    comps.image = this.selectComponent("#chat-suit-image");
    comps.ptopcall = this.selectComponent("#chat-suit-ptopcall"); */ // comps.location = this.selectComponent("#chat-suit-location");
    //comps.video = this.selectComponent("#chat-suit-video");
  },

  methods: {
    // 事件有长度限制：仅限 26 字符
    toggleRecordModal() {
      this.$emit("tapSendAudio", null, {
        bubbles: true,
        composed: true
      });
    },

    onMakeVideoCall() {
      this.$emit('makeVideoCall', 'single');
    },

    onMakeAudioCall() {
      this.$emit('makeAudioCall', 'single');
    },

    // sendVideo(){
    // 	this.data.__comps__.video.sendVideo();
    // },
    openCamera() {
      this.__comps__.image.openCamera();
    },

    openEmoji() {
      this.__comps__.emoji.openEmoji();
    },

    cancelEmoji() {
      this.__comps__.emoji.cancelEmoji();
    },

    sendImage() {
      this.__comps__.image.sendImage();
    },

    sendLocation() {// this.data.__comps__.location.sendLocation();
    },

    emojiAction(evt) {
      this.__comps__.main.emojiAction(evt.detail.msg);
    },

    callVideo() {
      console.log('this._data.__comps__.ptopcall', this.$refs.ptopcall);

      this.$refs.ptopcall.show();
    }
	
	/* callVideo() {
		this.$refs.emediaModal.showEmediaModal();
		this.$refs.emediaModal.showCallerWait(
		  //this.$data.activedKey[this.type].name
		);
		//const videoSetting = JSON.parse(localStorage.getItem("videoSetting"));
		const recMerge =false;
		const rec =false;
		videoChat.onCallVideo({
		  //chatType: this.type,
		  to: uni.getStorageSync("friend"),
		  rec,
		  recMerge
		});
	      
	    }, */

  }
};
</script>
<style>
@import "./inputbar.css";
</style>