# Amazon Clone

```
An Amazon Clone that replicates the core functionality and design of the popular e-commerce platform. Built with modern web technologies, this project provides users with an interactive shopping experience using React, showcasing a wide range of features, including user authentication, a product catalog, a shopping cart, and secure payment processing.
```

## Features

```
1 - Responsive Design: Optimized for both desktop and mobile devices for seamless shopping on any screen.
2 - User Authentication: Secure login and registration system using firebase.
3 - Products and Categories: Effortless product discovery and categorized items.
3 - Shopping Cart: Add and remove items from the cart with a dynamic item count display.
4 - Order Management: View and manage orders through a personalized account page.
5 - Payment Integration: Secure payment processing using Stripe.
6 - State Management: Leveraged useReducer for efficient global state management with a DataProvider.
7 - React Components: Modular and reusable components for scalable development.
8 - API Integration: Axios-powered API calls to fetch dynamic data.
```

## Tech Stack

```
1 - Frontend: React, React Router, React Icons.
2 - State Management: useReducer.
3 - Styling: CSS with modern design patterns.
4 - Backend: Node.js, Express.js, Firebase.
5 - Database: Firebase function.
6 - Payment Gateway: Stripe.
```

## File Structure

```
Amazon-Clone
├── functions                                          # source code for the backend
│   ├── .gitignore                                     # Files to ignore in Git
│   ├── index.js                                       # entry point for the backend
│   ├── package-lock.json                              # Auto-generated lock file for npm dependencies
│   ├── package.json                                   # Project metadata and dependencies
├── src/                                               # Source code for the app
│   ├── Components/                                    # Reusable components
│   │   ├── Carousel                                   # Carousel component for displaying random images
│   │   │   ├── Carousel.jsx                           # Carousel component
│   │   │   ├── Carousel.module.css                    # Carousel component styles
|   |   ├── Categories                                 # Categories component for displaying categories product
│   │   │   ├── Categories.jsx                         # Categories component
│   │   │   ├── Categories.module.css                  # Categories component styles
│   │   ├── CurrencyFormat                             # integrate formatted currency outputs
│   │   │   ├── CurrencyFormat.jsx                     # CurrencyFormat component
│   │   ├── DataProvider                               # consistent data sharing and state updates
│   │   │   ├── DataProvider.jsx                       # DataProvider component
│   │   ├── Footer                                     # Footer component 
│   │   │   ├── Footer.jsx                             # Footer component
│   │   │   ├── Footer.module.css                      # Footer component styles
│   │   ├── Header                                     # Header component for displaying Navbars
│   │   │   ├── Header.jsx                             # Header component
│   │   │   ├── Header.module.css                      # Header component styles
│   │   ├── Layout                                     # to wrap up pages with header and footer components
│   │   │   ├── Layout.jsx                             # Layout component
│   │   ├── Loader                                     # to let the data being loaded
│   │   │   ├── Loader.jsx                             # Loader component
│   │   ├── Products                                   # Products component for displaying products
│   │   │   ├── SingleProduct                          # for displaying single products
│   │   │   │   ├── SingleProduct.jsx                  # SingleProduct component
│   │   │   ├── Products.jsx                           # products component
│   │   │   ├── Products.module.css                    # products component styles 
│   │   ├── ProductedRoute                             # to protect pages from unauthenticated user
│   │   │   ├── ProtectedRoute.jsx                     # ProtectedRoute component
│   ├── assets/Images                                  # Images
│   ├── pages                                          # pages folder
│   │   │   ├── Home                                   # Home page
│   │   │   │   ├── Home.jsx                           # Home page componet
│   │   │   ├── Results                                # Results page
│   │   │   │   ├── Results.jsx                        # Results for catagories componet
│   │   │   │   ├── Results.module.css                 # Results for catagories componet styles
│   │   │   ├── auth                                   # auth page
│   │   │   │   ├── auth.module.css                    # auth page styles
│   │   │   │   ├── account.jsx                        # logout page
│   │   │   │   ├── auth.jsx                           # login and create account page
│   │   │   ├── cart                                   # cart page
│   │   │   │   ├── cart.module.css                    # cart page styles
│   │   │   │   ├── cart.jsx                           # cart page component
│   │   │   ├── orders                                 # orders page
│   │   │   │   ├── orders.module.css                  # orders page styles
│   │   │   │   ├── orders.jsx                         # orders page component
│   │   │   ├── payment                                # payment page
│   │   │   │   ├── payment.module.css                 # payment page styles
│   │   │   │   ├── payment.jsx                        # payment page component
│   │   │   ├── productDetail                          # productDetail page
│   │   │   │   ├── productDetail.module.css           # productDetail page styles
│   │   │   │   ├── productDetail.jsx                  # productDetail page component
│   ├── utils/                                         # Helper functions
│   │   ├── actionType.js                              # for defining actions 
│   │   ├── axios.js                                   # Axios instance for API calls
│   │   ├── categoryData.js                            # data to fetch category component
│   │   ├── firebase.js                                # initialize Firebase services
│   │   ├── reducer.js                                 # Handles state transitions based on dispatched actions
│   ├── App.css                                        # Global styles
│   ├── App.jsx                                        # React DOM rendering entry point
│   ├── Routes.jsx                                     # manages the routing configuration
│   └── main.jsx                                       # Main entry point for the React app
├── .firebaserc                                        # configure Firebase project
├── .gitignore                                         # Files to ignore in Git
├── README.md                                          # Project README file
├── eslint.config.js                                   # ESLint configuration file
├── firebase.json                                      # configure various Firebase services
├── index.html                                         # Main HTML file
├── package-lock.json                                  # Auto-generated lock file for npm dependencies
├── package.json                                       # Project metadata and dependencies
├── vite.config.js                                     # Vite configuration file
```

## Installation

```
1. Clone the repository:  
   `git clone https://github.com/henokyohanes/Amazon-Clone.git`
2. Navigate to the project directory:  
   `cd Amazon-Clone`
3. Install the dependencies:  
   `npm install`
```

## License

```
This project is a clone of Amazon Website for personal educational use only.
```