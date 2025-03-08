import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  Grid,
  Box,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

export default function ProductListing() {
  const items = useSelector((state: any) => state.allCart.items);
  const dispatch = useDispatch();

  return (
    <Box sx={{ py: 5, bgcolor: "background.default" }}>
      <Container>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          color="primary"
          gutterBottom
        >
          🛒 Explore Our Products
        </Typography>
        <Grid container spacing={4}>
          {items.map((item: any) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 2,
                    height: 250,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.img}
                    alt={item.title}
                    sx={{
                      objectFit: "contain",
                      maxHeight: "100%",
                      width: "100%",
                    }}
                    loading="lazy"
                  />
                </Box>
                <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="600">
                    {item.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    fontWeight="bold"
                  >
                    ₹{item.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 2,
                      borderRadius: "30px",
                      px: 4,
                      fontWeight: "bold",
                    }}
                    onClick={() => dispatch(addToCart(item))}
                  >
                    🛍️ Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
