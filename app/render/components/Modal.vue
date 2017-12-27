<template>
  <div v-if="Options.Show" @enter="focus">
    <div class="modal" tabindex="-1" role="dialog" @keyup.esc="close">
      <div class="modal-dialog" role="document" :class="{'modal-lg':Options.Size===1,'modal-sm':Options.Size===0}">
        <div class="modal-content" :style="Options.ModalConStyle">
          <div class="modal-header" v-if="!Options.NoHeader">
            <button type="button" class="close" @click="close" v-if="!Options.NoClose">&times;</button>

          </div>
          <div class="modal-body" :style="Options.BodyStyle">

          </div>
          <div class="modal-footer" v-if="!Options.NoFooter">

          </div>
        </div>
      </div>
    </div>
    <div class="modal-bg"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    props: {
      Options: {
        Show: false,
        Size: 0,
        NoHeader: false,
        NoFooter: false,
        NoClose: false,
        BodyStyle: {},
        ModalConStyle: {}
      }
    },
    computed: {},
    watch: {},
    methods: {
      close (e) {
        if (e.target.className === 'modal' || e.target.className === 'close') this.Options.Show = false
      },
      focus (el) {
        el.focus()
      }
    },
    mounted () {
    }
  }
</script>