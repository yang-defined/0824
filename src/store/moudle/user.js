const state = {
    list:sessionStorage.getItem('list')?JSON.parse(sessionStorage.getItem('list')):{}
}

const mutations = {
    changeList(state, arr) {
        state.list = arr
        sessionStorage.setItem('list',JSON.stringify(arr))
    }
}
const actions = {
    requestuserList(context,data) {
        context.commit('changeList',data)
    }

}
const getters = {
    list(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}