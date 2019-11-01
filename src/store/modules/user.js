export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  },
  mutations: {
    updateId (state, id) {
      state.id = id
    },
    updateName (state, name) {
      state.name = name
    },
    updateAvatar (state, avatar) {
      state.avatar = avatar
    }
  }
}
