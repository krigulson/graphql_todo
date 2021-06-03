<template>
  <div class="container max-w-3xl mx-auto">
    <ul>
      <li v-for="todo in todos.todos" :key="todo.id" class="list-item bg-white">
        {{ todo.description }}
        <div>
          <span class="list-item-label">{{ todo.dueDate }}</span>
          <span class="list-item-label">{{ todo.completed }}</span>
        </div>
      </li>
    </ul>
    <form @submit.prevent="addTodo">
      <input v-model="description" type="text" class="list-item w-full bg-white focus:outline-none" placeholder="Todo description">
      <!-- <input v-model="dueDate" type="text" class="form-control" placeholder="Due date"> -->
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import moment from 'moment'
import { CREATE_NEW_TODO_MUTATION } from '../constants/graphql'

export default {
  data () {
    return {
      description: '',
      dueDate: moment().format('DD-MM-YYYY')
    }
  },

  apollo: {
    todos: gql`
      query getTodos {
        todos {
          todos {
            id
            description
            completed
            dueDate
          }
        }
      }
    `
  },

  methods: {
    addTodo (event) {
      const { description, dueDate } = this.$data
      this.$apollo.mutate({
        mutation: CREATE_NEW_TODO_MUTATION,
        variables: {
          description,
          dueDate
        }
      }).then((data) => {
        event.target.reset()
      })
    }
  }
}
</script>
<style lang="css" scoped>

  .list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1em 2em;
    margin: 1em 0;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2);
  }
  .list-item-label {
    @apply px-2;
    @apply py-1;
    @apply text-xs;
    @apply font-bold;
    @apply text-white;
    @apply uppercase;
    @apply bg-gray-400;
    @apply rounded-md;
  }

  .form-control {
    @apply mx-2;
    @apply rounded-md;
    @apply bg-white;
    @apply border-transparent;
  }
</style>
