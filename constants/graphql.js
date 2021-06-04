import gql from 'graphql-tag'

export const CREATE_NEW_TODO_MUTATION = gql`
  mutation CreateNewTodo($description: String!, $dueDate: String!) {
    createTodo(description: $description, dueDate: $dueDate) {
      todo {
        description
        dueDate
        completed
      }
      success
      errors
    }
  }
`

export const GET_TODO = gql`
  query getTodo($id: ID!) {
    todo(todoId: $id) {
      todo {
        completed
        description
        id
      }
    }
  }
`

export const GET_ALL_TODOS = gql`
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

export const UPDATE_DUE = gql`
  mutation UpdateTodoDue($todoId: String, $newDate: String!) {
    updateDueDate(todoId: $todoId, newDate: $newDate) {
      todo {
        dueDate
      }
      success
      errors
    }
  }
`

export const DELETE_TODO = gql`
  mutation deleteTodo($todoId: ID!) {
    deleteTodo(todoId: $todoId) {
      success
      errors
    }
  }
`
