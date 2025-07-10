import { useState } from "react";
import { Check, Trash, Edit, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTodoContext } from "@/context/TodoContext";
import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const { toggleTodo, deleteTodo, editTodo } = useTodoContext();

  const handleEdit = () => {
    if (editText.trim()) {
      editTodo(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center p-3 border-b border-gray-100 group">
      <Button
        variant="ghost"
        size="icon"
        className={cn("h-6 w-6 rounded-full mr-2", 
          todo.completed ? "bg-green-100 text-green-600" : "bg-gray-100")}
        onClick={() => toggleTodo(todo.id)}
      >
        <Check className={cn("h-4 w-4", todo.completed ? "opacity-100" : "opacity-0 group-hover:opacity-50")} />
      </Button>

      {isEditing ? (
        <div className="flex flex-1 items-center gap-2">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1"
            autoFocus
          />
          <Button size="icon" variant="ghost" onClick={handleEdit}>
            <Save className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <span className={cn("flex-1", todo.completed && "line-through text-gray-400")}>
            {todo.text}
          </span>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => setIsEditing(true)}
              disabled={todo.completed}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => deleteTodo(todo.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}