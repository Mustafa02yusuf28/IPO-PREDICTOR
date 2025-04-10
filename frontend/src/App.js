import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  CssBaseline, 
  ThemeProvider, 
  createTheme 
} from '@mui/material';
import Header from './components/Header';
import PredictorForm from './components/PredictorForm';
import ResultsDisplay from './components/ResultsDisplay';
import NewsDisplay from './components/NewsDisplay';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const [predictionResults, setPredictionResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePrediction = (results) => {
    setPredictionResults(results);
    setError(null);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setPredictionResults(null);
  };

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
            IPO Listing Price Predictor
          </Typography>
          <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 4 }}>
            Estimate the listing price of an IPO based on sentiment and issue price
          </Typography>
          
          <PredictorForm 
            onPrediction={handlePrediction} 
            onError={handleError}
            onLoading={handleLoading}
          />
          
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <Typography>Analyzing sentiment and making prediction...</Typography>
            </Box>
          )}
          
          {error && (
            <Box sx={{ my: 4 }}>
              <Typography color="error" align="center">{error}</Typography>
            </Box>
          )}
          
          {predictionResults && (
            <>
              <ResultsDisplay results={predictionResults} />
              <NewsDisplay newsData={predictionResults.news_data} />
            </>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App; 