import { useEffect, useState } from 'react';
import Form from './Form';
import List from './List';
import Footer from './Footer';
import ThemeToggler from './ThemeToggler';

interface ValueProps {
   id: number;
   content: string;
   checked: boolean;
}

const Todo = () => {
   const key: string = 'todoKey';
   const [todoArray, setTodoArray] = useState<ValueProps[]>(() => {
      const getItems = localStorage.getItem(key);
      const parsedItems: ValueProps[] = getItems ? JSON.parse(getItems) : [];
      return parsedItems;
   });

   const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');
   const [search, setSearch] = useState<string>('');

   const handleFormSubmit = (value: ValueProps) => {
      const { id, content, checked } = value;
      if (!content) return;
      const ifInputValueMatched = todoArray.find(
         (currentValue: ValueProps) => currentValue.content === content
      );
      if (ifInputValueMatched) return alert('Value is already in the list');
      setTodoArray((prevValue) => [{ id, content, checked }, ...prevValue]);
   };

   const handleDeleteTodo = (currentValue: string) => {
      console.log(currentValue);
      const filteredTodoArray = todoArray.filter(
         (todo) => todo.content !== currentValue
      );
      setTodoArray(filteredTodoArray);
   };

   const handleCheckTodo = (currentValue: string) => {
      const updatedTodoArray = todoArray.map((todoItem) => {
         if (todoItem.content === currentValue) {
            return { ...todoItem, checked: !todoItem.checked };
         } else {
            return todoItem;
         }
      });
      setTodoArray(updatedTodoArray);
   };

   const totalCompletedTodo = todoArray.filter(
      (todoItem) => todoItem.checked === true
   );

   const totalActiveTodo = todoArray.filter((todoItem) => !todoItem.checked);

   const totalCheckedTodo = todoArray.filter(
      (todoItem) => todoItem.checked
   ).length;

   useEffect(() => {
      localStorage.setItem(key, JSON.stringify(todoArray));
   }, [todoArray]);

   const handleShowCompletedTodo = () => {
      setFilter('completed');
   };

   const handleShowActiveTodo = () => {
      setFilter('active');
   };

   const handleShowAllTodo = () => {
      setFilter('all');
   };

   const handleClearCompletedTodo = () => {
      const newTodoArray = todoArray.filter((todoArray) => !todoArray.checked);
      setTodoArray(newTodoArray);
      localStorage.setItem(key, JSON.stringify(newTodoArray));
   };

   const handleSearchTodo = (value: string) => {
      setSearch(value);
   };

   return (
      <section className="todo">
         <div className="todo__header">
            <h1>TO DO</h1>
            <ThemeToggler />
         </div>
         <Form
            handleAddTodo={handleFormSubmit}
            totalTodoValue={todoArray.length}
            handleSearchTodo={handleSearchTodo}
         />

         <div className="todo__list">
            <ul>
               {(filter === 'completed'
                  ? totalCompletedTodo
                  : filter === 'active'
                  ? totalActiveTodo
                  : todoArray
               )
                  .filter((todoItem) =>
                     todoItem.content
                        .toLocaleLowerCase()
                        .includes(search.toLocaleLowerCase())
                  )
                  .map((todo) => (
                     <List
                        key={todo.id}
                        content={todo.content}
                        checked={todo.checked}
                        checkItem={handleCheckTodo.bind(null, todo.content)}
                        deleteItem={handleDeleteTodo.bind(null, todo.content)}
                     />
                  ))}
            </ul>
            {todoArray.length > 0 && (
               <Footer
                  totalCheckedTodo={totalCheckedTodo}
                  totalTodoValue={todoArray.length}
                  totalFilterValue={
                     filter === 'all'
                        ? todoArray.length
                        : filter === 'active'
                        ? totalActiveTodo.length
                        : totalCompletedTodo.length
                  }
                  filter={filter}
                  showCompletedItems={handleShowCompletedTodo}
                  showActiveItems={handleShowActiveTodo}
                  showAllItems={handleShowAllTodo}
                  clearCompletedItems={handleClearCompletedTodo}
               />
            )}
         </div>
      </section>
   );
};

export default Todo;
