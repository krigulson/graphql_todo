<template>
  <div>
    <div class="container max-w-3xl mx-auto">
      <div v-if="$apollo.queries.todos.loading">
        Loading...
      </div>
      <div v-if="error">
        {{ error }}
      </div>
      <ul>
        <li v-for="todo in todos.todos" :id="todo.id" :key="todo.id" class="list-item bg-white">
          {{ todo.description }}
          <div>
            <span class="list-item-label">{{ todo.dueDate }}</span>
            <span class="list-item-label">{{ todo.completed }}</span>
            <button :id="todo.id" type="button" class="cursor-pointer px-2 py-1 text-xs font-bold text-white uppercase rounded-md bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-200" @click="removeTodo(todo)">
              Remove
            </button>
          </div>
        </li>
      </ul>
      <form @submit.prevent="addTodo">
        <input v-model="description" type="text" class="list-item w-full bg-white focus:outline-none" placeholder="Todo description">
      </form>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { CREATE_NEW_TODO_MUTATION, GET_ALL_TODOS, DELETE_TODO } from '../constants/graphql'

export default {
  data () {
    return {
      description: '',
      dueDate: moment().format('DD-MM-YYYY'),
      error: null
    }
  },

  apollo: {
    todos: {
      query: GET_ALL_TODOS,
      error (error) {
        this.error = JSON.stringify(error.message)
      }
    }
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
      })
      this.description = ''
    },

    removeTodo (todo) {
      this.$apollo.mutate({
        mutation: DELETE_TODO,
        variables: {
          todoId: todo.id
        }
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
    @apply rounded-md;
    @apply bg-purple-700;
  }

  .form-control {
    @apply mx-2;
    @apply rounded-md;
    @apply bg-white;
    @apply border-transparent;
  }

</style>
