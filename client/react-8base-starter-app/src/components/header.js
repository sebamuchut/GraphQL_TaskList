import { withCreateTodo } from "../functions";
import React, { Component } from "react";


export class Header extends Component {
  state = { text: "" };
  render() {
    const { createTodo } = this.props;
    return (
      <header className="header">
        <h1>Task List</h1>
        <input
          className="new-todo"
          onChange={({ target }) =>
          this.setState(({ text }) => ({ text: target.value }))
        }
        onKeyPress={({ key }) => {
          if (key === "Enter") {
            createTodo({ text: this.state.text });
            this.setState({ text: "" });
          }
        }}
        value={this.state.text}
        placeholder="Add new task!"
        />
      </header>
    );
  }
}

Header = withCreateTodo(Header);