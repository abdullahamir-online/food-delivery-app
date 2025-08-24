document.addEventListener('DOMContentLoaded', () => {
    const ordersContainer = document.getElementById('orders-container');

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
            const response = await fetch('http://localhost:5000/orders/user/orders', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the token in the request header
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const orders = await response.json();

            // Generate the orders table
            generateOrdersTable(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            ordersContainer.innerHTML = `<p style="color: red;">Failed to fetch orders. Please try again later.</p>`;
        }
    };

    const generateOrdersTable = (orders) => {
        if (!orders.length) {
            ordersContainer.innerHTML = `<p>No orders found.</p>`;
            return;
        }

        const table = document.createElement('table');

        // Create table header
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Total Price</th>
                <th>Delivery Address</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
        `;
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');
        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.order_id}</td>
                <td>${new Date(order.order_date).toLocaleDateString()}</td>
                <td>${order.order_status}</td>
                <td>Rs ${parseFloat(order.order_total).toFixed(2)}</td>
                <td>${order.delivery_address}</td>
                <td>${order.product_name}</td>
                <td>${order.product_description}</td>
                <td>${order.product_quantity}</td>
                <td>Rs ${parseFloat(order.product_price).toFixed(2)}</td>
            `;
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        ordersContainer.innerHTML = '';
        ordersContainer.appendChild(table);
    };

    // Fetch and display orders
    fetchOrders();
});
