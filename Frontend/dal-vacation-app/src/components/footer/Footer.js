import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        py: 3,
        px: 2,
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2" component="p">
        &copy; DalVacationHome. All rights reserved.
      </Typography>
      <Typography variant="body2" component="p">
        <Link href="/terms">Terms of Service</Link> | <Link href="/privacy">Privacy Policy</Link>
      </Typography>
      <Typography variant="body2" component="p">
        Contact: contact@example.com
      </Typography>
    </Box>
  );
}



export default Footer;
