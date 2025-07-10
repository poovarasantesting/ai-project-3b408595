import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import TodoList from "@/components/TodoList";
import AddTodoForm from "@/components/AddTodoForm";
import { TodoProvider } from "@/context/TodoContext";

export default function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">My Todo App</h1>
          <AddTodoForm />
          <TodoList />
        </div>
        <Toaster />
      </div>
    </TodoProvider>
  );
}