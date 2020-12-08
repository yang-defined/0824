import { reqSpecsCount, reqSpecsPaging } from '../../util/request'

const state = {
    list: [],
    page: 1,
    size: 3,
    total: 0
}

const mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    changeCount(state, num) {
        state.total = num
    },
    changePage(state, page) {
        state.page = page
    }
}
const actions = {
    requestSpecsList(context) {
        reqSpecsPaging({ size: context.state.size, page: context.state.page }).then(res => {
            var arr = res.data.list
            arr.forEach(item => {
                if (item.attrs != '' && item.attrs.length != 0) {
                    item.attrs = JSON.parse(item.attrs)
                    context.commit('changeList', arr)
                }
            })
            

        })
    },
    requestSpecsCount(context) {
        reqSpecsCount().then(res => {
            context.commit('changeCount', res.data.list[0].total)
        })
    },
    changeCurrentPages(context, page) {
        context.commit('changePage', page)
        context.dispatch('requestSpecsList')
    }

}
const getters = {
    list(state) {
        return state.list
    },
    page(state) {
        return state.page
    },
    size(state) {
        return state.size
    },
    total(state) {
        return state.total
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}