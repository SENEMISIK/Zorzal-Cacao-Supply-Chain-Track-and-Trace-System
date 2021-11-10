import React, { ReactElement } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import useFormRadiofield from './hooks/index';

interface FormRadioFieldProps {
  handleStateChange: <T extends FieldValue>(
    setState: React.Dispatch<React.SetStateAction<T>>,
    eventValue: T,
    defaultValue: T,
    uid: string,
  ) => void,
  uid: string,
  field: FormRadioField
}
function FormRadioField({ handleStateChange, uid, field }: FormRadioFieldProps): ReactElement {
  const {
    fieldValue,
    setFieldValue,
  } = useFormRadiofield();
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" />
      <RadioGroup row>
        <FormControlLabel value={field.option1} control={<Radio />} label={field.option1} />
        <FormControlLabel value={field.option2} control={<Radio />} label={field.option2} />
      </RadioGroup>
    </FormControl>
  );
}

export default FormRadioField;
