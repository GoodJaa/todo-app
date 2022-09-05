<template>
  <div class="todo-list" v-if="todos.length">
    <ul>
      <TodoItemComponent class="todo-item"
                         v-for="todo in todos"
                         @click.native="openModalSettings(todo, 'edit')"
                         :key="todo.id"
                         :todo="todo"/>
    </ul>
  </div>
</template>

<script>
import TodoItemComponent from "@/components/TodoItemComponent.vue";
import {mapMutations, mapState} from "vuex";
import UIkit from "uikit";
export default {
  name: "TodoListComponent",
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState([
        'selectedTodo'
    ]),
    selectedTodoData: {
      get() {
        return this.selectedTodo
      },
      set(todo) {
        this.selectTodo(todo)
      }
    }
  },
  methods: {
    ...mapMutations([
        'selectTodo',
        'setSettingsMode'
    ]),
    async openModalSettings(todo, settingsMode) {
      this.selectedTodoData = {...todo};
      this.setSettingsMode(settingsMode);
      UIkit.modal('#todo-setting').show();
    }
  },
  components: {
    TodoItemComponent
  }
}
</script>

<style scoped lang="scss">
.todo-item {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>