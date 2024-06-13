import { createStore } from 'vuex';
import task from './modules/task';

const store = createStore({
  modules: {
    task,
  },
});

export default store;
