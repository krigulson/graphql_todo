<template>
  <div>
    <div class="sidebar">
      <div class="sidebar-section flex justify-between items-center">
        <h4 class="sidebar-title">{{ title }}</h4>
        <font-awesome-icon
          @click="toggleSideBar"
          :icon="['fas', 'times']"
          class="close-sidebar"
        />
      </div>
      <section class="container sidebar-area">
        <div class="sidebar-section">
          <div class="row">
            <slot />
          </div>
        </div>
      </section>
    </div>
    <div class="sidebar-backdrop" />
  </div>
</template>

<script>
export default {
  props: {
    name: 'RightSidebar',
    title: {
      type: String,
      required: false,
      default: '',
    },
  },

  methods: {
    toggleSideBar() {
      if (this.$store.state.sideBarOpen) {
        this.$store.commit('toggleSideBar');
      } else {
        this.$store.commit('toggleEditSideBar');
      }
      this.product = '';
    },
  },
};
</script>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  width: 400px;
  z-index: 1051;
  top: 0;
  bottom: 0;
  right: 0;
  backface-visibility: hidden;
  background-color: #fff;
  transition: right 0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99);
  box-shadow: 0 15px 30px 0 rgb(34 41 47 / 11%), 0 5px 15px 0 rgb(34 41 47 / 8%);
  padding-top: 2rem;

  &-section {
    padding: 1rem 2rem;
  }

  &-area {
    height: calc(100% - 83px);
  }

  &-title {
    font-size: 36px;
    line-height: 41px;
    letter-spacing: -0.5px;
    font-weight: 700;
  }

  .close-sidebar {
    cursor: pointer;
  }
}

.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.8;
  background-color: #343a40;
}

.sidebar-open {
  overflow-y: hidden;
}
</style>
