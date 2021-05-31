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
