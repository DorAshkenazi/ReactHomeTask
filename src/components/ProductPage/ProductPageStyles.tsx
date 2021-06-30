import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    margin: "auto",
    position: "relative",
  },
  titleTableCell: {
    width: "450px",
  },
  productImage: {
    width: "100px",
    height: "100px",
  },
  productImageCell: {
    display: "flex",
    justifyContent: "center",
  },
  muiSelectFocus: {
    backgroundColor: "white",
  },
});

export { useStyles };