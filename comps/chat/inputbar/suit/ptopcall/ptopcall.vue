<template>
<view>
	<view v-if="visible" class="wraper">
		<view>
			<button type="default" @tap="callVideo">会议模式</button>
			<button type="default" :size="defaultSize" plain="false" disabled="false" @tap="cancel" hover-class="other-button-hover" class="button-cancel">取消</button>
		</view>
	</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      visible: false
    };
  },

  components: {},
  props: {},
  methods: {
    show() {
      this.setData({
        visible: true
      });
    },

    cancel() {
      this.setData({
        visible: false
      });
    },

    callAudio() {
      this.$emit('makeAudioCall', 'single');
      this.cancel();
    },

    callVideo() {
      this.$emit('makeVideoCall', 'single');
      this.cancel();
    }

  }
};
</script>
<style>
@import "./ptopcall.css";
</style>