import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTodoContext } from "@/context/TodoContext";
import { useToast } from "@/components/ui/use-toast";

export default function AddTodoForm() {
  const [text, setText] = useState("");
  const { addTodo } = useTodoContext();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (text.trim()) {
      addTodo(text);
      setText("");
      toast({
        title: "Todo added",
        description: "Your new task has been added to the list.",
      });
    } else {
      toast({
        title: "Cannot add empty todo",
        description: "Please enter some text for your task.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1"
      />
      <Button type="submit" size="sm">
        <PlusCircle className="h-4 w-4 mr-2" />
        Add
      </Button>
    </form>
  );
}