import React, { useRef, useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Box,
  Paper,
  IconButton
} from '@mui/material';
import { Upload,X } from 'lucide-react';

const PostProperty = () => {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    description: '',
    type: 'sale',
    bedrooms: '',
    bathrooms: '',
    area: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.title) tempErrors.title = 'Title is required';
    if (!formData.price) tempErrors.price = 'Price is required';
    if (!formData.location) tempErrors.location = 'Location is required';
    if (!formData.description) tempErrors.description = 'Description is required';
    if (!formData.bedrooms) tempErrors.bedrooms = 'Number of bedrooms is required';
    if (!formData.bathrooms) tempErrors.bathrooms = 'Number of bathrooms is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  
  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files) {
      // Convert files to an array and append them to the existing images state
      const newImages = Array.from(files);
      setImages((prevImages) => [...prevImages, ...newImages]); // Append new images
    }
  };
  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Remove image by index
  };
  const handleGridClick = () => {
    fileInputRef.current.click(); // Trigger file input click when grid is clicked
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log({ ...formData, images });
    }
  };

  return (
    <Box p={3}>
      <h1 className='text-2xl font-bold mb-6 max-lg:text-center'>
        Post New Property
      </h1>
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Title"
                fullWidth
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Price"
                type="number"
                fullWidth
                value={formData.price}
                onChange={(e) => {
                  const newValue = Math.max(0, e.target.value);
                  setFormData({ ...formData, price:newValue})}}
                error={!!errors.price}
                helperText={errors.price}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Location"
                fullWidth
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                error={!!errors.location}
                helperText={errors.location}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Type"
                select
                fullWidth
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <MenuItem value="sale">For Sale</MenuItem>
                <MenuItem value="rent">For Rent</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Bedrooms"
                type="number"
                fullWidth
                value={formData.bedrooms}
                onChange={(e) => {
                  const newValue = Math.max(0, e.target.value);
                  setFormData({ ...formData, bedrooms: newValue })}}
                error={!!errors.bedrooms}
                helperText={errors.bedrooms}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Bathrooms"
                type="number"
                fullWidth
                value={formData.bathrooms}
                onChange={(e) => {
                  const newValue = Math.max(0, e.target.value);
                  setFormData({ ...formData, bathrooms: newValue })}}
                error={!!errors.bathrooms}
                helperText={errors.bathrooms}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                rows={4}
                fullWidth
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle1">Images</Typography>
                <Box
                  sx={{
                    border: '2px dashed grey',
                    borderRadius: '4px',
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer', // Make it clear that the grid is clickable
                  }}
                  onClick={handleGridClick} // Add onClick to Box
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                    Click to select files or drag and drop
                  </Typography>
                  <Typography variant="caption" display="block" color="textSecondary" sx={{ mt: 1 }}>
                    PNG, JPG, GIF up to 10MB each
                  </Typography>
                </Box>
                {images.length > 0 && (
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                    {images.length} file(s) selected
                  </Typography>
                )}
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}>
                  {images.map((image, index) => (
                    <Box key={index} sx={{ position: 'relative', margin: 1 }}>
                      <img
                        src={URL.createObjectURL(image)} // Preview image
                        alt="preview"
                        style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <IconButton
                        sx={{ 
                          position: 'absolute', 
                          top: -8, right: -8, 
                          backgroundColor: 'white' ,
                          ":hover": {
                          backgroundColor: 'black',
                          color: 'white',
                        },}}
                        onClick={() => handleImageDelete(index)} // Delete image
                      >
                        <X/>
                      </IconButton>
                    </Box>
                  ))}
                </Box>
                <input
                  ref={fileInputRef} // Reference to the file input
                  type="file"
                  multiple
                  hidden
                  onChange={handleImageChange}
                />
              </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Post Property
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default PostProperty;
