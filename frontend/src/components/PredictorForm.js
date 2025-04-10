import React, { useState } from 'react';
import { 
  Paper, 
  TextField, 
  Button, 
  Box, 
  Typography, 
  CircularProgress,
  InputAdornment
} from '@mui/material';
import axios from 'axios';

// API endpoint URL
const API_URL = 'http://localhost:5000/api/predict';

const PredictorForm = ({ onPrediction, onError, onLoading }) => {
  const [companyName, setCompanyName] = useState('');
  const [issuePrice, setIssuePrice] = useState(100);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!companyName.trim()) {
      onError('Please enter a valid company name.');
      return;
    }
    
    setIsSubmitting(true);
    onLoading(true);
    
    try {
      console.log('Sending request to API with data:', {
        company_name: companyName,
        issue_price: issuePrice
      });
      
      const response = await axios.post(API_URL, {
        company_name: companyName,
        issue_price: issuePrice
      });
      
      console.log('API response:', response.data);
      onPrediction(response.data);
    } catch (error) {
      console.error('Error details:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        onError(`Server error: ${error.response.data.error || error.response.statusText}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        onError('No response from server. Please check if the backend is running.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        onError(`Request error: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
      onLoading(false);
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4, 
        mb: 4, 
        borderRadius: 2,
        background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)'
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Enter IPO Details
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Company Name"
          variant="outlined"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="e.g. Zepto"
          margin="normal"
          required
          sx={{ mb: 3 }}
        />
        
        <TextField
          fullWidth
          label="Issue Price"
          type="number"
          variant="outlined"
          value={issuePrice}
          onChange={(e) => setIssuePrice(parseFloat(e.target.value) || 0)}
          margin="normal"
          required
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
          sx={{ mb: 3 }}
        />
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={isSubmitting}
          sx={{ 
            py: 1.5,
            borderRadius: 2,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Predict Listing Price'
          )}
        </Button>
      </Box>
    </Paper>
  );
};

export default PredictorForm; 