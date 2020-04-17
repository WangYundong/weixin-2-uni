<template>
<view>
<view class="setting_list">
	<view class="setting_listContent">
		<text>开启服务器录制</text>
		<switch :checked="rec? true: false" color="#0873DE" @change="openRec"></switch>
	</view>
</view>
<view class="setting_list">
	<view class="setting_listContent">
		<text>开启录制混流</text>
		<switch :checked="recMerge? true: false" color="#0873DE" @change="openRecMerge"></switch>
	</view>
</view>
</view>
</template>

<script>
let WebIM = require("../../utils/WebIM")["default"];
let disp = require("../../utils/broadcast");

export default {
  data() {
    return {
      rec: '',
      recMerge: ''
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    let rec = wx.getStorageSync("rec");
    let recMerge = wx.getStorageSync("recMerge");
    this.setData({
      rec,
      recMerge
    });
  },

  onShow() {
    let rec = wx.getStorageSync("rec");
    let recMerge = wx.getStorageSync("recMerge");
    this.setData({
      rec,
      recMerge
    });
  },

  methods: {
    openRec(event) {
      wx.setStorage({
        key: "rec",
        data: event.detail.value || false
      });
    },

    openRecMerge(event) {
      wx.setStorage({
        key: "recMerge",
        data: event.detail.value || false
      });
    }

  }
};
</script>
<style>
@import "./emediaSetting.css";
</style>