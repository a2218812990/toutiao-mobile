<template>
  <div class="app">
    <keep-alive :include="['tabbar']">
    <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style scoped>
</style>
