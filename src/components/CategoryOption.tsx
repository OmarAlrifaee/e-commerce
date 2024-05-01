import { Category } from "../Types";
type CategoryOptionProps = {
  category: Category;
  categoryId: number;
  setCategoryId: React.Dispatch<React.SetStateAction<number>>;
};
export const CategoryOption = ({
  category,
  setCategoryId,
  categoryId,
}: CategoryOptionProps) => {
  return (
    <li
      onClick={() => setCategoryId(category.id)}
      className={` md:border-l-2 border-b-2 p-3 font-bold cursor-pointer 
        ${
          category.id === categoryId
            ? "text-primary border-l-primary border-b-primary"
            : "text-black dark:text-white-muted md:border-l-secondry-dark md:dark:border-l-white-muted border-b-secondry-dark dark:border-b-white-muted"
        }      
      `}
    >
      {category.name}
    </li>
  );
};
