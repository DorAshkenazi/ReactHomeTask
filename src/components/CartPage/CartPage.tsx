import { useState } from "react";
import { useStyles } from "./CartPageStyles";

// Models
import Product from "../../models/Product";

// Router
import { useHistory } from "react-router-dom";

// React Material-UI
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Toolbar,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  IconButton,
  Typography,
} from "@material-ui/core/";
import UndoIcon from "@material-ui/icons/Undo";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromCart, resetCart } from "../../redux/cartItemsSlice";

export const CartPage: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const productsInCart = useSelector((state: any) => state.cartItems);

  const handleReturn = () => {
    history.push("/");
  };

  // Table States & Functions
  const [rowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const removeFromCart = (product: Product) => {
    dispatch(removeProductFromCart(product));
  };

  // Dialog States & Functions
  const [checkOutAgreementOpen, setCheckOutAgreementOpen] =
    useState<boolean>(false);
  const [checkOutSummaryOpen, setCheckOutSummaryOpen] =
    useState<boolean>(false);
  const [sumPriceOfProductsInCart, setSumPriceOfProductsInCart] =
    useState<number>(0);

  const handleAgreeToCheckOutOpen = () => {
    if (productsInCart.length > 0) {
      let sum: number = productsInCart
        .map((product: Product) => product.price)
        .reduce(function (a: number, b: number) {
          return a + b;
        });

      setSumPriceOfProductsInCart(+sum.toFixed(2));
      setCheckOutAgreementOpen(true);
    } else {
      alert("Please add items to the cart before checking out");
    }
  };

  const handleAgreeToCheckOutClose = () => {
    setCheckOutAgreementOpen(false);
  };

  const handleCheckOutSummary = () => {
    handleAgreeToCheckOutClose();
    dispatch(resetCart());
    setCheckOutSummaryOpen(true);
  };

  const handleCheckOutSummaryClose = () => {
    setCheckOutSummaryOpen(false);
  };

  return (
    <div>
      <IconButton
        className={classes.returnButton}
        onClick={() => handleReturn()}
      >
        <UndoIcon />
      </IconButton>
      <Toolbar style={{ justifyContent: "center" }}>
          <Typography variant="h6">Shopping Cart</Typography>
        </Toolbar>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Product Image</TableCell>
              <TableCell align="center">Remove from Cart</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsInCart
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product: Product, index: number) => (
                <TableRow key={index} hover={true}>
                  <TableCell className={classes.titleTableCell}>
                    {product.title}
                  </TableCell>
                  <TableCell align="center">${product.price}</TableCell>
                  <TableCell className={classes.productImageCell}>
                    <img
                      className={classes.productImage}
                      src={product.image}
                      alt="sourceImage"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => removeFromCart(product)}>
                      <HighlightOffIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={productsInCart.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
      />
      <Button
        className={classes.checkoutButton}
        variant="contained"
        color="primary"
        onClick={() => handleAgreeToCheckOutOpen()}
      >
        Checkout
      </Button>
      <Dialog open={checkOutAgreementOpen} onClose={handleAgreeToCheckOutClose}>
        <DialogTitle>Are you sure you want to check out?</DialogTitle>
        <DialogContentText className={classes.checkOutDialogText}>
          Current price of products cart:
          <strong> ${sumPriceOfProductsInCart}</strong>
        </DialogContentText>
        <DialogActions>
          <Button onClick={() => handleAgreeToCheckOutClose()} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => handleCheckOutSummary()}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={checkOutSummaryOpen} onClose={handleCheckOutSummaryClose}>
        <DialogTitle className={classes.checkOutDialogTitle}>
          Thank you for your purchase!
        </DialogTitle>
        <DialogContentText className={classes.checkOutDialogText}>
          If you would like to continue shopping, return to our product menu.
        </DialogContentText>
        <DialogActions>
          <Button onClick={() => handleReturn()} color="primary" autoFocus>
            Product Menu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CartPage;
