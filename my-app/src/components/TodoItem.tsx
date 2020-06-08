import React, { CSSProperties, memo } from "react";
import { TodoItemModel } from '../services/todoService';

type TodoItemProps = TodoItemModel & {
  onChecked: (id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const titleCssProps: CSSProperties = {
    textDecoration: props.isDone ? "line-through" : "none",
  };
  console.log(`render item ${props.title}`);
  const handleChange = () => props.onChecked(props.id);
  return (
    <div>
      <input
        type="checkbox"
        onChange={handleChange}
        checked={props.isDone}
      />
      <span style={titleCssProps}>{props.title}</span>
    </div>
  );
};

export default memo(TodoItem);
