import { useState, memo, useCallback } from "react";
import { ProductType, ProductVariantType } from "@/types";
import { 
  TextField, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Grid, 
  InputAdornment,
  Switch,
  Typography,
  FormGroup,
  Snackbar,
  Alert
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Button, CircularProgress } from "@mui/material";
import { useUpdateProductMutation } from "@/services/update-product";
import { useUpdateProductBaseMutation } from "@/services/update-product-base";

function EditableMenuItem({ product: initialProduct }: { product: ProductType & { variants: ProductVariantType[] } }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [product, setProduct] = useState<ProductType & { variants: ProductVariantType[] }>(
    JSON.parse(JSON.stringify(initialProduct))
  );
  const [alertState, setAlertState] = useState<{open: boolean; message: string; severity: 'success' | 'error'}>({
    open: false,
    message: '',
    severity: 'success'
  });

  // APIs
  const [updateProductBase] = useUpdateProductBaseMutation();
  const [updateProduct] = useUpdateProductMutation();

  const handleProductChange = useCallback((field: string, value: string | boolean) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleVariantChange = useCallback((field: string, value: string | boolean | number) => {
    if (!product.variants?.length) return;
    
    setProduct((prev) => {
      const updatedVariants = [...prev.variants];
      updatedVariants[0] = { ...updatedVariants[0], [field]: value };
      return { ...prev, variants: updatedVariants };
    });
  }, [product.variants]);

  const handleUpdateProduct = useCallback(async () => {
    if (!product.variants?.length) return;
    
    const variant = product.variants[0]; // Get first variant

    setIsUpdating(true);
    try {
      // First update the product base (name, description, is_featured)
      await updateProductBase({
        id: product.id, // Using the product ID, not the variant ID
        data: {
          name: variant.variant_name, // Use the same name as variant_name for consistency
          description: product.description,
          is_featured: product.is_featured,
          // Do not include category_id unless you want to change it
        },
      }).unwrap();

      // Then update the product variant details
      await updateProduct({
        id: variant.id, // Using the variant ID
        data: {
          variant_name: variant.variant_name,
          is_veg: variant.is_veg,
          contains_egg: variant.contains_egg,
          price: Number(variant.price),
          discounted_price: variant.discounted_price ? Number(variant.discounted_price) : null,
          image_url: variant.image_url,
          preparation_time_minutes: variant.preparation_time_minutes ?? null,
          allergens: variant.allergens ?? null,
          dietary_info: variant.dietary_info ?? null,
          calories: variant.calories ?? null,
          spiciness: variant.spiciness ?? null,
          ingredients: variant.ingredients ?? null,
        },
      }).unwrap();
      
      setAlertState({
        open: true,
        message: "Product updated successfully",
        severity: 'success'
      });
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Failed to update product:", error);
      setAlertState({
        open: true,
        message: "Failed to update product",
        severity: 'error'
      });
    } finally {
      setIsUpdating(false);
    }
  }, [product, updateProductBase, updateProduct]);

  const handleCloseAlert = () => {
    setAlertState(prev => ({ ...prev, open: false }));
  };

  return (
    <div className="pt-2">
      <Grid container spacing={3}>
        {/* Featured Toggle */}
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={product.is_featured || false}
                  onChange={(e) => handleProductChange("is_featured", e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography variant="body1" sx={{ fontWeight: product.is_featured ? 'bold' : 'normal' }}>
                  {product.is_featured ? 'Featured Item ⭐' : 'Not Featured'}
                </Typography>
              }
            />
          </FormGroup>
        </Grid>

        {/* Product Type */}
        <Grid item xs={12}>
          <RadioGroup 
            row 
            aria-label="product-type" 
            name="product-type" 
            value={product.variants?.[0]?.is_veg ? "veg" : "non-veg"}
          >
            <FormControlLabel
              value="veg"
              control={
                <Radio 
                  checked={product.variants?.[0]?.is_veg === true} 
                  onChange={() => handleVariantChange("is_veg", true)} 
                />
              }
              label="Veg"
            />
            <FormControlLabel
              value="non-veg"
              control={
                <Radio 
                  checked={product.variants?.[0]?.is_veg === false} 
                  onChange={() => handleVariantChange("is_veg", false)} 
                />
              }
              label="Non-Veg"
            />
          </RadioGroup>
        </Grid>

        {/* Product Name */}
        <Grid item xs={12} md={8}>
          <TextField 
            label="Product Name" 
            fullWidth 
            variant="outlined" 
            value={product.variants?.[0]?.variant_name || ""} 
            onChange={(e) => {
              handleVariantChange("variant_name", e.target.value);
              // Also update the product name to match variant name for consistency
              handleProductChange("name", e.target.value);
            }} 
          />
        </Grid>

        {/* Price */}
        <Grid item xs={12} md={4}>
          <TextField
            label="Price (₹)"
            fullWidth
            type="number"
            variant="outlined"
            value={product.variants?.[0]?.price || ""}
            onChange={(e) => handleVariantChange("price", parseFloat(e.target.value))}
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <TextField 
            label="Description" 
            fullWidth 
            multiline 
            rows={3} 
            variant="outlined" 
            value={product.description || ""} 
            onChange={(e) => handleProductChange("description", e.target.value)} 
          />
        </Grid>

        {/* Image URL */}
        <Grid item xs={12}>
          <TextField 
            label="Image URL" 
            fullWidth 
            variant="outlined" 
            value={product.variants?.[0]?.image_url || ""} 
            onChange={(e) => handleVariantChange("image_url", e.target.value)} 
          />
        </Grid>

        {/* Individual save button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={isUpdating ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            onClick={handleUpdateProduct}
            disabled={isUpdating}
            sx={{
              minWidth: 200,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-1px)",
                boxShadow: 3,
              },
            }}
          >
            {isUpdating ? "Saving..." : "Update Product"}
          </Button>
        </Grid>
      </Grid>

      {/* Alert for success/error messages */}
      <Snackbar 
        open={alertState.open} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={alertState.severity} 
          sx={{ width: '100%' }}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default memo(EditableMenuItem);