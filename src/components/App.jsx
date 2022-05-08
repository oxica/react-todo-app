import React, { Component } from 'react';
import shortid from 'shortid';
import TodoList from './TodoList';
import initialTodos from './todos.json';
import s from './App.module.css';
import TodoEditor from './TodoEditor/TodoEditor';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    todos: initialTodos,
    filter: '',
  };

  addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };
    this.setState(prevState => ({
      todos: [todo, ...prevState.todos],
    }));
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  toggleCompleted = todoId => {
    // this.setState(prevState => ({
    //   todos: prevState.todos.map(todo => {
    //     if (todo.id === todoId) {
    //       return {
    //         ...todo,
    //         completed: !todo.completed,
    //       };
    //     }

    //     return todo;
    //   }),
    // }));

    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter)
    );
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0
    );
  };

  render() {
    const { todos, filter } = this.state;

    const totalTodoCount = todos.length;
    const completedTodoCount = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

    // const completedTodos = todos.filter(todo => todo.completed).length;

    return (
      <>
        <div className={s.container}>
          <p className={s.counter}>All todos: {totalTodoCount}</p>
          <p className={s.counter}>Сompleted todos: {completedTodoCount}</p>
        </div>
        <TodoEditor onSubmit={this.addTodo} />
        <Filter value={filter} onChange={this.changeFilter} />
        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
        ;
      </>
    );
  }
}

export default App;
