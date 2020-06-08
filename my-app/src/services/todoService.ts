export type TodoItemModel = {
  id: number;
  title: string;
  isDone: boolean;
};

export const getTodoItems = (userId: string) => {
  // ajax
  return new Promise<TodoItemModel[]>((resolve, reject) => {
    setTimeout(
      () =>
        resolve([
          { id: 1, title: `item 1 ${userId}`, isDone: false },
          { id: 2, title: `item 2 ${userId}`, isDone: true },
          { id: 3, title: `item 3 ${userId}`, isDone: false },
        ]),
      2000
    );
  });
};
