import gql from "graphql-tag";
import { graphql } from "react-apollo";

const TODO_LIST_QUERY = gql`
query TodoList {
  todosList(orderBy: [completed_ASC, createdAt_DESC]) {
    items {
      id
      text
      completed
    }
  }
}
`;

export const withTodos = graphql(TODO_LIST_QUERY, {
props: ({ data: { todosList }}) => {
  let todos = []
  if (todosList) {
    todos = todosList.items;
  }
  return {
    todos
  };
},
});


const CREATE_TODO_MUTATION = gql`
mutation TodoCreate($data: TodoCreateInput!) {
  todoCreate(data: $data) {
    id
    text
    completed
  }
}
`;

export const withCreateTodo = graphql(CREATE_TODO_MUTATION, {
props: ({ mutate }) => ({
  createTodo: ({ text }) => {
    mutate({
      variables: { data: { text, completed: false } },
      refetchQueries: [{ query: TODO_LIST_QUERY }]
    });
  }
})
});


const TOGGLE_TODO_MUTATION = gql`
mutation TodoToggle($id: ID!, $completed: Boolean!, $text: String!) {
  todoUpdate(filter: { id: $id }, 
  # data: $data
  data: {completed: $completed, text: $text}
  
  ) {
    id
    text
    completed
  }
}
`;
export const withEditTodo = graphql(TOGGLE_TODO_MUTATION, {
props: ({ mutate }) => ({
  editTodo: ({ id, completed, text }) => {
    mutate({
      variables: { id, completed, text },
      refetchQueries: [{ query: TODO_LIST_QUERY }]
    });
  }
})  
});

// export const withToggleTodo = graphql(TOGGLE_TODO_MUTATION, {
// props: ({ mutate }) => ({
//   toggleTodo: ({ id, completed, text }) => {
//     mutate({
//       variables: { id, completed, text },
//       refetchQueries: [{ query: TODO_LIST_QUERY }]
//     });
//   }
// })  
// });
const TOGGLE_TODO_RESOLVER = gql`
mutation toggleTodoResolver($id: ID!, $completed: Boolean!, $text: String!) {
  toggleTodoResolver(id: $id, completed: $completed, text: $text
  ) {
    success
  }
}
`;
export const withToggleTodo = graphql(TOGGLE_TODO_RESOLVER, {
  props: ({ mutate }) => ({
    toggleResolver: ({ id, completed, text }) => {
      mutate({
        variables: { id, completed, text },
        refetchQueries: [{ query: TODO_LIST_QUERY }]
      });
    }
  })  
  });


const DELETE_TODO_MUTATION = gql`
mutation TodoDelete($id: ID!) {
  todoDelete(filter: { id: $id }) {
    success
  }
}
`;

export const withRemoveTodo = graphql(DELETE_TODO_MUTATION, {
props: ({ mutate }) => ({
  removeTodo: ( id ) => {
    mutate({
      variables: { id },
      refetchQueries: [{ query: TODO_LIST_QUERY }]
    });
  }
})  
});



const USER_LOGIN = gql`
mutation userLogin($email: String!, $password: String!){
  userLogin(data:{
    email: $email
    password: $password
  }) {
    success
  }
}
`;

export const withUserLogin = graphql(USER_LOGIN, {
  props: ({ mutate, data }) => ({
    loginUser: async ( {email, password} ) => {
      try {
        let response = await mutate({
          variables: { email, password }
        });
        
          return response
      } catch (error) {
        return false
      }
    }
  })
});


