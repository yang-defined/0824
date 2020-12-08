import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import menu from './moudle/menu'
import role from './moudle/role'
import manger from './moudle/manger'
import classify from './moudle/classify'
import specs from './moudle/specs'
import user from './moudle/user'
export default new Vuex.Store({
        modules:{
            menu,
            role,
            manger,
            classify,
            specs,
            user
        }
})