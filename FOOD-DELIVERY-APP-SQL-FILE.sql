create database foodDeliveryApp;
use foodDeliveryApp;


CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each user
    first_name VARCHAR(50) NOT NULL,        -- First name of the user
    last_name VARCHAR(50) NOT NULL,         -- Last name of the user
    email VARCHAR(100) NOT NULL UNIQUE,     -- Email address (unique to avoid duplicate accounts)
    phone VARCHAR(15) NOT NULL,             -- Phone number
    location varchar(50),
    dob DATE NOT NULL,                      -- Date of birth
    password VARCHAR(255) NOT NULL,         -- Password (hashed for security)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of account creation
);

 
 
 
  -- Step 1: Create the database and the Restaurants table
CREATE TABLE Restaurants (
    RestaurantID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    ContactNumber VARCHAR(15) NOT NULL,
    Email VARCHAR(100),
    DietFollowed ENUM('Loss', 'Gain', 'Moderate') NOT NULL,
    RegistrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Restaurants (Name, Address, ContactNumber, Email, DietFollowed) VALUES
('Barbeque', '123 BBQ Lane, Karachi', '03011234567', 'contact@barbeque.pk', 'Moderate'),
('Mehfil', '456 Mehfil Road, Lahore', '03029876543', 'info@mehfil.pk', 'Moderate'),
('Domino\'s', '789 Domino Plaza, Islamabad', '03037894521', 'support@dominos.pk', 'Gain'),
('Paradise', '101 Paradise Street, Karachi', '03046578912', 'hello@paradise.pk', 'Moderate'),
('Ram ki Bandi', '11 Ram Street, Hyderabad', '03123456789', 'support@ramkibandi.pk', 'Loss'),
('Vantillu', '78 Vantillu Drive, Islamabad', '03121234567', 'contact@vantillu.pk', 'Moderate'),
('Platform 65', '65 Railway Road, Lahore', '03219876543', 'info@platform65.pk', 'Moderate'),
('Hotel Adaab', '90 Adaab Road, Karachi', '03335678921', 'contact@hoteladaab.pk', 'Moderate'),
('Fish Land', '22 Fish Street, Gwadar', '03451234567', 'info@fishland.pk', 'Loss'),
('Hitech', '99 Tech Road, Lahore', '03349876543', 'support@hitech.pk', 'Moderate'),
('Hot N Spicy', '77 Spicy Avenue, Karachi', '03217894521', 'contact@hotnspicy.pk', 'Gain'),
('Mughal Restaurants', '15 Mughal Lane, Multan', '03421234567', 'info@mughal.pk', 'Gain'),
('KS Bakers', '44 Bakery Road, Peshawar', '03147896543', 'support@ksbakers.pk', 'Gain'),
('Light Bites', '87 Healthy Lane, Karachi', '03427896521', 'info@lightbites.pk', 'Loss');


 
 select * from Restaurants  ;
 truncate Restaurants;
 
 
 
 select count(*) as WeightLossDietFollowers from Restaurants 
 where DietFollowed = 'Loss'; 
 
 
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each product
    name VARCHAR(100) NOT NULL,                -- Name of the product
    description TEXT NOT NULL,                 -- Description of the product
    category VARCHAR(50) NOT NULL,             -- Category (e.g., Biryani, Pizza, Desserts)
    price DECIMAL(10, 2) NOT NULL,             -- Price of the product
    availability BOOLEAN DEFAULT TRUE,         -- Whether the product is available
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp of product creation
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp of last update
);


INSERT INTO products (name, description, category, price) VALUES
-- Biryani
('Chicken Biryani', 'Fragrant basmati rice cooked with tender chicken and spices.', 'Biryani', 349.00),
('Vegetable Biryani', 'Aromatic rice layered with fresh vegetables and saffron.', 'Biryani', 299.00),
('Beef Biryani', 'Succulent lamb pieces cooked with fragrant rice and spices.', 'Biryani', 399.00),
('Fish Biryani', 'Fresh fish cooked in aromatic rice with a blend of spices.', 'Biryani', 449.00),

-- Pizza
('Pepperoni Pizza', 'Loaded with pepperoni, cheese, and a tangy tomato sauce.', 'Pizza', 299.00),
('Veggie Pizza', 'A healthy mix of fresh vegetables and melted cheese.', 'Pizza', 249.00),
('Margherita Pizza', 'Classic pizza with fresh basil, mozzarella, and tomato sauce.', 'Pizza', 299.00),
('BBQ Chicken Pizza', 'BBQ chicken with tangy sauce, cheese, and vegetables.', 'Pizza', 349.00),

