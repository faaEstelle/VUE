import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import Message from './modules/Message'
import FileTool from './modules/FileTool'

Vue.use(Vuex)

export default new Vuex.Store({
  actions, getters, modules: {
    Message, FileTool
  },
})
