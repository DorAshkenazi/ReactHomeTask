import React, { useState, useEffect } from "react";
import "./ProductPage.css";
import { useStyles } from "./ProductPageStyles";

// React Material-UI
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  MenuItem,
  Select,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import FilterListIcon from "@material-ui/icons/FilterList";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

// Components
import { ProductDialog } from "../ProductDialog/ProductDialog";

// Models
import Product from "../../models/Product";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/cartItemsSlice";

// Router
import { useHistory, useParams } from "react-router-dom";

// Services
import {
  getProductList,
  getCategoryList,
  getCategoryProducts,
} from "../../services/fakeStoreApiService";

export const ProductPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { product_id } = useParams<{ product_id: string }>();
  const itemsInCart = useSelector((state: any) => state.cartItems);

  useEffect(() => {
    getProductList()
      .then((res) => {
        setRows(res);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });

    getCategoryList()
      .then((res) => {
        res = res.map((category: string) => {
          return category.charAt(0).toUpperCase() + category.slice(1);
        });
        setAvailableCategories(res);
      })
      .catch((error) => {
        console.log(error);
      });

    if (product_id) {
      setOpenDialogProductId(+product_id);
      setOpenDialog(true);
    }
  }, [product_id]);

  const handleMoveToCartPage = () => {
    history.push("/cart");
  };

  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

  // Table States & Functions
  const [rows, setRows] = useState<Array<Product>>([]);
  const [rowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  const [orderBy, setOrderBy] = useState("Title");
  type Order = "asc" | "desc";
  const [order, setOrder] = useState<Order>("asc");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const addToCart = (product: Product) => {
    dispatch(addProductToCart(product));
    setOpenSnackBar(true);
  };

  const sortProducts = (orderByProperty: string) => {
    const orderByPropertyLowerCase = orderByProperty.toLowerCase();
    const sortRows = (a: Product, b: Product) => {
      const aProp = a[orderByPropertyLowerCase as keyof Product];
      const bProp = b[orderByPropertyLowerCase as keyof Product];
      if (aProp < bProp) {
        return order === "asc" ? 1 : -1;
      }

      if (aProp > bProp) {
        return order === "asc" ? -1 : 1;
      }

      return 0;
    };

    rows.sort(sortRows);
    order === "asc" ? setOrder("desc") : setOrder("asc");
    setOrderBy(orderByProperty);
    setRows([...rows]);
  };

  // Dialog States & Functions
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDialogProductId, setOpenDialogProductId] = useState<number>(0);

  const handleOpenDialog = (product: Product) => {
    setOpenDialogProductId(product.id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Category States & Functions
  const [availableCategories, setAvailableCategories] = useState<Array<string>>(
    [""]
  );
  const [currentCategory, setCurrentCategory] =
    useState<string>("All Categories");

  const handleSelectCategory = (category: string) => {
    setCurrentCategory(category);
    setIsLoaded(false);
    getCategoryProducts(category)
      .then((res: Array<Product>) => {
        setRows(res);
        setPage(0);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {openDialog && (
        <ProductDialog
          open={openDialog}
          onClose={handleCloseDialog}
          productId={openDialogProductId}
        ></ProductDialog>
      )}
      <IconButton
        style={{ float: "right", margin: "10px" }}
        onClick={() => handleMoveToCartPage()}
      >
        <Badge badgeContent={itemsInCart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Toolbar style={{ justifyContent: "center" }}>
        <Typography variant="h6">Products: {currentCategory}</Typography>
        <Select value="" IconComponent={FilterListIcon} disableUnderline>
          <MenuItem onClick={() => handleSelectCategory("All Categories")}>
            All Categories
          </MenuItem>
          {availableCategories.map((category, index) => (
            <MenuItem
              key={index}
              onClick={() => handleSelectCategory(category)}
            >
              {category}
            </MenuItem>
          ))}
        </Select>
      </Toolbar>
      {isLoaded && (
        <>
          <TableContainer style={{}} component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Title
                    <TableSortLabel
                      active={true}
                      direction={orderBy === "Title" ? order : "asc"}
                      onClick={() => sortProducts("Title")}
                    ></TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    Price
                    <TableSortLabel
                      active={true}
                      direction={orderBy === "Price" ? order : "asc"}
                      onClick={() => sortProducts("Price")}
                    ></TableSortLabel>
                  </TableCell>
                  <TableCell align="center">Product Image</TableCell>
                  <TableCell align="center">Add To Cart</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product: Product) => (
                    <TableRow
                      onClick={() => handleOpenDialog(product)}
                      key={product.id}
                      hover={true}
                    >
                      <TableCell className={classes.titleTableCell}>
                        {product.title}
                      </TableCell>
                      <TableCell align="center">${product.price}</TableCell>
                      <TableCell
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <img
                          className={classes.productImage}
                          src={product.image}
                          alt="sourceImage"
                        />
                      </TableCell>
                      <TableCell
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        align="center"
                      >
                        <IconButton onClick={() => addToCart(product)}>
                          <AddShoppingCartIcon />
                        </IconButton>
                        <Snackbar
                          open={openSnackBar}
                          autoHideDuration={1500}
                          onClose={() => setOpenSnackBar(false)}
                        >
                          <Alert variant="filled" severity="success">
                            Product added to cart
                          </Alert>
                        </Snackbar>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
          />
        </>
      )}
      {isLoaded || (
        <CircularProgress
          style={{
            position: "absolute",
            top: "43%",
            left: "46%",
          }}
        />
      )}
    </>
  );
};

export default ProductPage;
