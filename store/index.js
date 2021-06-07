import Vuex from 'vuex';

const createStore = () => new Vuex.Store({
  state: {
    sideBarOpen: false,
    editSideBar: false,
  },
  getters: {
    editSideBar: (state) => state.editSideBar,
  },
  mutations: {
    toggleSideBar(state) {
      state.sideBarOpen = !state.sideBarOpen;
    },
    toggleEditSideBar(state) {
      state.editSideBar = !state.editSideBar;
    },
  },
});

export default createStore;
