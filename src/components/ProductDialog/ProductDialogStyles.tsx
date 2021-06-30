import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  titleCenter: {
    textAlign: "center",
  },
  productImageContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  productImage: {
    width: "200px",
    height: "200px",
  },
  titleBold: {
    fontWeight: 600,
  },
  bottomPadding: {
    paddingBottom: "20px",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});


export { useStyles };