<template>
  <div class="win-tool">
    <div class="win-lf">

      <p class="win-name"> <span class="win-icon"></span>星云邮件分析系统-VUE</p>
    </div>
    <div class="win-rg">
      <a class="win-min pointer" @click = 'WinSmall'>
        <span class="min-icon"></span>
      </a>
      <a :class="[styles]" class="pointer" @click = 'Windubo'></a>
      <a class="win-close pointer" @click = 'WinClose'></a>
    </div>
  </div>
</template>
<script>
  const win = nw.Window.get()
export default{
  data (){
    return {
      styles:'win-max'
    }
  },
  mounted (){
    win.removeAllListeners('maximize')
    win.removeAllListeners('restore')
    win.on('maximize', () => {
      this.IsMax = true
    })
    win.on('restore', () => {
      this.IsMax = false
    })
  },
  methods: {
    //窗口操作
    WinSmall: () => {
      console.log('最小化')
      win.minimize()
    },
    WinClose: () => {
      win.close()
      if (win.appWindow.id === '') {//判断窗口Id是否为空
        nw.App.quit()
      }
    },
    Windubo () {
      if (this.IsMax) {
        win.restore()
        this.IsMax = true
        this.styles = 'win-max'
      } else {
        win.maximize()
        this.IsMax = false
        this.styles = 'win-reset'
      }
    },
  }
}
</script>