import { Checkbox, Input } from '@agile-ui/react';

export const FormDemo = () => {
  return (
    <form className={'flex flex-col gap-4'}>
      <div className={'flex flex-row items-center justify-start gap-4'}>
        <div className={'flex flex-col'}>
          <label htmlFor={'demoFormFirstName'} className={''}>
            姓 <span className={'text-red-500'}>*</span>
          </label>
          <Input className={'w-full'} placeholder={'姓'} id={'demoFormFirstName'} />
        </div>
        <div className={'flex flex-col'}>
          <label htmlFor={'demoFormLastName'} className={''}>
            名 <span className={'text-red-500'}>*</span>
          </label>
          <Input className={'w-full'} placeholder={'名'} id={'demoFormLastName'} />
        </div>
      </div>
      <div className={'flex flex-col'}>
        <label htmlFor={'demoFormEmail'} className={''}>
          电子邮箱 <span className={'text-red-500'}>*</span>
        </label>
        <Input className={'w-full'} placeholder={'电子邮箱'} id={'demoFormEmail'} />
      </div>
      <div className={'flex flex-col'}>
        <label htmlFor={'demoFormPassword'} className={''}>
          密码 <span className={'text-red-500'}>*</span>
        </label>
        <Input className={'w-full'} placeholder={'密码'} id={'demoFormPassword'} />
      </div>
      <div className={'flex flex-col'}>
        <label htmlFor={'demoFormPasswordRepeat'} className={''}>
          确认密码 <span className={'text-red-500'}>*</span>
        </label>
        <Input className={'w-full'} placeholder={'确认密码'} id={'demoFormPasswordRepeat'} />
      </div>
      <div>
        <Checkbox defaultChecked={true}>同意用户协议和隐私策略</Checkbox>
      </div>
    </form>
  );
};
