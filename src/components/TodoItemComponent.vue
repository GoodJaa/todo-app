<template>
  <li class="todo-card uk-card uk-card-small uk-card-default uk-card-body uk-card-hover">
    <h3 class="uk-card-title">{{todo.title}}</h3>
    <div class="todo-card__description">{{todo.description}}</div>
    <div class="todo-card__date">
      <time>{{getFormatDate}}</time>
    </div>
  </li>
</template>

<script>

export default {
  name: "TodoItemComponent",
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  computed: {
    getFormatDate() {
      return this.$store.getters.getFormatDate(this.todo.date)
    }
  }
}
</script>

<style scoped lang="scss">
  .todo-card {
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 0px 0.5px 2px rgba(16, 24, 40, 0.3);

    & .todo-card__description {
      margin-bottom: 16px;
    }
    & .todo-card__date {
      text-align: end;
    }
  }
</style>