<template>
  <div class="interface-box">
    <WinTool></WinTool>
    <div class="main-menu">
      <a class="back-index"></a>
      <MenuBar :MenuData = 'MainBar'></MenuBar>
    </div>
  </div>
</template>
<script>
  import WinTool from '../components/WinTool'
  import MenuBar from '../components/MuneBar'
  import Modal from '../components/Modal'
  export default{
    data(){
      return{
        MainBar:[{name:'文件'}]
      }
    },
    components:{
      WinTool,
      MenuBar,
      Modal
    }
  }
</script>