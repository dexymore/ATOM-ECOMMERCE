<h1>
ATOM ECOMMERCE
</h1>
<h2>pages<h2>
<ul>
<li>

home page


![alt text](image.png)
![alt text](screencapture-atom-ecommerce-frontend-vercel-app-2024-08-29-04_23_30.png)

</li>
<li>

auth page


![alt text](image-2.png)
![alt text](image-3.png)

</li>

<li>

items page



![alt text](screencapture-atom-ecommerce-frontend-vercel-app-items-2024-08-29-04_30_26.png)

</li>

<li>

item details page


![alt text](screencapture-atom-ecommerce-frontend-vercel-app-ItemsDetails-66c99dae7de59ac004828c67-2024-08-29-04_33_52.png)
</li>

<li>

cart page


![alt text](screencapture-atom-ecommerce-frontend-vercel-app-cart-2024-08-29-04_37_41.png)

![alt text](image-4.png)

![alt text](image-5.png)
</li>

<li>
user profile page 


![alt text](screencapture-atom-ecommerce-frontend-vercel-app-profile-2024-08-29-04_48_39.png)
![alt text](image-7.png)
</li>

<li>
about us page

![alt text](screencapture-atom-ecommerce-frontend-vercel-app-about-2024-08-29-04_51_22.png)
</li>

<li>
contact page

![alt text](image-8.png)
</li>
</ul>
<h1>
atom backend
</h1>

# API Endpoints

## Users
- **POST `/signup`**
  - Registers a new user.

- **POST `/login`**
  - Authenticates a user and returns a token.

- **GET `/getAllUsers`**
  - Retrieves a list of all users.

- **POST `/forgetpassword`**
  - Sends a password reset link to the user's email.

- **PATCH `/resetpassword`**
  - Resets the user's password using a token.

- **GET `/logout`**
  - Logs out the current user.

- **GET `/getCurrentUser`**
  - Retrieves the currently logged-in user's information.

- **GET `/verifyCurrentLoggedInUser`**
  - Verifies if the current user is logged in.

## Admin
- **GET `/getAllAdmins`**
  - Retrieves a list of all admins.

- **POST `/signUpAdmin`**
  - Registers a new admin.

- **POST `/loginAdmin`**
  - Authenticates an admin and returns a token.

- **GET `/logout`**
  - Logs out the current admin.

## Item
- **GET `/getAllItems`**
  - Retrieves a list of all items.

- **GET `/getOneItem`**
  - Retrieves a single item by its ID.

- **GET `/filterItems`**
  - Filters items based on specific criteria.

- **GET `/createItem`**
  - Creates a new item.

## Cart
- **GET `/getAllCart`**
  - Retrieves the contents of the user's cart.

- **PATCH `/sendItemToCart`**
  - Adds an item to the user's cart.

- **PATCH `/removeFromCart`**
  - Removes an item from the user's cart.

- **GET `/getOneUserCart`**
  - Retrieves the cart for a specific user.

- **PATCH `/removeOneItemInstances`**
  - Removes one instance of an item from the user's cart.

## Orders
- **GET `/checkout`**
  - Initiates the checkout process for the user's cart.

- **GET `/getUserOrders`**
  - Retrieves the order history of the user.
