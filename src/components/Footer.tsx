interface FooterProps {
   totalFilterValue: number;
   totalTodoValue: number;
   totalCheckedTodo: number;
   filter: 'all' | 'completed' | 'active';
   showCompletedItems: () => void;
   showActiveItems: () => void;
   showAllItems: () => void;
   clearCompletedItems: () => void;
}
const Footer: React.FC<FooterProps> = ({
   totalFilterValue,
   totalTodoValue,
   totalCheckedTodo,
   showCompletedItems,
   showActiveItems,
   showAllItems,
   clearCompletedItems,
   filter,
}) => {
   return (
      <div className="todo__footer">
         <div className="todo_counts">
            {filter === 'completed' &&
               `${totalFilterValue} items completed out ${totalTodoValue}`}
            {filter === 'active' && `${totalFilterValue} items to complete`}
            {filter === 'all' && `${totalTodoValue} items in total`}
         </div>

         {totalCheckedTodo > 0 && (
            <>
               <div className="todo__footer--links">
                  <a
                     href="#"
                     onClick={(e) => {
                        e.preventDefault;
                        showAllItems();
                     }}
                  >
                     All
                  </a>
                  <a
                     href="#"
                     onClick={(e) => {
                        e.preventDefault;
                        showActiveItems();
                     }}
                  >
                     Active
                  </a>
                  <a
                     href="#"
                     onClick={(e) => {
                        e.preventDefault;
                        showCompletedItems();
                     }}
                  >
                     Completed
                  </a>
               </div>
               <a
                  href="#"
                  onClick={(e) => {
                     e.preventDefault;
                     clearCompletedItems();
                  }}
               >
                  Clear Completed
               </a>
            </>
         )}
      </div>
   );
};

export default Footer;
