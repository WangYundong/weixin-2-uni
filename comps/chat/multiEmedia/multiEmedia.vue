<template>
<view class="wraper">
	
	<scroll-view style="height:860rpx" scroll-y="true">
		<view class="infoConnecting">多人会议 </view>
		<live-pusher :url="pubUrl" mode="RTC" aspect="9:16" :enable-camera="enableCamera" :device-position="devicePosition" :muted="muted" background-mute="true" orientation="vertical" autopush>
			<view class="userName">{{myName}}</view>
		</live-pusher>


		<view style="display:inline" v-if="subUrls.length > 0" v-for="(item, index) in subUrls" :key="index">

			<live-player :id="item.streamId" :src="item.subUrl" mode="RTC" object-fit="contain" autoplay>
				<view class="userName">{{item.memName}}</view>
			</live-player>

		</view>
	</scroll-view>


	<view class="controlContent">
		<view class="emediaContrContent">
			<view class="controlItem" @tap="toggleCamera" :style="'color: ' + devicePositionColor">
				<image class="icon-record" :src="'../../../images/' + devicePositionIcon + '@2x.png'" style="width:22px height: 24px"></image>切换摄像头</view>
			<view class="controlItem" @tap="toggleMuted" :style="'color: ' + micphoneColor">
				<image class="icon-record" :src="'../../../images/' + micphoneIcon + '@2x.png'" style="width:22px height: 24px"></image>麦克风</view>
			<view class="controlItem" @tap="togglePlay" :style="'color: ' + videoColor">
				<image class="icon-record" :src="'../../../images/' + videoIcon + '@2x.png'" style="width:22px height: 24px"></image>视频</view>
			<!-- <view class="controlItem" bindtap="toggleVoice">
				<image
					class="icon-record"
					src='../../../images/speaker_white@2x.png' style="width:16px; height: 24px"/>
				扬声器</view> -->
			<view class="controlItem" @tap="inviteMember">
				<image class="icon-record" src="/static/images/invite_white@2x.png" style="width:22px height: 24px"></image>邀请</view>
		</view>

		<view class="hangup" @tap="hangup">
			<image class="icon-record" src="/static/images/hangup@2x.png"></image>
		</view>
	</view>

</view>
</template>

<script>
const WebIM = wx.WebIM;

