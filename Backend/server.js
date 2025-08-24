const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const orderRoutes = require('./routes/orderRoutes');


 



require('dotenv').config(); // Ensure you load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support form submissions

app.use('/api/users', userRoutes); // Load user routes
app.use('/api/auth', authRoutes); // New auth routes
 



 

 

// Middleware
app.use(express.json());

// Routes
app.use('/api/restaurants', restaurantRoutes);

 


app.use('/orders', orderRoutes);



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


 
