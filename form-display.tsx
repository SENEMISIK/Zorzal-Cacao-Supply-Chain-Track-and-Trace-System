import React, { ReactElement } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typeography from '@material-ui/core/Typography';
import useStyles from './form-display-styles';
import DisplayField from './display-layout-field/display-layout-field';

interface FormDisplayProps {
  form: Form,
  formRecord: FormRecord,
}

function FormDisplay({ form, formRecord }: FormDisplayProps): ReactElement {
  const fields = Object.keys(form.fields);
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Typeography variant="h3">{form.name}</Typeography>
      <TableContainer>
        <Table>
          {typeof form.layout === 'undefined' && fields.map((uid) => (
            <TableRow>
              <TableCell>
                {form.fields[uid].title}
              </TableCell>
              <TableCell>
                {formRecord.fieldValues[uid] ? formRecord.fieldValues[uid] : ''}
              </TableCell>
            </TableRow>
          ))}
          {typeof form.layout !== 'undefined' && form.layout.map((formEntry) => (
            <DisplayField
              form={form}
              formEntry={formEntry}
              formRecord={formRecord}
            />
          ))}
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default FormDisplay;
