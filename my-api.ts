const isOk = async (res: Response) => {
  if (res.ok) return res;
  throw new Error(res.statusText);
};

const toJSON = async (res: Response) => {
  await isOk(res);
  return res.json();
};

export type Todo = {
  id: number;
  title: string;
};

export const getTodos = async (): Promise<Todo[]> => {
  const { data } = await fetch("/api/todos").then(toJSON);
  return data;
};

export const postTodo = async (todo: Todo) => {
  const { data } = await fetch("/api/todos", {
    method: "POST",
    headers: {
      contentType: "application/json",
    },
    body: JSON.stringify({ data: todo }),
  }).then(toJSON);
  return data;
};

export const resetTodos = async (todo: Todo) => {
  await fetch("/api/reset", {
    method: "POST",
    headers: {
      contentType: "application/json",
    },
  });
};
