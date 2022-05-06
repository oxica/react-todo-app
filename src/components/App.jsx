import React, { Component } from 'react';
import TodoList from './TodoList';
import initialTodos from './todos.json';
import s from './App.module.css';

class App extends Component {
  state = {
    todos: initialTodos,
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  render() {
    const { todos } = this.state;

    const totalTodoCount = todos.length;

    // const completedTodos = todos.filter(todo => todo.completed).length;
    const completedTodos = todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0
    );

    return (
      <>
        <div className={s.container}>
          <p className={s.counter}>All todos: {totalTodoCount}</p>
          <p className={s.counter}>Сompleted todos: {completedTodos}</p>
        </div>
        <TodoList todos={todos} onDeleteTodo={this.deleteTodo} />;
      </>
    );
  }
}

export default App;
