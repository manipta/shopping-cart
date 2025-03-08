import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCartTotal,
  removeItem,
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../features/cartSlice";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  CardMedia,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { Remove, Add, Delete, ShoppingCart } from "@mui/icons-material";

const CartPage = () => {
  const { cart, totalQuantity, totalPrice } = useSelector(
    (state: any) => state.allCart
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart, dispatch]);

  return (
    <div style={{ backgroundColor: "#f5f5f5", padding: "40px 0" }}>
      <Container>
        <Grid container spacing={3}>
          {/* Cart Items Section */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" color="primary" fontWeight="bold" mb={2}>
              🛍️ Shopping Cart ({totalQuantity} items)
            </Typography>

            {cart.length === 0 ? (
              <Card sx={{ p: 3, textAlign: "center", boxShadow: 2 }}>
                <Typography variant="h6">Your cart is empty 🛒</Typography>
              </Card>
            ) : (
              cart.map((data: any) => (
                <Card
                  key={data.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    p: 2,
                    boxShadow: 2,
                  }}
                >
                  {/* Product Image */}
                  <CardMedia
                    component="img"
                    image={data.img}
                    alt={data.title}
                    sx={{ width: 100, height: 100, borderRadius: 2 }}
                  />

                  <CardContent sx={{ flexGrow: 1, ml: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {data.title}
                    </Typography>

                    {/* Quantity and Price */}
                    <Grid container spacing={2} alignItems="center" mt={1}>
                      <Grid item>
                        <IconButton
                          color="secondary"
                          onClick={() =>
                            dispatch(decreaseItemQuantity(data.id))
                          }
                          disabled={data.quantity <= 1}
                        >
                          <Remove />
                        </IconButton>
                        <Typography
                          component="span"
                          sx={{
                            display: "inline-block",
                            width: 40,
                            textAlign: "center",
                            fontSize: 18,
                            fontWeight: "bold",
                          }}
                        >
                          {data.quantity}
                        </Typography>
                        <IconButton
                          color="primary"
                          onClick={() =>
                            dispatch(increaseItemQuantity(data.id))
                          }
                        >
                          <Add />
                        </IconButton>
                      </Grid>

                      <Grid item>
                        <Typography variant="h6" fontWeight="bold">
                          ₹{data.price}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>

                  {/* Remove Button */}
                  <IconButton
                    color="error"
                    onClick={() => dispatch(removeItem(data.id))}
                  >
                    <Delete />
                  </IconButton>
                </Card>
              ))
            )}
          </Grid>

          {/* Sticky Order Summary */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, boxShadow: 3, position: "sticky", top: 100 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                🧾 Order Summary
              </Typography>

              <List>
                <ListItem
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography>Total Items</Typography>
                  <Typography fontWeight="bold">{totalQuantity}</Typography>
                </ListItem>
                <Divider />
                <ListItem
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Total Price
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    ₹{totalPrice}
                  </Typography>
                </ListItem>
              </List>

              <Button
                variant="contained"
                color="success"
                fullWidth
                startIcon={<ShoppingCart />}
                sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
              >
                Proceed to Checkout
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CartPage;
