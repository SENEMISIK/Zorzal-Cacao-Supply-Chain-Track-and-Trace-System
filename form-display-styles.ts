import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    position: 'fixed',
    height: '90%',
    top: '5%',
    [theme.breakpoints.up('lg')]: {
      left: '30%',
      width: '40%',
    },
    [theme.breakpoints.only('md')]: {
      left: '25%',
      width: '50%',
    },
    [theme.breakpoints.only('sm')]: {
      left: '12%',
      width: '76%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '94%',
      left: '3%',
    },
    overflow: 'scroll',
    justifyContent: 'center',
    // border: '3px solid green',
  },
  table: {
    textAlign: 'center',
  },
}));

export default useStyles;
