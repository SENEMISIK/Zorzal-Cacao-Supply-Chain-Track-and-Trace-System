import { useState } from 'react';

export interface UseFormRadioFieldInterface {
  fieldValue: string,
  setFieldValue: React.Dispatch<React.SetStateAction<string>>,
}

const useFormRadiofield = (): UseFormRadioFieldInterface => {
  const [fieldValue, setFieldValue] = useState('');

  const useFormRadioFieldHook = {
    fieldValue,
    setFieldValue,
  };
  return useFormRadioFieldHook;
};

export default useFormRadiofield;
