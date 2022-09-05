<template>
  <div id="todo-setting"
       uk-modal
       @click.self="modalClose">
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">{{ modeName }} Todo</h2> <!--разные заголовки -->
      <form class="todo-setting__form">
        <input class="uk-input todo-setting__input"
               :class="{'invalid': invalidForm.title}"
               type="text" placeholder="Title"
               v-model="todo.title">
        <textarea class="uk-textarea todo-setting__input"
                  :class="{'invalid': invalidForm.description}"
                  placeholder="Description"
                  v-model="todo.description">
        </textarea>
        <DatePicker :class="{'invalid': invalidForm.date}"
                    v-model="todo.date"
                    format="DD.MM.YYYY"
                    type="date"
                    :default-value="new Date(todo.date)"/>
        <label v-show="settingsMode === 'edit'">
          <input class="uk-checkbox"
                      type="checkbox"
                      v-model="todo.completed"> Completed
        </label>
      </form>
      <div class="todo-setting__buttons-wrapper">
        <button class="uk-button uk-button-default"
                @click="editTodo(todo)"
                type="button">{{ modeName }}
        </button>
        <button class="uk-button uk-button-default"
                @click="modalClose"
                type="button">Close
        </button>
        <button class="uk-button uk-button-default"
                @click="deleteTodo(todo.id)"
                type="button">Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import UIkit from "uikit";

function initialState() {
  return {
    todo: {
      title: '',
      description: '',
      date: null,
      completed: false
    },
    invalidForm: {
      title: false,
      description: false,
      date: false
    }
  }
}

export default {
  name: "TodoSettingsModalComponent",
  data() {
    return initialState();
  },
  watch: {
    selectedTodo: {
      handler() {
        if (this.selectedTodo) {
          this.todo = this.selectedTodo;
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState([
      'selectedTodo',
      "settingsMode"
    ]),
    modeName() {
      return `${this.settingsMode[0]?.toUpperCase()}${this.settingsMode?.slice(1)}`;
    },
    getFormatDate() {
      return this.$store.getters.getFormatDate(this.todo.date);
    },
  },
  methods: {
    ...mapMutations([
      'clearSelectedTodo'
    ]),
    async editTodo(todo) {
      let isInvalid = false;
      for (let field in this.invalidForm) {
        this.invalidForm[field] = !todo[field] ? true : false;
        if (this.invalidForm[field]) {
          isInvalid = true;
        }
      }
      if (!isInvalid) {
        switch (this.settingsMode) {
          case 'edit':
            await this.$store.dispatch('updateTodo', todo);
            break;
          case 'add':
            await this.$store.dispatch('addTodo', todo);
            break;
          default:
            return;
        }
        this.modalClose();
      }
    },
    modalClose() {
      this.clearSelectedTodo();
      UIkit.modal('#todo-setting').hide();
    },
    async deleteTodo(id) {
      await this.$store.dispatch('deleteTodo', id);
      this.modalClose();
    }
  },
  components: {
    DatePicker
  }
}
</script>

<style scoped lang="scss">
.todo-setting__input {
  border-radius: 4px;
  border: 1px solid #ccc;
}

.invalid {
  border-color: darkred;
}

.todo-setting__form {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  margin-bottom: 16px;
}

.todo-setting__buttons-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>