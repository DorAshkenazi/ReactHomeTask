import { useState, useEffect } from "react";
import { useStyles } from "./ProductDialogStyles";
import clsx from "clsx";

// Models
import Product from "../../models/Product";

// React Material-UI
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CloseIcon from "@material-ui/icons/Close";

// Redux
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../redux/cartItemsSlice";

// Services
import { getProductById } from "../../services/fakeStoreApiService";

// Router
import { useHistory } from "react-router-dom";

interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  productId: number;
}

export const ProductDialog: React.FC<ProductDialogProps> = (
  props: ProductDialogProps
) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    getProductById(props.productId)
      .then((res: Product) => {
        if (isMounted) {
          if (res) {
            setProduct(res);
            setIsLoaded(true);
          } else {
            alert("Product does not exist");
            props.onClose();
            history.push("/");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      isMounted = false;
    };
  }, [history, props, props.productId]);

  const [product, setProduct] = useState<Product | null>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const addToCart = (product: Product) => {
    dispatch(addProductToCart(product));
  };

  const handleClose = () => {
    setProduct(null);
    setIsLoaded(false);
    props.onClose();
  };

  if (isLoaded) {
    return (
      <Dialog open={props.open} onClose={handleClose}>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle className={classes.titleCenter}>
          {product?.title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography
            variant="body1"
            className={clsx(classes.titleBold, classes.titleCenter)}
          >
            ${product?.price}
            <IconButton
              onClick={() => {
                if (product) {
                  addToCart(product);
                }
              }}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </Typography>
          <div className={classes.productImageContainer}>
            <img
              className={classes.productImage}
              src={product?.image}
              alt="sourceImage"
            />
          </div>
          <Typography variant="body1" className={classes.titleBold}>
            Category:
          </Typography>
          <Typography variant="body2" className={classes.bottomPadding}>
            {product?.category}
          </Typography>
          <Typography variant="body1" className={classes.titleBold}>
            Description:
          </Typography>
          <Typography variant="body2" className={classes.bottomPadding}>
            {product?.description}
          </Typography>
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Dialog open={props.open} onClose={handleClose}>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }
};
