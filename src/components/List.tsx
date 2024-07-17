import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoTrashOutline } from 'react-icons/io5';
interface PropTypes {
   content: string;
   checked: boolean;
   checkItem: (content: string) => void;
   deleteItem: (content: string) => void;
}

const List = ({ content, deleteItem, checkItem, checked }: PropTypes) => {
   return (
      <li className={checked ? 'checked' : ''}>
         <span>{content}</span>
         <span className="icons">
            <button onClick={() => checkItem(content)}>
               <IoIosCheckmarkCircle />
            </button>

            <button onClick={() => deleteItem(content)}>
               <IoTrashOutline />
            </button>
         </span>
      </li>
   );
};

export default List;
