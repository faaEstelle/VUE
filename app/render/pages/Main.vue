<template>
  <div class="interface-box">
    <WinTool></WinTool>
    <div class="page-menu">
      <a class="back-index"></a>
      <ul class="menu-bar">
        <li>文件
          <ul class="menu-child">
            <li>新建案件</li>
            <li class="menu-line"></li>
            <li>打开案件<span class="menu-expend"></span></li>
            <li class="menu-line"></li>
            <li>添加案件证据<span class="menu-expend"></span></li>
            <li class="menu-line"></li>
            <li>案件详情</li>
            <li class="menu-line"></li>
            <li>退出系统</li>
          </ul>
        </li>
        <li>标记
          <ul class="menu-child">
            <li>新建标记</li>
            <li class="menu-line"></li>
            <li>标记到<span class="menu-expend"></span></li>
            <li class="menu-line"></li>
            <li>标记全部<span class="menu-expend"></span></li>
            <li class="menu-line"></li>
            <li>移除标记</li>
          </ul>
        </li>
        <li>报告
          <ul class="menu-child">
            <li>导出报告（全部）</li>
            <li class="menu-line"></li>
            <li>导出视图</li>
          </ul>
        </li>
        <li>图形分析
          <ul class="menu-child">
            <li>网络图</li>
            <li class="menu-line"></li>
            <li>地图轨迹</li>
          </ul>
        </li>
        <li>工具
          <ul class="menu-child">
            <li>视图选项</li>
            <li class="menu-line"></li>
            <li>邮箱源</li>
            <li class="menu-line"></li>
            <li>邮箱分析</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="smart-search">
      <a class="smart-search-last"></a>
      <a class="smart-search-next"></a>
      <a class="smart-search-history"></a>
      <div class="smart-search-box">
        <input/>
        <a></a>
      </div>
      <div class="smart-search-type" :class="[smartTypeStyle]" @click="switchType">
        <button>{{smartType}}</button>
      </div>
      <button>搜索</button>
      <button>重置</button>
    </div>
    <div class="main-con">
      <div class="filter-item">
        <div class="tab-title"><p>过滤选项</p></div>
      </div>
      <div class="file-list">
        <div class="tab-title"><p>文件列表</p></div>
      </div>
      <div class="file-preview">
        <div class="tab-title"><p>文件预览</p></div>
      </div>
    </div>
  </div>
</template>
<script>
  import WinTool from '../components/WinTool'
  import MenuBar from '../components/MuneBar'
  import Modal from '../components/Modal'

  export default {
    data () {
      return {
        smartType:'精准搜索',
        smartTypeStyle:'precision'
      }
    },
    components: {
      WinTool,
      MenuBar,
      Modal
    },
    methods:{
      switchType(){
        if(this.smartType ==='精准搜索'){
          this.$set(this,'smartType','模糊搜索')
          this.$set(this,'smartTypeStyle','blurry')
        }else{
          this.$set(this,'smartType','精准搜索')
          this.$set(this,'smartTypeStyle','precision')
        }
      }
    }
  }
</script>