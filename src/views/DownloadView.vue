<script setup>
import Download from '../components/Download.vue'
</script>

<template>
  <div class="panel p-1em m-32em at-center">
    <Download :file="fileName" :url="downloadUrl"/>
  </div>
</template>

<script>
export default {
  data() {
    let modName = this.$route.params.modName;
    let mcVersion = this.$route.params.mcVersion;
    let modVersion = this.$route.params.modVersion;
    let fileName = `${modName}-${mcVersion}-${modVersion}.jar`;
    return {
      fileName: `${fileName}`,
      downloadUrl: `https://maven.bzgzs.cn/cn/bzgzs/${modName}/${modName}-${mcVersion}/${modVersion}/${fileName}`,
    }
  }
}
</script>
