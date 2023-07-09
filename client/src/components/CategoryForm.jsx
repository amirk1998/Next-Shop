import LoadingButton from '@/common/LoadingButton';
import TextField from '@/common/TextField';
import Select from 'react-select';

const categoriesFormData = [
  {
    id: 1,
    label: 'عنوان',
    name: 'title',
  },
  {
    id: 2,
    label: 'عنوان انگلیسی',
    name: 'englishTitle',
  },
  {
    id: 3,
    label: 'توضیحات',
    name: 'description',
  },
];

const customStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: '#f3f4f6',
    padding: '8px 0px',
    borderRadius: '12px',
  }),
};

const CategoryForm = ({
  onSubmit,
  categoryData,
  categoryDataOnChange,
  categoryTypes,
  selectedType,
  setSelectedType,
  isLoading,
  buttonText,
}) => {
  return (
    <div className='max-w-sm'>
      <form className='w-full space-y-6' onSubmit={onSubmit}>
        {categoriesFormData.map((item) => {
          return (
            <TextField
              label={item.label}
              name={item.name}
              key={item.id}
              value={categoryData[item.name]}
              onChange={categoryDataOnChange}
            />
          );
        })}
        <div>
          <label htmlFor='type' className='mb-4 block'>
            نوع
          </label>
          <Select
            instanceId='type'
            name='type'
            onChange={setSelectedType}
            options={categoryTypes}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option.value}
            defaultValue={selectedType}
            styles={customStyles}
            placeholder='نوع'
            isRtl={true}
          />
        </div>

        <div>
          {isLoading ? (
            <LoadingButton isWidthFull={true} />
          ) : (
            <button type='submit' className='btn btn--primary w-full'>
              {buttonText}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
