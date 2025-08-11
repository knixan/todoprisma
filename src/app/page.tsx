import { getTodos } from "@/actions/todo";

import TodoItem from "@/components/todo-item";

export default async function Page() {
  const todos = await getTodos();
  return (
    <div className="max-w-2/3 flex-item  mx-auto ">
      {todos.map((todo) => (
        <div key={todo.id}>
          <TodoItem todo={todo} />
        </div>
      ))}
    </div>
  );
}
