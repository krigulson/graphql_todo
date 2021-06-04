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
          <div class="flex items-center mr-4">
            <input
              :id="todo.id"
              type="checkbox"
              :name="todo.description"
              :checked="todo.completed ? 'checked' : ''"
              class="opacity-0 absolute h-6 w-6"
              @click="markAsDone(todo)"
            >
            <div class="cursor-pointer bg-white border-2 rounded-md border-purple-600 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-purple-500">
              <svg class="fill-current hidden w-3 h-3 text-purple-600 pointer-events-none" version="1.1" viewBox="0 0 17 12" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd">
                  <g transform="translate(-9 -11)" fill="#7c3aed" fill-rule="nonzero">
                    <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                  </g>
                </g>
              </svg>
            </div>
            <label :for="todo.description" class="text-gray-700">{{ todo.description }}</label>
          </div>
          <div>
            <span class="list-item-label">{{ todo.dueDate }}</span>
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
import { CREATE_NEW_TODO_MUTATION, GET_ALL_TODOS, DELETE_TODO, MARK_AS_DONE } from '../constants/graphql'

export default {
  data () {
    return {
      description: '',
      dueDate: moment().format('DD-MM-YYYY'),
      completed: false,
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

    markAsDone (todo) {
      todo.completed = !todo.completed
      this.$apollo.mutate({
        mutation: MARK_AS_DONE,
        variables: {
          todoId: todo.id
        }
      })
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

  input:checked + div {
    @apply border-purple-500;
  }

  input:checked + div svg {
    @apply block;
  }

</style>
