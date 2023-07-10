import { categoriesTableHeads } from '@/constants/tableHeads';
import { useRemoveCategory } from '@/hooks/useCategories';
import { toPersianNumbers } from '@/utils/toPersianNumbers';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { HiEye, HiTrash } from 'react-icons/hi2';
import { RiEdit2Line } from 'react-icons/ri';

const CategoriesTable = ({ categories }) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useRemoveCategory();

  const handlerRemoveCategory = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['get-categories'] });
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className='my-8 overflow-auto shadow-sm'>
      <table className='w-full min-w-[800px] table-auto border-collapse'>
        <thead>
          <tr>
            {categoriesTableHeads.map((item) => {
              return (
                <th className='table__th whitespace-nowrap' key={item.id}>
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => {
            return (
              <tr key={category._id}>
                <td className='table__td'>{toPersianNumbers(index + 1)}</td>
                <td className='table__td truncate whitespace-nowrap font-bold'>
                  {category.title}
                </td>
                <td className='table__td'>{category.description}</td>
                <td className='table__td'>{category.englishTitle}</td>
                <td className='table__td'>
                  <span className='badge badge--secondary'>
                    {category.type}
                  </span>
                </td>
                <td className='table__td'>
                  <div className='flex items-center justify-center gap-x-4'>
                    <Link href={`/admin/categories/${category._id}`}>
                      <HiEye className='h-6 w-6 text-primary-900 hover:text-primary-700' />
                    </Link>
                    <button onClick={() => handlerRemoveCategory(category._id)}>
                      <HiTrash className='h-6 w-6 text-rose-600 hover:text-rose-800' />
                    </button>
                    <Link href={`/admin/categories/edit/${category._id}`}>
                      <RiEdit2Line className='h-6 w-6 text-secondary-600 hover:text-secondary-800' />
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
