<template>
  <div id="app">
    <div class="main">
      <div class="spinner-wrapper" v-if="isLoading" >
        <div uk-spinner="ratio: 3"></div>
      </div>
      <NavbarComponent v-if="!isLoading"/>
      <main class="content" v-if="!isLoading">
        <div class="uk-container">
          <div class="todo-lists" uk-grid>
            <div class="todo-list-wrapper">
              <h3 class="todo-list-title">to do</h3>
              <TodoListComponent :todos="activeTodos"
                                 v-show="isShowedTodos"/>
            </div>
            <div class="todo-list-wrapper">
              <h3 class="todo-list-title">done</h3>
              <TodoListComponent :todos="completedTodos"
                                 v-show="isShowedTodos"/>
            </div>
          </div>
        </div>
      </main>
      <TodoSettingsModalComponent/>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import NavbarComponent from "@/components/NavbarComponent.vue";
import TodoListComponent from "@/components/TodoListComponent.vue";
import TodoSettingsModalComponent from "@/components/modals/TodoSettingsModalComponent.vue";

export default {
  name: 'App',
  data() {
    return {
      isLoading: false
    }
  },
  async mounted() {
    this.isLoading = true;
    await this.getTodos();
    this.isLoading = false;
  },
  computed: {
    ...mapState([
      'isShowedTodos',
      'todos'
    ]),
    completedTodos() {
      return this.todos.filter(todo => todo.completed === true);
    },
    activeTodos() {
      return this.todos.filter(todo => todo.completed === false);
    }
  },
  methods: {
    ...mapActions([
      'getTodos',
      'addTodo'
    ])
  },
  components: {
    NavbarComponent,
    TodoListComponent,
    TodoSettingsModalComponent
  }
}
</script>

<style lang="scss">
@import "node_modules/uikit/src/scss/variables-theme.scss";
@import "node_modules/uikit/src/scss/mixins-theme.scss";
@import "uikit/src/scss/uikit-theme.scss";
@import "@/assets/css/base.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.icon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: #1D2939;

  &.icon--company {
    margin-right: 8px;
  }
}

.todo-lists {
  padding-top: 20px;
  display: grid;
  grid-auto-columns: 1fr;

  & .todo-list-wrapper {
    grid-row: 1;
  }
}

.content {
  min-height: 100%;
  flex-grow: 4;
  background-color: #F2F4F7;
  box-sizing: border-box;
}

.main {
  display: flex;
  height: 100vh;
}

.content {
  width: 50%;
}

.spinner-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}
</style>
