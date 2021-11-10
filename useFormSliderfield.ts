import { useState } from 'react';

export interface UseFormSliderFieldInterface {
  fieldValue: number | number[],
  setFieldValue: React.Dispatch<React.SetStateAction<number | number[]>>,
}

const useFormSliderfield = (): UseFormSliderFieldInterface => {
  const [fieldValue, setFieldValue] = useState<number | number[]>(0);

  const useFormSliderFieldHook = {
    fieldValue,
    setFieldValue,
  };
  return useFormSliderFieldHook;
};
export default useFormSliderfield;
