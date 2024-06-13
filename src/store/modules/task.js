const state = () => ({
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  });
  
  const mutations = {
    addTask(state, task) {
      state.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    loadTasks(state, tasks) {
      state.tasks = tasks;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  };
  
  const actions = {
    addTask({ commit }, task) {
      commit('addTask', task);
    },
    deleteTask({ commit }, taskId) {
      commit('deleteTask', taskId);
    },
    loadTasks({ commit }) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      commit('loadTasks', tasks);
    },
  };
  
  const getters = {
    tasks(state) {
      return state.tasks;
    },
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  