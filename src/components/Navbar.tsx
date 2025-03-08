import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal } from "../features/cartSlice";

export default function NavigationBar() {
  const { cart, totalQuantity } = useSelector((state: any) => state.allCart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart, dispatch]);

  return (
    <>
      {/* Fixed AppBar Navbar */}
      <AppBar position="fixed" color="default" elevation={3}>
        <Container>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Logo / Brand */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "primary.main",
                fontWeight: "bold",
              }}
            >
              🛍️ ShopEase
            </Typography>

            {/* Centered Navigation Links */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "text.primary",
                fontWeight: "medium",
              }}
            >
              All Products
            </Typography>

            {/* Cart Button */}
            <Button
              component={Link}
              to="/cart"
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "20px",
                px: 3,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              🛒 Cart ({totalQuantity})
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Prevent content from being hidden under fixed navbar */}
      <div style={{ paddingTop: "80px" }}></div>
    </>
  );
}
