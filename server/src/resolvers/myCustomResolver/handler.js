/**
 * This file was generated using 8base CLI.
 *
 * To learn more about writing custom GraphQL resolver functions, visit
 * the 8base documentation at:
 *
 * https://docs.8base.com/8base-console/custom-functions/resolvers
 *
 * To update this functions invocation settings, update its configuration block
 * in the projects 8base.yml file:
 *  functions:
 *    myCustomResolver:
 *      ...
 *
 * Data that is sent to this function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * There are two ways to invoke this function locally:
 *
 *  (1) Explicit file mock file path using '-p' flag:
 *    8base invoke-local myCustomResolver -p src/resolvers/myCustomResolver/mocks/request.json
 *
 *  (2) Default mock file location using -m flag:
 *    8base invoke-local myCustomResolver -m request
 *
 *  Add new mocks to this function to test different input arguments. Mocks can easily be generated
 *  the following generator command:
 *    8base generate mock myCustomResolver -m [MOCK_FILE_NAME]
 */
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


// import { FunctionContext, FunctionEvent, FunctionResult } from '8base-cli-types';


// type ResolverResult = FunctionResult<{
//   result: string,
// }>;

// export default async (
//   event: FunctionEvent<{ foo: string }>,
//   ctx: FunctionContext,
// ): ResolverResult => {
//   return {
//     data: {
//       result: `Resolver recieved: ${event.data.foo}`,
//     },
//   };
// };
