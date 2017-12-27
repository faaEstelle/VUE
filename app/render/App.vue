<template>
  <transition enter-active-class="animated flipInY"  leave-active-class="animated flipOutY" mode="out-in" >
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>
<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'element-ui/lib/theme-chalk/index.css'
  import 'animate.css'
  import '../css/common.css'
  import '../css/component.css'
  import '../css/index.css'
</script>　