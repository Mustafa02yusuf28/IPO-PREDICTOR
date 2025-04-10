import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  Chip
} from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';

const NewsDisplay = ({ newsData }) => {
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Positive':
        return '#4caf50';
      case 'Negative':
        return '#f44336';
      default:
        return '#9e9e9e';
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
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <NewspaperIcon sx={{ mr: 1, color: '#1976d2' }} />
        <Typography variant="h5" component="h2">
          News Analysis
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        The following news headlines were analyzed to determine market sentiment:
      </Typography>
      
      <List>
        {newsData.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem 
              alignItems="flex-start"
              sx={{ 
                py: 2,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                }
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" component="span" sx={{ flexGrow: 1 }}>
                      {item.headline}
                    </Typography>
                    <Chip 
                      label={item.sentiment} 
                      size="small"
                      sx={{ 
                        backgroundColor: getSentimentColor(item.sentiment),
                        color: 'white',
                        fontWeight: 'bold',
                        ml: 1
                      }} 
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      {item.published || 'Date not available'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Sentiment Score: {item.score.toFixed(2)}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            {index < newsData.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default NewsDisplay; 