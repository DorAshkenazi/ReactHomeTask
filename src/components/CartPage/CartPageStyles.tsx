import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  productCard: {
    maxWidth: 450,
    margin: "auto",
    fontSize: 20,
  },
  returnButton: {
    position: "absolute",
    left: 10,
    top: 10,
    zIndex: 2,
  },
  pageTitle: {
    textAlign: "center",
    marginTop: "20px",
  },
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
  checkoutButton: {
    float: "right",
    marginRight: "20px",
    marginTop: "10px",
  },
  checkOutDialogText: {
    padding: "20px",
    textAlign: "center"
  },
  checkOutDialogTitle: {
    textAlign: "center"
  }
});

export { useStyles };
