import { Pagination, Stack } from "@mui/material";

const ProductsPagePagination = () => {
  return (
      <Stack
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <Pagination
                  count={10}
                  variant="text"
                  size="large"
                  sx={{
                 
                    "& .MuiPaginationItem-root": {
                      fontSize: "16px",
                      fontFamily: "Neometric",
                      fontWeight: "600",
                      lineHeight:"50px"
                    
                    },
                  }}
                />
              </Stack>
  )
}

export default ProductsPagePagination
