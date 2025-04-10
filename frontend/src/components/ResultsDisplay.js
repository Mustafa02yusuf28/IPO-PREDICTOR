import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Grid, 
  Divider,
  Chip
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';

const ResultsDisplay = ({ results }) => {
  const { predicted_price, gain_percentage, sentiment_score } = results;
  
  const getSentimentIcon = (score) => {
    if (score >= 0.05) return <SentimentSatisfiedAltIcon sx={{ color: '#4caf50' }} />;
    if (score <= -0.05) return <SentimentDissatisfiedIcon sx={{ color: '#f44336' }} />;
    return <SentimentNeutralIcon sx={{ color: '#9e9e9e' }} />;
  };
  
  const getSentimentLabel = (score) => {
    if (score >= 0.05) return 'Positive';
    if (score <= -0.05) return 'Negative';
    return 'Neutral';
  };
  
  const getSentimentColor = (score) => {
    if (score >= 0.05) return '#4caf50';
    if (score <= -0.05) return '#f44336';
    return '#9e9e9e';
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
        Prediction Results
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Predicted Listing Price
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              ₹{predicted_price.toLocaleString()}
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Expected Gain
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {gain_percentage >= 0 ? (
                <TrendingUpIcon sx={{ color: '#4caf50', mr: 1 }} />
              ) : (
                <TrendingDownIcon sx={{ color: '#f44336', mr: 1 }} />
              )}
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: gain_percentage >= 0 ? '#4caf50' : '#f44336' 
                }}
              >
                {gain_percentage >= 0 ? '+' : ''}{gain_percentage.toFixed(2)}%
              </Typography>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Market Sentiment
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {getSentimentIcon(sentiment_score)}
              <Chip 
                label={getSentimentLabel(sentiment_score)} 
                sx={{ 
                  ml: 1, 
                  backgroundColor: getSentimentColor(sentiment_score),
                  color: 'white',
                  fontWeight: 'bold'
                }} 
              />
            </Box>
            <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
              Score: {sentiment_score.toFixed(2)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ResultsDisplay; 