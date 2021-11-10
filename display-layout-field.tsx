import React, { ReactElement } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

interface DisplayFieldProps {
  form: Form,
  formEntry: FormEntry,
  formRecord: FormRecord,
}

function isCategory(genericCategory: FormEntry): genericCategory is FormCategory {
  if (genericCategory.type === 'FORM_CATEGORY') {
    return true;
  }
  return false;
}

function DisplayField({ form, formEntry, formRecord }: DisplayFieldProps): ReactElement {
  if (formEntry.type === 'FIELD_NAME' && formEntry.title in form.fields) {
    return (
      <TableRow>
        <TableCell>
          {form.fields[formEntry.title].title}
        </TableCell>
        <TableCell>
          {formEntry.type === 'FIELD_NAME' && formRecord.fieldValues[formEntry.title] ? formRecord.fieldValues[formEntry.title] : ''}
        </TableCell>
      </TableRow>
    );
  }
  if (isCategory(formEntry)) {
    return (
      <>
        <TableRow>
          <TableCell>
            <b>
              {' '}
              {formEntry.title}
              {' '}
            </b>
          </TableCell>
        </TableRow>
        <TableRow>
          {formEntry.layout.map((subEntry: FormEntry) => (
            <DisplayField
              form={form}
              formEntry={subEntry}
              formRecord={formRecord}
            />
          ))}
        </TableRow>
      </>
    );
  }
  return (
    <TableCell />
  );
}

export default DisplayField;
