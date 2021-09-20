 import gql from "graphql-tag";


 const TOGGLE_TODO_RESOLVER = gql`
 mutation ($id: ID!, $completed: Boolean!, $text: String!) {
     todoUpdate(filter: { id: $id }, 
         data: {completed: $completed, text: $text}
     
         ) {
             id
             text
             completed
     }
 }
 `;
 
 module.exports = async (event, ctx) => {
     let response = null;
     try {
         response = await ctx.api.gqlRequest(TOGGLE_TODO_RESOLVER, {id: event.data.id, text: event.data.text, completed: event.data.completed})
     } catch (error) {
         return { data: {success: false, epa: "no funciona" } }
     }
     return { data: { success: true, epa: "funcionó!" } }


 }
