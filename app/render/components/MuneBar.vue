<template>
  <ul class="menu-bar">
    <li v-for ="menu in MenuData">{{menu.name}}</li>
  </ul>
</template>
<script>
  export default {
    name:'MenuBar',
    props:{
      MenuData:Array
    }
  }
</script>