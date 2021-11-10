import React, { ReactElement } from 'react';
import Slider from '@material-ui/core/Slider';
import useFormSliderfield from './hooks/index';

interface FormSliderFieldProps {
  handleStateChange: <T extends FieldValue>(
    setState: React.Dispatch<React.SetStateAction<T>>,
    eventValue: T,
    defaultValue: T,
    uid: string,
  ) => void,
  uid: string,
  field: FormSliderField
}

function FormSliderField({
  handleStateChange,
  uid,
  field,
}: FormSliderFieldProps): ReactElement {
  function valuetext(value: number) {
    return `${value}`;
  }
  const { fieldValue, setFieldValue } = useFormSliderfield();
  return (
    <Slider
      defaultValue={field.min}
      aria-labelledby="discrete-slider-small-steps"
      getAriaValueText={valuetext}
      step={field.step}
      value={fieldValue}
      marks
      min={field.min}
      max={field.max}
      valueLabelDisplay="auto"
      onChange={(_e, newVal) => handleStateChange(setFieldValue, newVal, 0, uid)}
    />
  );
}

export default FormSliderField;
