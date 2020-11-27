import Vue from 'vue'
import Vuex from 'vuex'
import mode from './module/mode';
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        mode
    },
    getters
})