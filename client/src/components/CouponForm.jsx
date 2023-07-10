import LoadingButton from '@/common/LoadingButton';
import RadioInput from '@/common/RadioInput';
import TextField from '@/common/TextField';
import Select from 'react-select';

const couponsFormData = [
  {
    id: 1,
    label: 'کد',
    name: 'code',
  },
  {
    id: 2,
    label: 'مقدار',
    name: 'amount',
  },
  {
    id: 3,
    label: 'ظرفیت',
    name: 'usageLimit',
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

const CouponForm = ({
  onSubmit,
  coupon,
  handelChange,
  type,
  setType,
  products,
  setProductIds,
  isLoading,
  buttonText,
}) => {
  return (
    <div className='max-w-sm'>
      <form className='w-full space-y-6' onSubmit={onSubmit}>
        {couponsFormData.map((item) => {
          return (
            <TextField
              label={item.label}
              name={item.name}
              key={item.id}
              value={coupon[item.name]}
              onChange={handelChange}
            />
          );
        })}
        <div>
          <span className='mb-4 block'>نوع کد تخفیف</span>
          <div className='flex items-center gap-x-10'>
            <RadioInput
              checked={type === 'percent'}
              name='type'
              id='percent-type'
              label='درصد'
              value='percent'
              onChange={setType}
            />
            <RadioInput
              checked={type === 'fixedProduct'}
              name='type'
              id='fixedProduct-type'
              label='قیمت ثابت'
              value='fixedProduct'
              onChange={setType}
            />
          </div>
        </div>

        <div>
          <label htmlFor='products' className='mb-4 block'>
            شامل محصولات
          </label>
          <Select
            isMulti
            instanceId='products'
            name='products'
            options={products}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option._id}
            onChange={setProductIds}
            styles={customStyles}
            placeholder='محصولات'
            isRtl={true}
            // defaultValue={productIds}
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

export default CouponForm;
