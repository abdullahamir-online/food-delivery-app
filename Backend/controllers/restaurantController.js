const pool = require('../db/connection');



const getRestaurantsData = async (req, res) => {
   
  try {

    const category = req.headers['category']; // Get category from headers
    console.log(`Category received: ${category || 'None (fetching all restaurants)'}`);


      if(!category){
        console.log('category not found!');
      }  
      

      const [rows] = await pool.query(
          'SELECT * from Restaurants where DietFollowed = ? ',
           [category]
      );   

      if (rows.length === 0) {
          return res.status(404).json({ message: 'Restaurents Not Found!' });
      }

      res.json(rows);
  } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = getRestaurantsData;