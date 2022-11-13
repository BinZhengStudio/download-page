<script setup lang="ts">
defineProps<{
  file: string
  url: string
}>()
</script>

<template>
  <p>下载：<b>{{ file }}</b><br>
    Download：<b>{{ file }}</b></p>
  <p>您的下载将在 <b>{{ time }}</b> 秒后开始<br>
    Your download will start in <b>{{ time }}</b> seconds.</p>
  <p :class="['download-link', {'done': done}]">如果没有自动开始下载，请 <a target="_self" ref="link" :href="url"
                                                                download>点击此处</a>。<br>
    If the download does not start automatically, please <a target="_self" :href="url" download>click here</a>.</p>
</template>

<style scoped>
.download-link {
  display: none;
}

.download-link.done {
  display: block;
}
</style>

<script lang="ts">
export default { // TODO 转换ts
  data() {
    return {
      time: 5,
      done: false
    }
  },

  mounted() {
    this.countdown();
  },

  methods: {
    countdown: function () {
      let timer = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }

        if (this.time <= 0) {
          this.time = 0;
          const link = this.$refs.link;
          clearInterval(timer);
          this.done = true;
          link.click();
        }
      }, 1000)
    }
  }
}
</script>