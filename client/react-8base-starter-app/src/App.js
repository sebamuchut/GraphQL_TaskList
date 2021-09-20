import React, { Component } from "react";
import compose from "lodash/flowRight";
import { HashRouter as Router, withRouter } from "react-router-dom";
import { EightBaseAppProvider } from '@8base/app-provider';
import "./AppStyle.css";
import "./Login.css"
import { withEditTodo, withRemoveTodo, withToggleTodo, withTodos, withUserLogin } from './functions'
import {Header} from "./components/header";
import loader from "./loader.gif"

class Main extends Component {
  state = { text: ""};
  
  render() {
    const {
      todos,
      toggleResolver,
      editTodo,
      removeTodo,
      location
    } = this.props;

    return  todos && todos.length ? (
      <section className="main">
        <ul className="todo-list">
          {
          todos.filter(todo => {
              if (location.pathname === "/completed") {
                return todo.completed;
              }
              if (location.pathname === "/active") {
                return !todo.completed;
              }
              return true;
            })
            .map(todo => (
              <li
                key={todo.id}
                className={todo.completed ? "completed" : undefined}
              >
                <div className="view">
                  <input
                    className="toggle"
                    onChange={() => toggleResolver({ id: todo.id, completed: !todo.completed, text: todo.text })}
                    checked={todo.completed}
                    type="checkbox"
                    title="Mark task as completed"
                  />
                  
                  <label>{todo.text.charAt(0).toUpperCase() + todo.text.slice(1)}</label>
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="destroy"
                    title='Delete task'
                  >X</button>
                  {
                    !todo.completed ? 
                  <input
                      className='edit-task'
                      onChange={({ target }) =>
                        this.setState(({ text }) => ({ text: target.value }))
                      }
                      onKeyPress={({ key }) => {
                        if (key === "Enter") {
                          editTodo({ id: todo.id, completed: false , text: this.state.text });
                          this.setState({ text: "" });
                        }
                      }}
                      placeholder="Edit task"
                    /> :
                    <input className='edit-task' placeholder="Task completed"/>
                  }
                </div>
              </li>
            ))}
        </ul>
      </section>
    ) : null
  }
}


Main = compose(
  withUserLogin,
  withRouter,
  withTodos,
  withEditTodo,
  withToggleTodo,
  withRemoveTodo
)(Main);

export class LoginUser extends Component{
  state = { email: "", password: "", task: "", loading: false};

  componentDidUpdate(prevProps, prevState) {
    if (prevState.task !== this.state.task) {
    }
  }

  render() {
    var response = undefined
    const { loginUser } = this.props;
    const loginFunction = async () => {
        this.setState({task: '', loading: true})
        response = await loginUser({email: this.state.email, password: this.state.password})
        response && response.data.userLogin.success ? this.setState({task: true, loading: false}) : this.setState({task: false, loading: false})
    }
    return (
      <div className='main-wrapper'>
      {
        this.state.task ? 
        <div className='welcome'>
          <button onClick={()=>this.setState({email: '', password: '', task: ''})}>Logout</button>
          <h2>Welcome {this.state.email.split('@')[0]}!</h2>
        </div> :
        <>
          <h3>Log in to see your Task List</h3>
          <input name="email" onChange={(e) => this.setState({...this.state, email: e.target.value})} value={this.state.email} placeholder="Email" />
          <input
            name="password"
            onChange={(e) => this.setState({...this.state, password: e.target.value})}
            value={this.state.password}
            type="password"
            placeholder="Password"
          
          />
          <button onClick={loginFunction} >Login</button>
          {
            this.state.task===false && <p>Incorrect Email or Password</p>
          }
        </>
      }
      {
        this.state.loading && <img className = 'gif' src = {loader} alt='loading...'/>
      }
        {
         this.state.task === true &&
         <div>
         <Header />
         <Main />
         </div>
        }
      </div>
    );
  }
}


LoginUser = withUserLogin(LoginUser);


const ENDPOINT_URL = 'https://api.8base.com/cktkhowvg00mj07le93cqdx6x';

class App extends Component {

  render() {
    return (
      <Router>
        <EightBaseAppProvider uri={ENDPOINT_URL}>
          {({ loading }) => loading ? <img className = 'gif' src = {loader} alt='loading...'/> : (
            <div className="todoapp">
              <LoginUser />
            </div>
          )}
        </EightBaseAppProvider>
      </Router>
    );
  }
}


export default App;
