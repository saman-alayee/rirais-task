<template>
    <div>
        <TodoList />
    </div>
</template>

<script>
import TodoList from '../../components/pageComponents/TodoList.vue';

export default {
    name: 'TodoPage',
    components: {
        TodoList
    },
};
</script>
