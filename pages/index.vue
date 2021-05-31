<template>
  <div class="container">
    <div class="rounded-md bg-gray-100 px-4 py-4 m-2 overflow-hidden w-3/5">
      <h1
        class="
          px-3
          py-2
          mx-3
          mb-2
          font-bold
          text-gray-800
          bg-gray-200
          rounded-md
        "
      >
        Todos
      </h1>
      <div v-for="todo in todos.todos" :key="todo.id">
        <div
          class="
            flex
            items-center
            px-3
            py-2
            text-gray-700
            border-gray-300
            cursor-pointer
            hover:bg-gray-200
            hover:text-gray-900
          "
        >
          <h1 class="flex-1 font-mono text-sm">
            {{ todo.description }}
          </h1>
          <span
            class="
              px-2
              py-1
              text-xs
              font-bold
              text-white
              uppercase
              bg-gray-400
              rounded-md
              hover:bg-primary
            ">{{ todo.dueDate }}</span>
          <span
            class="
              px-2
              py-1
              ml-2
              text-xs
              font-bold
              text-white
              uppercase
              bg-gray-400
              rounded-md
              hover:bg-primary
            ">{{ todo.completed }}</span>
        </div>
      </div>
      <form @submit.prevent="addTodo">
        <input
          v-model="description"
          type="text"
          class="
            my-2
            mx-2
            rounded-md
            bg-white
            border-transparent
            focus:border-gray-500
            focus:bg-white
            focus:ring-0
          "
          placeholder="Todo description"
        >
        <input
          v-model="dueDate"
          type="text"
          class="
            my-2
            mx-2
            rounded-md
            bg-white
            border-transparent
            focus:border-gray-500
            focus:bg-white
            focus:ring-0
          "
          placeholder="Due date"
        >
        <button
          class="
            py-2
            px-4
            font-semibold
            rounded-lg
            shadow-md
            text-white
            bg-green-500
            hover:bg-green-700
          "
        >
          Add todo
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { CREATE_NEW_TODO_MUTATION } from '../constants/graphql'

export default {
  data () {
    return {
      description: '',
      dueDate: ''
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
        console.log(data)
        event.target.reset()
      })
    }
  }
}
</script>
<style lang="css" scoped>
input {
  padding: 0.5rem 0.75rem;
}
</style>
