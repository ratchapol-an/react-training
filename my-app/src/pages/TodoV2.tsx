import React, { ChangeEvent } from "react";
import TodoItem from "../components/TodoItem";
import { TodoItemModel, getTodoItems } from "../services/todoService";
import withUserContext from "../contexts/withUserContext";

type TodoV2Props = {
  title: string;
  version: number;
  userId: string;
};

type TodoV2State = {
  todoItems: TodoItemModel[];
  inputValue: string;
  example: string;
};

class TodoV2 extends React.Component<TodoV2Props, TodoV2State> {
  // static contextType = UserContext;
  // context!: React.ContextType<typeof UserContext>;

  constructor(props: TodoV2Props) {
    super(props);
    this.state = {
      todoItems: [],
      inputValue: "",
      example: "test",
    };
  }

  async componentDidMount() {
    const todoItems = await getTodoItems(this.props.userId);
    this.setState({ todoItems });
  }

  componentDidUpdate(prevProps: Readonly<TodoV2Props>) {
    if (prevProps.userId !== this.props.userId) {
      getTodoItems(this.props.userId).then((value) => {
        this.setState({ todoItems: value });
      });
    }
  }

  public render() {
    return (
      <div>
        <h1>
          {this.props.title} v{this.props.version}
        </h1>
        <div>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleAddBtnClick}>Add</button>
        </div>
        <div>
          {/* {todoItems.map((todoItem, index) => (
              <TodoItem
                title={todoItem.title}
                isDone={todoItem.isDone}
                key={index}
              />
            ))} */}
          {this.state.todoItems.length > 0 ? (
            this.state.todoItems.map((todoItem, index) => {
              return (
                <TodoItem
                  id={todoItem.id}
                  title={todoItem.title}
                  isDone={todoItem.isDone}
                  key={index}
                  onChecked={this.handleItemChecked}
                />
              );
            })
          ) : (
            <div>loading</div>
          )}
        </div>
      </div>
    );
  }

  private handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // event.persist();
    this.setState({ inputValue: event.target.value });

    // this.setState((prevState) => ({
    //   ...prevState,
    //   inputValue: event.target.value,
    // }));
  };

  private handleAddBtnClick = () => {
    this.setState((prevState) => ({
      inputValue: "",
      todoItems: [
        ...prevState.todoItems,
        {
          title: `${prevState.inputValue} ${this.props.userId}`,
          isDone: false,
          id: new Date().getTime(),
        },
      ],
    }));
  };

  private handleItemChecked = (id: number) => {
    this.setState((prevState) => ({
      ...prevState,
      todoItems: prevState.todoItems.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          isDone: !item.isDone,
        };
      }),
    }));
  };
}

export default withUserContext(TodoV2);
