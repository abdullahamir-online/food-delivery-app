// JavaScript for Order Page

function getAuthToken() {
    return localStorage.getItem("token");
}

document.addEventListener('DOMContentLoaded', () => {
    const orderButtons = document.querySelectorAll('.order-btn');
    const popup = document.getElementById('order-popup');
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const quantityInput = document.getElementById('quantity');
    const confirmOrderBtn = document.getElementById('confirm-order');
    const cancelOrderBtn = document.getElementById('cancel-order');

    let currentProductId = null;

    orderButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const menuItem = event.target.closest('.menu-item');
            const productId = menuItem.getAttribute('data-id');
            const productPriceValue = menuItem.getAttribute('data-price');
            const productNameValue = menuItem.querySelector('h3').textContent;

            currentProductId = productId;
            productName.textContent = `Product: ${productNameValue}`;
            productPrice.textContent = `Price: Rs ${productPriceValue}`;
            quantityInput.value = 1;

            popup.classList.remove('hidden');
        });
    });

    confirmOrderBtn.addEventListener('click', () => {
        const quantity = quantityInput.value;
        if (quantity <= 0) {
            alert('Quantity must be at least 1');
            return;
        }

        const orderDetails = {
            productId: currentProductId,
            quantity: quantity,
        };




        console.log('Order Details:', orderDetails);
      
        let placeOrder = async (orderDetails)=>{


            if(!(await fetchAndDisplayProfileData())){
                alert("Kindly Complete Your Profile First!"); 
                return;
            }
            
            

            let apiUrl = 'http://localhost:5000/orders/' ;
            try {
                const token = getAuthToken();
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(orderDetails)
                });
        
                if (response.ok) {
                    popup.classList.add('hidden');
                    if(response.status == 201){
                        alert('Order confirmed!');
                    }else{
                        alert('Something went wrong! to place order');
                    }
                } else {
                    alert("Order Couldn't be placed!");
                    popup.classList.add('hidden');

                }
            } catch (error) {
                console.error("Request Failed!", error);
            }
        }
        
        // Call server endpoint here
        placeOrder(orderDetails);
      
        
    });

    cancelOrderBtn.addEventListener('click', () => {
        popup.classList.add('hidden');
    });
});



