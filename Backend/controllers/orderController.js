const db = require('../db/connection'); // Assuming you're using a database connection file

 

// Create a new order
let createOrder = async (req, res) => {
  try {
    
    const { email } = req.user;
    
    
        const [user] = await db.query(
            'SELECT user_id , location from users WHERE email = ?',
             [email]
        );   
        
        
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        let userId = user[0].user_id;
        if(!userId){
            console.log("User_ID not found ");
        } 
        
        let userLocation = user[0].location;
    
    const { productId  , quantity   } = req.body;

    if (!productId|| !quantity  ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    
    const [product] = await db.query(
        'SELECT price from products where product_id = ? ',
         [productId]
    );   
    
    let productPrice = product[0].price;
    
    const query = `
      INSERT INTO orders ( user_id, product_id ,  quantity  , total_price, delivery_address, order_status , order_date)
      VALUES (  ?, ?, ?, ?, ?, 'Pending', NOW())
    `;

    let total_price = productPrice*quantity;

    await db.query(query, [ userId, productId , quantity , total_price, userLocation]);

     

    res.status(201).json({ message: 'Order created successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all orders for a specific user
let getUserOrders = async (req, res) => {
    
    
    const { email } = req.user;
    
    
        const [user] = await db.query(
            'SELECT user_id , location from users WHERE email = ?',
             [email]
        );   
        
        
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        let userId = user[0].user_id;
        if(!userId){
            console.log("User_ID not found ");
        } 


  try {
     

    const query = `SELECT 
    o.order_id,
    o.user_id,
    u.first_name AS user_first_name,
    u.last_name AS user_last_name,
    u.email AS user_email,
    o.order_date AS order_date,
    o.order_status AS order_status,
    o.total_price AS order_total,
    o.delivery_address,
    p.product_id,
    p.name AS product_name,
    p.description AS product_description,
    p.price AS product_price,
    o.quantity AS product_quantity
FROM 
    orders o
JOIN 
    users u ON o.user_id = u.user_id
JOIN 
    products p ON o.product_id = p.product_id
WHERE 
    o.user_id = ?  
ORDER BY 
    o.order_date DESC;
`;
    const [rows] = await db.query(query, [userId]);

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Update the status of an order
let updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const query = `UPDATE orders SET status = ? WHERE order_id = ?`;
    const [result] = await db.promise().query(query, [status, orderId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Cancel an order
let cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const query = `DELETE FROM orders WHERE order_id = ?`;
    const [result] = await db.promise().query(query, [orderId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {createOrder , getUserOrders , updateOrderStatus , cancelOrder}