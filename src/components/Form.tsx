import { ChangeEvent, FormEvent, useState } from 'react';
interface Todo {
   id: number;
   content: string;
   checked: boolean;
}

interface PropTypes {
   handleAddTodo: (todo: Todo) => void;
   handleSearchTodo: (value: string) => void;
   totalTodoValue: number;
}
const Form: React.FC<PropTypes> = ({
   handleAddTodo,
   handleSearchTodo,
   totalTodoValue,
}) => {
   const [todo, setTodo] = useState({ id: 0, content: '', checked: false });

   const handleInputValue = (value: string) => {
      setTodo({ id: Math.random(), content: value, checked: false });
   };

   const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleAddTodo({
         id: todo.id,
         content: todo.content,
         checked: todo.checked,
      });
      setTodo({ id: 0, content: '', checked: false });
   };

   return (
      <div className="todo_form">
         <form onSubmit={handleFormSubmit}>
            <div className="todo__form--group">
               <input
                  type="text"
                  placeholder="Add a new todo..."
                  value={todo.content}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                     handleInputValue(e.target.value)
                  }
               />
            </div>
         </form>
         {totalTodoValue > 0 && (
            <input
               type="text"
               placeholder="Search you todo items"
               onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSearchTodo(e.target.value)
               }
            />
         )}
      </div>
   );
};

export default Form;