export default {
  data() {
    return {
      pubUrl: "",
      subUrls: [],
      showInvite: true,
      devicePosition: "front",
      muted: false,
      playVideoMuted: false,
      devicePositionIcon: 'switchCamera_white',
      devicePositionColor: '#fff',
      micphoneIcon: 'micphone_white',
      micphoneColor: '#fff',
      videoIcon: 'video_white',
      videoColor: '#fff',
      myName: '',
      confrId: '',
      enableCamera: true,
    };
  },

  components: {},
  props: {
    //接收父组件传过来的值
    username: null,
    //定义接收参数变量及允许传入参数类型
    action: null
  },
  beforeMount: function () {
    wx.setKeepScreenOn(true);
    this.setData({
      myName: wx.WebIM.conn.context.userId
    });
    var me = this;
    let subUrls = [];
    let obj = {}; // var service = this.service = new wx.emedia.XService({
    //     listeners: {
    //         onMeExit: function (reason, failed) {
    //             //console.info("onMeExit", this);
    //             reason = (reason || 0);
    //             switch (reason){
    //                 case 0:
    //                     reason = "正常挂断";
    //                     break;
    //                 case 1:
    //                     reason = "没响应";
    //                     break;
    //                 case 2:
    //                     reason = "服务器拒绝";
    //                     break;
    //                 case 3:
    //                     reason = "对方忙";
    //                     break;
    //                 case 4:
    //                     reason = "失败,可能是网络或服务器拒绝";
    //                     if(failed === -9527){
    //                         reason = "失败,网络原因";
    //                     }
    //                     if(failed === -500){
    //                         reason = "Ticket失效";
    //                     }
    //                     if(failed === -502){
    //                         reason = "Ticket过期";
    //                     }
    //                     if(failed === -504){
    //                         reason = "链接已失效";
    //                     }
    //                     if(failed === -508){
    //                         reason = "会议无效";
    //                     }
    //                     if(failed === -510){
    //                         reason = "服务端限制";
    //                     }
    //                     break;
    //                 case 5:
    //                     reason = "不支持";
    //                     break;
    //                 case 10:
    //                     reason = "其他设备登录";
    //                     break;
    //                 case 11:
    //                     reason = "会议关闭";
    //                     break;
    //             }
    //         },
    //     }
    // });

    this.LivePusherContext = wx.createLivePusherContext();

    if (this.action && this.action.action == 'join') {
      this.joinConf(this.action);
    } else {
      this.createConf();
    }

    wx.emedia.mgr.onMemberExited = function (reason) {};

    wx.emedia.mgr.onMemberJoined = function (mem) {
      console.log("++++++++++ member", mem);
      let identityName = wx.WebIM.conn.context.jid.split("/")[0]; // 如果是自己进入会议了，开始发布流

      if (mem.name == identityName) {
        let rtcId = wx.emedia.util.getRtcId();
        wx.emedia.mgr.pubStream(rtcId).then(function (res) {
          me.setData({
            pubUrl: res.data.rtmp
          });
        });
      }
    };

    wx.emedia.mgr.onStreamAdded = function (stream) {
      console.log('%c onAddStream', 'color: green', stream);
      let streamId = stream.id; // setTimeout(() => {

      wx.emedia.mgr.subStream(streamId).then(function (data) {
        console.log('%c 订阅流成功', 'color:green', data); // let playContext = wx.createLivePlayerContext(streamId, me)

        let subUrl = {
          streamId: streamId,
          subUrl: data.data.rtmp,
          memName: stream.memName.split("_")[1].split("@")[0] // playContext: playContext

        };
        subUrls.push(subUrl);
        console.log('%c subUrls 11 ....', "background:yellow");
        console.log(subUrls);
        me.setData({
          subUrls: subUrls,
          showInvite: false
        });
      }); // }, 2000)
    };

    wx.emedia.mgr.onStreamRemoved = function (stream) {
      console.log('%c onRemoveStream', 'color: red', stream);
      subUrls = subUrls.filter(item => {
        if (item.streamId != stream.id) {
          return item;
        } else {
          console.log('%c ------', 'backgroukd:yellow');
          console.log(item); // item.playContext.stop({
          // 	success: function(){
          // 		console.log('关闭成功')
          // 	},
          // 	complete: function(){
          // 		console.log('关闭成功22')
          // 	}
          // })
        }
      });
      obj[stream.id] = false;
      me.setData({
        subUrls: subUrls
      });
      console.log('subUrls', subUrls);
    };
  },
  destroyed: function () {
    wx.emedia.mgr.exitConference(this.confrId);
  },
  methods: {
    createConf() {
      console.log('>>> createConf');
      var me = this;
      let rec = wx.getStorageSync("rec") || false;
      let recMerge = wx.getStorageSync("recMerge") || false; //参数：会议类型 密码 是否录制 是否合并

      wx.emedia.mgr.createConference(11, '', rec, recMerge).then(function (data) {
        console.log('成功', data);
        let ticket = data.data.ticket;
        let ticketJosn = JSON.parse(ticket);
        let confrId = ticketJosn.confrId;
        wx.emedia.mgr.joinConferenceWithTicket(confrId, ticket).then(function (res) {
          console.log('加入会议成功', res);
        }); // wx.emedia.mgr.joinConference(confrId, '').then(function(res){
        // 	console.log('加入会议成功', res)
        // })

        me.setData({
          confrId
        });
        me.$emit('createConfrSuccess', {
          confrId: confrId,
          groupId: me.username.groupId
        });
      });
    },

    joinConf(data) {
      console.log('加入会议 ————-------————');
      let me = this;
      wx.emedia.mgr.getConferenceTkt(data.confrId, data.password).then(function (data) {
        console.log('申请reqTkt成功', data.data);
        let ticket = data.data.ticket || '';
        let tktObj = JSON.parse(ticket);
        wx.emedia.mgr.joinConferenceWithTicket(data.confrId, ticket).then(function (res) {
          console.log('加入会议成功', res);
        });
        me.setData({
          confrId: tktObj.confrId
        });
        me.$emit('createConfrSuccess', {
          confrId: tktObj.confrId,
          groupId: me.username.groupId
        });
      });
    },

    togglePlay() {
      let me = this;
      console.log("%c togglePlay", "color:green"); // if (this.data.videoIcon == 'video_white') {
      // 	this.LivePusherContext.pause()
      // }else{
      // 	this.LivePusherContext.resume()
      // }

      this.setData({
        enableCamera: !me.enableCamera,
        pubUrl: me.pubUrl,
        videoIcon: this.videoIcon == 'video_white' ? 'video_gray' : 'video_white',
        videoColor: this.videoColor == '#fff' ? '#aaa' : '#fff'
      });
    },

    toggleCamera() {
      console.log("%c toggleCamera", "color:green");
      let me = this;
      me.LivePusherContext.switchCamera({
        success: function () {
          me.setData({
            devicePosition: me.devicePosition == 'fron' ? 'back' : 'front',
            devicePositionIcon: me.devicePositionIcon == 'switchCamera_white' ? 'switchCamera_gray' : 'switchCamera_white',
            devicePositionColor: me.devicePositionColor == '#fff' ? '#aaa' : '#fff'
          });
        }
      });
    },

    toggleMuted() {
      console.log("%c toggleMuted", "color:green");
      this.setData({
        muted: !this.muted,
        micphoneIcon: this.micphoneIcon == 'micphone_white' ? 'micphone_gray' : 'micphone_white',
        micphoneColor: this.micphoneColor == '#fff' ? '#aaa' : '#fff'
      });
    },

    // toggleVoice(){
    // 	console.log("%c toggleVoice", "color:green")
    // 	this.setData({
    // 		playVideoMuted: !this.data.playVideoMuted
    // 	})
    // },
    hangup() {
      wx.emedia.mgr.exitConference(this.confrId);
      this.$emit('hangup');
    },

    inviteMember() {
      this.$emit('inviteMember');
    }

  }
};
</script>
<style>
@import "./multiEmedia.css";
</style>