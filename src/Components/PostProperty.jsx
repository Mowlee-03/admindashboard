import React, { useRef, useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Box,
  Paper,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { Upload, X } from 'lucide-react';
import firebaseApp from '../Firebase/Firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import axios from 'axios';
import { POST_PROPERTY } from './auth/api';

const PostProperty = () => {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    description: '',
    type: 'sale',
    bedrooms: '',
    bathrooms: '',
    area: '', 
    category: '',
    district: '',
  });
  const [errors, setErrors] = useState({});
  const storage = getStorage(firebaseApp);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

  const validate = () => {
    let tempErrors = {};
    if (!formData.title) tempErrors.title = 'Title is required';
    if (!formData.price) tempErrors.price = 'Price is required';
    if (!formData.location) tempErrors.location = 'Location is required';
    if (!formData.description) tempErrors.description = 'Description is required';
    if (formData.bedrooms === '' || formData.bedrooms < 0) tempErrors.bedrooms = 'Number of bedrooms is required';
    if (formData.bathrooms === '' || formData.bathrooms < 0) tempErrors.bathrooms = 'Number of bathrooms is required';
    if (!formData.category) tempErrors.category = 'Category is required';
    if (!formData.district) tempErrors.district = 'District is required';
    if (!formData.area) tempErrors.area = 'Area is required'; 
    if (images.length === 0) tempErrors.images = 'At least one image is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleImageChange = async (event) => {
    const files = event.target.files;
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    
    if (files) {
      setIsUploading(true);
      let validFiles = [];
      let errors = [];
  
      Array.from(files).forEach((file) => {
        if (!validTypes.includes(file.type)) {
          errors.push(`${file.name} is not a valid file type.`);
        } else if (file.size > maxFileSize) {
          errors.push(`${file.name} exceeds the 10MB size limit.`);
        } else {
          validFiles.push(file);
        }
      });
  
      if (errors.length > 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          images: errors.join(' '),
        }));
        setIsUploading(false);
        
        // Display error via Snackbar
        setSnackbarMessage(errors.join(' '));
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        return;
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          images: '',
        }));
      }
  
      const totalFiles = validFiles.length;
      let completedUploads = 0;
  
      const uploadPromises = validFiles.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        completedUploads++;
        setUploadProgress((completedUploads / totalFiles) * 100);
        return getDownloadURL(storageRef);
      });
  
      try {
        const uploadedImageUrls = await Promise.all(uploadPromises);
        setImages((prevImages) => [...prevImages, ...uploadedImageUrls]);
      } catch (error) {
        // Display error via Snackbar
        setSnackbarMessage('Error uploading images. Please try again.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    }
  };

  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleGridClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validate()) {
      try {
        const post = await axios.post(POST_PROPERTY, {
          ...formData,
          images,
        });
  
        // Display success Snackbar
        setSnackbarMessage('Property posted successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
  
        // Reset the form data
        setFormData({
          title: '',
          price: '',
          location: '',
          description: '',
          type: 'sale',
          bedrooms: '',
          bathrooms: '',
          area: '',
          category: '',
          district: '',
        });
        setImages([]); // Clear images
  
      } catch (error) {
        // Display error Snackbar
        setSnackbarMessage('Error posting property. Please try again.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
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
              value={formData.price === 0 ? '' : formData.price}
              onChange={(e) => {
                const newValue = e.target.value === '' ? 0 : Math.max(0, parseFloat(e.target.value) || 0);
                setFormData({ ...formData, price: newValue });
              }}
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
                label="Category"
                fullWidth
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                error={!!errors.category}
                helperText={errors.category}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="District"
                fullWidth
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                error={!!errors.district}
                helperText={errors.district}
              />
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField
              label="Area (sq feet)"
              fullWidth
              value={formData.area}
              onChange={(e) => {
                // Only allow numbers and empty input
                const value = e.target.value;
                if (/^\d*$/.test(value)) {  // Allow only digits
                  setFormData({ ...formData, area: value }); // Store as string
                }
              }}
              error={!!errors.area}
              helperText={errors.area}
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
              value={formData.bedrooms !== '' ? formData.bedrooms : 0}  // Default to 0 if empty
              onChange={(e) => {
                const newValue = e.target.value === '' ? 0 : Math.max(0, e.target.value);
                setFormData({ ...formData, bedrooms: newValue });
              }}
              error={!!errors.bedrooms}
              helperText={errors.bedrooms}
            />
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField
              label="Bathrooms"
              type="number"
              fullWidth
              value={formData.bathrooms !== '' ? formData.bathrooms : 0}  // Default to 0 if empty
              onChange={(e) => {
                const newValue = e.target.value === '' ? 0 : Math.max(0, e.target.value);
                setFormData({ ...formData, bathrooms: newValue });
              }}
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
                    cursor: 'pointer',
                  }}
                  onClick={handleGridClick}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                    Click to select files or drag and drop
                  </Typography>
                  <Typography variant="caption" display="block" color="textSecondary" sx={{ mt: 1 }}>
                    PNG, JPG, GIF up to 10MB each
                  </Typography>
                </Box>

                {/* Display image error */}
                {errors.images && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {errors.images}
                  </Typography>
                )}

                {/* Loading Animation */}
                {isUploading && (
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    gap: 2,
                    mt: 2 
                  }}>
                    <CircularProgress size={24} variant="determinate" value={uploadProgress} />
                    <Typography variant="body2" color="textSecondary">
                      Uploading... {Math.round(uploadProgress)}%
                    </Typography>
                  </Box>
                )}

                {images.length > 0 && (
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                    {images.length} file(s) selected
                  </Typography>
                )}
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}>
                  {images.map((image, index) => (
                    <Box key={index} sx={{ position: 'relative', margin: 1 }}>
                      <img
                        src={image}
                        alt="preview"
                        style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <IconButton
                        sx={{ 
                          position: 'absolute', 
                          top: -8, 
                          right: -8, 
                          backgroundColor: 'white',
                          ":hover": {
                            backgroundColor: 'black',
                            color: 'white',
                          },
                        }}
                        onClick={() => handleImageDelete(index)}
                      >
                        <X />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
                <input
                  ref={fileInputRef}
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

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PostProperty;