-- Rotis & Breads
('Butter Naan', 'Soft and fluffy naan brushed with melted butter.', 'Rotis & Breads', 49.00),
('Garlic Naan', 'Warm naan topped with roasted garlic and fresh herbs.', 'Rotis & Breads', 59.00),
('Cheese Naan', 'Cheese-filled naan, soft and melt-in-your-mouth.', 'Rotis & Breads', 79.00),
('Stuffed Paratha', 'Layered flatbread stuffed with spiced vegetables.', 'Rotis & Breads', 99.00),

-- Desserts
('Gulab Jamun', 'Delicious milk dumplings soaked in sugar syrup.', 'Desserts', 99.00),
('Ice Cream Sundae', 'Rich and creamy sundae topped with chocolate syrup.', 'Desserts', 149.00),
('Rasgulla', 'Soft, spongy, and sweet, soaked in syrup.', 'Desserts', 79.00),
('Chocolate Lava Cake', 'Warm chocolate cake with a gooey molten center.', 'Desserts', 199.00),

-- Burgers
('Cheese Burger', 'Juicy beef patty topped with melted cheese and fresh veggies.', 'Burgers', 199.00),
('Chicken Burger', 'Grilled chicken patty with crispy lettuce and mayo.', 'Burgers', 249.00),
('Veggie Burger', 'A delightful veggie patty with fresh toppings and sauces.', 'Burgers', 179.00),
('Double Patty Burger', 'Two layers of beef patty with cheese and special sauce.', 'Burgers', 299.00),

-- Cakes
('Chocolate Cake', 'Rich and moist chocolate cake with a creamy frosting.', 'Cakes', 399.00),
('Vanilla Cake', 'Classic vanilla cake with buttercream frosting.', 'Cakes', 349.00),
('Red Velvet Cake', 'Soft red velvet layers with cream cheese frosting.', 'Cakes', 449.00),
('Fruit Cake', 'Fresh fruit chunks baked into a soft sponge cake.', 'Cakes', 299.00),

-- Beverages
('Mango Smoothie', 'Refreshing mango smoothie made with fresh fruit and yogurt.', 'Beverages', 129.00),
('Cold Coffee', 'Chilled coffee with cream and chocolate syrup.', 'Beverages', 99.00),
('Lemon Iced Tea', 'Cool and refreshing iced tea with a hint of lemon.', 'Beverages', 79.00),
('Hot Chocolate', 'Rich and creamy hot chocolate topped with whipped cream.', 'Beverages', 149.00),

-- Desi Foods
('Chicken Karahi', 'Succulent chicken cooked in a wok with spices and tomatoes.', 'Desi Foods', 499.00),
('Mutton Karahi', 'Tender mutton pieces simmered in a flavorful curry.', 'Desi Foods', 699.00),
('Butter Chicken', 'Grilled chicken in a creamy, buttery tomato sauce.', 'Desi Foods', 549.00),
('Palak Paneer', 'Spinach and cottage cheese cooked in flavorful spices.', 'Desi Foods', 349.00),
('Dal Makhani', 'Rich and creamy black lentils cooked with butter and cream.', 'Desi Foods', 299.00),
('Chole Bhature', 'Spicy chickpeas served with deep-fried bread.', 'Desi Foods', 249.00),
('Seekh Kebabs', 'Minced meat skewers seasoned with traditional spices.', 'Desi Foods', 349.00),
('Haleem', 'Slow-cooked stew of lentils, meat, and wheat, flavored with spices.', 'Desi Foods', 599.00),
('Nihari', 'Slow-cooked stew with tender meat and aromatic spices.', 'Desi Foods', 699.00),
('Keema Paratha', 'Flatbread stuffed with spiced minced meat.', 'Desi Foods', 249.00),
('Paneer Tikka', 'Grilled cubes of marinated cottage cheese with spices.', 'Desi Foods', 399.00),
('Chicken Handi', 'Chicken cooked in a rich, creamy gravy served in a clay pot.', 'Desi Foods', 549.00);
 
select * from products;
 
 
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique identifier for each order
    user_id INT NOT NULL,                             -- Foreign key referencing the user placing the order
    product_id INT NOT NULL,                          -- Foreign key referencing the ordered product
    quantity INT NOT NULL DEFAULT 1,                  -- Quantity of the product ordered
    total_price DECIMAL(10, 2) NOT NULL,              -- Total price for the order (calculated as price * quantity)
    order_status ENUM('Pending', 'Processing', 'Completed', 'Cancelled') DEFAULT 'Pending', -- Current status of the order
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Timestamp when the order was placed
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Timestamp for last update
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE, -- Link to users table
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE -- Link to products table
);
 
 select * from orders;
 truncate orders;
 
 alter table orders
 add delivery_address varchar (100);
 
 select * from orders where order_id = 10;
 delete from orders where order_id = 10;
drop table users;






SELECT 
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
    o.user_id = 1 -- Replace 1 with the desired user_id
ORDER BY 
    o.order_date DESC;

