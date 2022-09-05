<template>
  <aside class="navbar">
    <div class="uk-container-large navbar-container">
      <div class="uk-nav-header navbar__header">
        <div class="icon icon--company"></div>
        компания
      </div>
      <div class="navbar__settings">
        <button class="navbar__button" @click="showTodos">
          <div class="navbar__button-desc">
            <span uk-icon="icon: thumbnails"></span>
            <span>tasks</span>
          </div>
          <div class="navbar__button-counter uk-badge">{{ todos.length }}</div>
        </button>
        <div class="navbar__setting-buttons">
          <a href="#" class="uk-icon-link uk-margin-small-right settings-button">
            <span uk-icon="cog"></span> Settings
          </a>
          <a href="#"
             class="uk-icon-link uk-margin-small-right settings-button"
             @click.prevent="openModalSettings('add')">
            <span uk-icon="cog"></span> New Todo
          </a>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import {mapState, mapMutations} from "vuex";
import UIkit from "uikit";
import Icons from 'uikit/dist/js/uikit-icons';
UIkit.use(Icons);

export default {
  name: "NavbarComponent",
  methods: {
    ...mapMutations([
      'showTodos',
      'setSettingsMode'
    ]),
    async openModalSettings(settingsMode) {
      this.setSettingsMode(settingsMode);
      UIkit.modal('#todo-setting').show();
    }
  },
  computed: {
    ...mapState([
      'todos'
    ])
  }
}
</script>

<style scoped lang="scss">
.navbar-container {
  padding: 20px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.navbar {
  flex-grow: 1;
  background-color: #fff;
  box-sizing: border-box;

  .navbar__setting-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .navbar__settings {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;

    & .settings-button {
      gap: 4px;
      display: flex;
      text-align: center;
    }
  }

  .navbar__header {
    align-items: center;
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  }

  .navbar__button {
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 8px;
    border: none;
    border-radius: 4px;
    background-color: #F2F4F7;
    text-transform: uppercase;
    transition: .3s;

    & .navbar__button-counter {
      background-color: #1D2939;
      border-radius: 4px;
      color: #fff;
    }

    & .navbar__button-desc {
      display: flex;
      align-items: center;
      grid-gap: 8px;
    }

    &:hover {
      background-color: #F2F4FF;
    }
  }
}
</style>