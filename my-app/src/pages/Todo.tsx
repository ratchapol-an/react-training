import React, {
  useState,
  ChangeEvent,
  useEffect,
  useContext,
  useCallback,
} from "react";
import TodoItem from "../components/TodoItem";
import { TodoItemModel, getTodoItems } from "../services/todoService";
import UserContext from "../contexts/UserContext";

export type TodoProps = {
  title: string;
  version: number;
};

const Todo: React.FC<TodoProps> = (props) => {
  const [todoItems, setTodoItems] = useState<TodoItemModel[]>([]);
  const [inputValue, setInputValue] = useState("");
  const userId = useContext(UserContext).userId;
  useEffect(() => {
    async function getMyTodoItems() {
      const todoItems = await getTodoItems(userId);
      setTodoItems(todoItems);
    }
    console.log("xxx");
    getMyTodoItems();
  }, [userId]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleAddBtnClick = () => {
    setInputValue("");
    setTodoItems((prevState) => [
      ...prevState,
      {
        title: `${inputValue} ${userId}`,
        isDone: false,
        id: new Date().getTime(),
      },
    ]);
  };
  const handleItemChecked = useCallback((id: number) => {
    setTodoItems((prevState) => {
      return prevState.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          isDone: !item.isDone,
        };
      });
    });
  }, []);
  return (
    <div>
      <h1>
        {props.title} v{props.version}
      </h1>
      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleAddBtnClick}>Add</button>
      </div>
      <div>
        {/* {todoItems.map((todoItem, index) => (
          <TodoItem
            title={todoItem.title}
            isDone={todoItem.isDone}
            key={index}
          />
        ))} */}
        {todoItems.map((todoItem, index) => {
          return (
            <TodoItem
              id={todoItem.id}
              title={todoItem.title}
              isDone={todoItem.isDone}
              key={index}
              onChecked={handleItemChecked}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
