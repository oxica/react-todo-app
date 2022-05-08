import s from './TodoList.module.css';

const TodoList = ({ todos, onDeleteTodo, onToggleCompleted }) => (
  <ul className={s.list}>
    {todos.map(({ id, text, completed }) => (
      <li key={id} className={s.item}>
        <input
          type="checkbox"
          className="checkbox"
          checked={completed}
          onChange={() => onToggleCompleted(id)}
        />
        <p className={s.text}>{text}</p>
        <button
          onClick={() => onDeleteTodo(id)}
          type="button"
          className={s.buttonDelete}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export default TodoList;
