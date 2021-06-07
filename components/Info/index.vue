<template>
  <div>
    <form @submit.prevent="editTodo">
      <div class="mb-4">
        <label class="text-sm font-bold text-black">Description</label>
        <input
          v-model="todo.description"
          type="text"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          placeholder="Todo description"
        />
      </div>

      <div class="mb-4">
        <label class="text-sm font-bold text-black">Due date</label>
        <input
          v-model="todo.dueDate"
          type="text"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div class="mb-4">
        <label class="text-sm font-bold text-black">Completed?</label>
        <input
          :id="todo.id"
          type="checkbox"
          disabled
          :name="todo.description"
          :checked="todo.completed ? 'checked' : ''"
          class="opacity-0 absolute h-6 w-6"
        />
        <div
          class="
            cursor-pointer
            bg-white
            border-2
            rounded-md
            border-purple-600
            w-6
            h-6
            flex
            õflex-shrink-0
            justify-center
            items-center
            mr-2
            mt-2
            focus-within:border-purple-500
          "
        >
          <svg
            class="
              fill-current
              hidden
              w-3
              h-3
              text-purple-600
              pointer-events-none
            "
            version="1.1"
            viewBox="0 0 17 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fill-rule="evenodd">
              <g
                transform="translate(-9 -11)"
                fill="#7c3aed"
                fill-rule="nonzero"
              >
                <path
                  d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div class="flex justify-between">
        <button
          type="button"
          class="
            cursor-pointer
            px-4
            py-3
            text-sm
            font-bold
            text-white
            uppercase
            rounded-md
            bg-blue-600
            hover:bg-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:ring-offset-2
            focus:ring-offset-blue-200
          "
          @click="editTodo()"
        > Update </button>
        <button
          type="button"
          class="
            cursor-pointer
            px-4
            py-3
            text-sm
            font-bold
            text-white
            uppercase
            rounded-md
            bg-red-600
            hover:bg-red-700
            focus:outline-none
            focus:ring-2
            focus:ring-red-500
            focus:ring-offset-2
            focus:ring-offset-red-200
          "
          @click="removeTodo()"
        >
          Remove
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { UPDATE_DUE, DELETE_TODO } from '../../constants/graphql';

export default {
  props: {
    name: 'Info',
    todo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    editTodo() {
      const todoId = this.todo.id;
      const newDate = this.todo.dueDate;

      this.$apollo.mutate({
        mutation: UPDATE_DUE,
        variables: {
          todoId,
          newDate,
        },
      });
      this.$store.commit('toggleSideBar');
    },

    removeTodo() {
      this.$apollo.mutate({
        mutation: DELETE_TODO,
        variables: {
          todoId: this.todo.id,
        },
      });
      this.$store.commit('toggleSideBar');
    },
  },
};
</script>
<style scoped>
input {
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  border-width: 1px;
  padding-top: 0.5rem;
  padding-right: 0.75rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
}

input:checked + div {
  @apply border-purple-500;
}

input:checked + div svg {
  @apply block;
}
</style>
