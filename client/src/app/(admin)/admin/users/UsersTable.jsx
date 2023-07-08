import { usersListTableHeads } from '@/constants/tableHeads';
import { toLocalDateStringShort } from '@/utils/toLocalDate';
import { toPersianNumbers } from '@/utils/toPersianNumbers';
import Link from 'next/link';
import { HiOutlineCheck, HiOutlineXMark } from 'react-icons/hi2';

const UsersTable = ({ users }) => {
  function removeDuplicateObjects(arr, property) {
    return [...new Map(arr.map((obj) => [obj[property], obj])).values()];
  }
  return (
    <div className='my-8 overflow-auto shadow-sm'>
      <table className='w-full min-w-[800px] table-auto border-collapse'>
        <thead>
          <tr>
            {usersListTableHeads.map((item) => {
              return (
                <th className='table__th whitespace-nowrap' key={item.id}>
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td className='table__td'>{toPersianNumbers(index + 1)}</td>
                <td className='table__td'>{user.name}</td>
                <td className='table__td'>
                  <div className='flex items-center gap-x-2 whitespace-nowrap'>
                    {user.phoneNumber}
                    {user.isVerifiedPhoneNumber ? (
                      <HiOutlineCheck className='h-6 w-6 text-green-600' />
                    ) : (
                      <HiOutlineXMark className='h-6 w-6 text-red-600' />
                    )}
                  </div>
                </td>
                <td className='table__td'>{user.email}</td>
                <td className='table__td max-h-40 overflow-y-auto'>
                  <div className='flex flex-col gap-y-2 text-xs lg:text-sm'>
                    {user.Products.length ? (
                      removeDuplicateObjects(user.Products, '_id').map(
                        (product) => {
                          return (
                            <p
                              className='badge badge--secondary'
                              key={product._id}
                            >
                              {product.title}
                            </p>
                          );
                        }
                      )
                    ) : (
                      <span> محصولی یافت نشد </span>
                    )}
                  </div>
                </td>
                <td className='table__td'>
                  {toLocalDateStringShort(user.createdAt)}
                </td>
                <td className='table__td'>
                  <Link
                    className='text-blue-600 transition-all duration-300 hover:text-blue-800'
                    href={`/admin/users/${user._id}`}
                  >
                    مشاهده جزئیات
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
