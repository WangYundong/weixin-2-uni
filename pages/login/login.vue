<template>
<view>
<view class="login">
	<!-- <live-player 
				src='rtmp://39.107.156.84:31543/IM3UXH545KAUTED0K4P7800C21M48/rtc-7-sln__Of_IM3UXH545KAUTED0K4P7800C21M16'
				mode="RTC" 
				autoplay 
				binderror="error" 
			/> -->
	<view class="login_title">
		<text>登录</text>
	</view>

	<view :class="'login_user ' + nameFocus">
		<input type="text" placeholder="用户ID" placeholder-style="color:rgb(173,185,193)" @input="bindUsername" @focus="onFocusName" @blur="onBlurName"></input>
	</view>
	<view :class="'login_pwd ' + psdFocus">
		<input type="text" password placeholder="用户密码" placeholder-style="color:rgb(173,185,193)" @input="bindPassword" @focus="onFocusPsd" @blur="onBlurPsd"></input>
	</view>
	<view class="login_btn">
		<button hover-class="btn_hover" @tap="login">登录</button>
	</view>

	<view class="login_text">
		<navigator url="../register/register" open-type="redirect" hover-class="navigator-hover">新用户注册</navigator>
		<navigator url="../login_token/login_token" open-type="redirect" hover-class="navigator-hover">使用Token登录</navigator>
	</view>
	<block data-type="template" data-is="toast" data-attr="..._toast_">
	<!-- <view class="toast_content_box">
		<view class="toast_content" >
			<view class="toast_content_border"></view>
			<view class="toast_content_icon">
				<image class="toast_icon_img" src="/static/images/filled@2x.png"></image>
			</view>
			<view class="toast_content_text">{{content}}</view>
		</view>

		<view class="toast_content_box">
			<view class="toast_content" v-if="isHidescss">
				<view class="toast_content_border toast_success"></view>
				<view class="toast_content_icon">
					<image class="toast_icon_img" src="/static/images/success@2x.png"></image>
				</view>
				<view class="toast_content_text">{{content}}</view>
			</view>
		</view>
	</view>
	 -->
</block>
</view>
</view>
</template>

<script>
let WebIM = require("../../utils/WebIM")["default"];
let __test_account__, __test_psword__;
let disp = require("../../utils/broadcast"); // __test_account__ = "easezy";
// __test_psword__ = "111111";
// __test_account__ = "easezy";
// __test_psword__ = "111111";
let runAnimation = true;

export default {
  data() {
    return {
      name: "",
      psd: "",
      grant_type: "password",
      rtcUrl: '',
      psdFocus: "",
      nameFocus: ""
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    const me = this;
    const app = getApp().globalData;
    //new (getApp().globalData.ToastPannel.ToastPannel)();
    disp.on("em.xmpp.error.passwordErr", function () {
      me.toastFilled('用户名或密码错误');
    });
  },
  methods: {
    statechange(e) {
      console.log('live-player code:', e.detail.code);
    },

    error(e) {
      console.error('live-player error:', e.detail.errMsg);
    },

    bindUsername: function (e) {
      this.setData({
        name: e.detail.value
      });
    },
    bindPassword: function (e) {
      this.setData({
        psd: e.detail.value
      });
    },
    onFocusPsd: function () {
      this.setData({
        psdFocus: 'psdFocus'
      });
    },
    onBlurPsd: function () {
      this.setData({
        psdFocus: ''
      });
    },
    onFocusName: function () {
      this.setData({
        nameFocus: 'nameFocus'
      });
    },
    onBlurName: function () {
      this.setData({
        nameFocus: ''
      });
    },
    login: function () {
      runAnimation = !runAnimation;

      if (!__test_account__ && this.name == "") {
        this.toastFilled('请输入用户名！');
        return;
      } else if (!__test_account__ && this.psd == "") {
        this.toastFilled('请输入密码！');
        return;
      }

      wx.setStorage({
        key: "myUsername",
        data: __test_account__ || this.name.toLowerCase()
      });
      getApp().globalData.conn.open({
        apiUrl: WebIM.config.apiURL,
        user: __test_account__ || this.name.toLowerCase(),
        pwd: __test_psword__ || this.psd,
        grant_type: this.grant_type,
        appKey: WebIM.config.appkey
      });
    }
  }
};
</script>
<style>
@import "./login.css";
</style>