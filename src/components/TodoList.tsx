import { useMemo } from "react";
import { useTodoContext } from "@/context/TodoContext";
import TodoItem from "@/components/TodoItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TodoList() {
  const { todos } = useTodoContext();

  const activeTodos = useMemo(() => 
    todos.filter(todo => !todo.completed), [todos]);
  
  const completedTodos = useMemo(() => 
    todos.filter(todo => todo.completed), [todos]);

  return (
    <div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="all">
            All ({todos.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Active ({activeTodos.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedTodos.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-1">
          {todos.length > 0 ? (
            todos.map(todo => <TodoItem key={todo.id} todo={todo} />)
          ) : (
            <p className="text-center text-gray-500 py-4">No todos yet. Add one above!</p>
          )}
        </TabsContent>
        
        <TabsContent value="active" className="space-y-1">
          {activeTodos.length > 0 ? (
            activeTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)
          ) : (
            <p className="text-center text-gray-500 py-4">No active todos!</p>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-1">
          {completedTodos.length > 0 ? (
            completedTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)
          ) : (
            <p className="text-center text-gray-500 py-4">No completed todos yet.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}