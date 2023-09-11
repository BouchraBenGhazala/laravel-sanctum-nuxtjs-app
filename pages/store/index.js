import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// store/index.js (or your Vuex store module)

const state = {
    user: {},
    // Other state properties...
  };
  
  const mutations = {
    setUserProfile(state, updatedUser) {
      state.user = updatedUser;
    },
    // Other mutations...
  };
  
  const actions = {
    async updateUserProfile({ commit }, updatedUser) {
      try {
        const response = await axios.put(`/api/users/${updatedUser.id}/updateProfile`, updatedUser);
        const updatedUserData = response.data.message;
        commit('setUserProfile', updatedUserData);
      } catch (error) {
        throw error;
      }
    },
    // Other actions...
  };
  
  export default new Vuex.Store({
    state,
    mutations,
    actions,
    // Other store configurations...
  });
  