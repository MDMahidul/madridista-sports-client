# Madridista Sports - Frontend

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [State Management](#state-management)
- [Custom Hooks](#custom-hooks)
- [Util Functions](#util-functions)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [Live Link](#live-link)

## Introduction

This is the frontend of a full-stack e-commerce application named Madridista Sports with features like product listing, cart and wishlist management, and order placement. Authentication has been implemented here. 3 Types of user role are there: super admin,admin and user.

## Features

- Product CURD operation 
- Blog CURD operation 
- Get products search by category or name
- Wishlist management 
- Cart management with quantity updates and validations
- Order placement with stock availability checks
- Forget and reset password features
- User-friendly notifications using toast messages
- Responsive design

## Tech Stack

- **React**
- **React Redux**
- **Redux Toolkit**
- **React Router**
- **TypeScript**
- **Tailwind CSS**
- **React Flowbite**
- **Shadcn**
- **Sonner**
- **Swipper JS**
- **Framer Motion**
- **JWT Authentication**

## Installation

#### 1. Clone the repository:

   ```bash
   git clone https://github.com/MDMahidul/madridista-sports-client
   cd madridista-sports-client
   ```
#### 2. Install dependencies:
```bash 
npm install
```
### Usage
#### Running the Development Server:
```bash
npm start
```
#### Building for Production
```bash
npm run build
```

## State Management
### Redux Slices:
- **Wishlist Slice**
    - **addToWishlist**: Adds a product to the wishlist
    - **removeWishlistItem**: Removes an item from the Wishlist
    - **clearWishlist**: Clears the Wishlist  
- **Auth Slice**
    - **setUser**: Save logged in user data to state
    - **logOut**: Remove user info from state 
### Redux toolkit:
- **Auth management api**
    - **signin**: Sign in user to the site
    - **signup**: Register in user to the site
    - **forgetpassword**: To get reset password link
    - **resetpassword**: Reset password 
- **Product management api**
    - **getAllProducts**: Get all the products data from api
    - **getSingleProduct**: Get single product data
    - **addProduct**: Add product to api
    - **updateProduct**: update product's data
    - **deleteProduct**: Soft Delete product from api
- **Cart management api**
    - **getCart**: Get all the cart data from api
    - **addToCart**: Add product to cart
    - **updateCart**: Update product's quantity 
    - **removeCartItem**: Remove product from cart
    - **clearCartItem**: Clear all the cart items 
- **User management api**
    - **getUserProfie**: Get user profile data
    - **updateUserProfile**: Update user data
- **Order management api**
    - **addOrder**:Add Order to db from cart
    - **getUserOrder**: Get user orders data from db
- **Blog management api**
    - **getAllBlogs**: Get all the blogs data from api
    - **getSingleBlog**: Get single blog data
    - **addBlog**: Add blog to api
    - **updateBlog**: update blog's data
    - **deleteBlog**: Delete blog from db
## Custom Hooks  
#### useTimer
 - A custom hook that provides a countdown timer. Used a framer motion countdown fearures but not fully connected with the customer order information so far.
#### useCart
 - A custom hook this will get user cart data from db.
#### useUserProfile
 - A custom hook this will get user token and user data according to the user authentication.
        

## Util Functions
#### cartUtils
- To calculate cart's items price according to quantity
- Also calculate total price
- Then finally calculate total price with 15% vat
#### formatDate
- To format date get from the db time stapm
- Convert data to local date format
#### verifyToken
- To verify authentication jwt token and decode the token to get user data.

## Error Handling
 - Error handling is managed through toast notifications using sonner.
 - Added an error element page 



## Live Link
Click here: [Madridista Sports](https://madridista-sports-client.vercel.app)
            
        
        