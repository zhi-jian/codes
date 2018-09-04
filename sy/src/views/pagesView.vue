<template>
    <div>
        <router-view></router-view>
        <!-- <tab-bar></tab-bar> -->
    </div>
</template>
<script>
import TabBar from "../components/tabBar.vue";
export default {
  components: {
    "tab-bar":TabBar
  }
};
</script>
<style>
</style>

