import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const { toast } = useToast();
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Complete project proposal", completed: false },
    { id: 2, text: "Buy groceries", completed: true },
    { id: 3, text: "Schedule dentist appointment", completed: false },
    { id: 4, text: "Go for a run", completed: false },
    { id: 5, text: "Read a book chapter", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newTodo.trim() === '') {
      toast({
        title: "Error",
        description: "Todo cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    const newId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    
    setTodos([...todos, { id: newId, text: newTodo, completed: false }]);
    setNewTodo('');
    
    toast({
      title: "Todo Added",
      description: "Your todo has been added successfully",
    });
  };

  const handleToggleComplete = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    
    toast({
      title: "Todo Deleted",
      description: "Your todo has been deleted",
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Todo App</h1>
      
      <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1"
        />
        <Button type="submit">Add</Button>
      </form>
      
      <div className="space-y-2">
        {todos.map(todo => (
          <div 
            key={todo.id} 
            className={`flex items-center justify-between p-3 border rounded-md ${
              todo.completed ? 'bg-gray-50' : 'bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Checkbox 
                checked={todo.completed} 
                onCheckedChange={() => handleToggleComplete(todo.id)}
                id={`todo-${todo.id}`}
              />
              <label 
                htmlFor={`todo-${todo.id}`}
                className={`flex-1 cursor-pointer ${
                  todo.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {todo.text}
              </label>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => handleDeleteTodo(todo.id)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}

        {todos.length === 0 && (
          <p className="text-center text-gray-500 py-4">No todos yet. Add some!</p>
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>{todos.filter(todo => todo.completed).length} of {todos.length} tasks completed</p>
      </div>
    </div>
  );
};

export default TodoApp;