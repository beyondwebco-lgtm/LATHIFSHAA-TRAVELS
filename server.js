const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from the public directory with caching headers
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d'
}));

// Main landing page route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Company meta information API endpoint
app.get('/api/info', (req, res) => {
  res.json({
    companyName: 'LATHIFSHAA TRAVELS',
    proprietor: 'SHAIK BASHA',
    established: 2016,
    experience: '10+ Years',
    taglines: {
      main: 'Your Journey, Our Responsibility!',
      secondary: 'Travel Beyond Boundaries, Experience Comfort Everywhere.'
    },
    phones: {
      primary: '+91 9052564746',
      secondary: '+91 9491400726'
    },
    email: 'basha3394@yahoo.com',
    legal: {
      gst: '37EQTPS9220K1ZV',
      pan: 'EQTPS9220K'
    },
    address: {
      building: 'Ground Floor, Building No: 71-31-737/1',
      street: 'Main Road, Near Maridimamba Temple',
      colony: 'Kranthinagar, Malkapuram',
      city: 'Visakhapatnam',
      state: 'Andhra Pradesh',
      pincode: '530005',
      country: 'India'
    },
    availability: '24 Hours | 7 Days | 365 Days',
    coverage: 'All Over India'
  });
});

// Fallback route for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start the server only if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`=============================================================`);
    console.log(`🚗 LATHIFSHAA TRAVELS - Premium Travel Website`);
    console.log(`🌐 Server running at: http://localhost:${PORT}`);
    console.log(`📍 Malkapuram, Visakhapatnam, Andhra Pradesh – 530005`);
    console.log(`📞 Contacts: +91 9052564746 | +91 9491400726 (Shaik Basha)`);
    console.log(`✉️ Email: basha3394@yahoo.com | GST: 37EQTPS9220K1ZV`);
    console.log(`=============================================================`);
  });
}

module.exports = app;
