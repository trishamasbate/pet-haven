// Importing necessary modules
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
require('dotenv').config();

// Importing custom middleware and configurations
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// Initialize Stripe with the secret key
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with the secret key

// Defining the server port, defaulting to 3001 if not specified in environment variables
const PORT = process.env.PORT || 3001;
const app = express(); // Creating an Express application

// Create an instance of ApolloServer
const server = new ApolloServer({
  typeDefs, // GraphQL schema definitions
  resolvers, // GraphQL resolver functions
  context: authMiddleware, // Adding user authentication context to the server
  introspection: true, // Enables schema introspection in production for GraphQL Playground
  playground: true, // Enables the GraphQL Playground UI in production
});

// Middleware to parse incoming requests with URL-encoded payloads and JSON payloads
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static assets from the React frontend in production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Endpoint to create a checkout session
app.post('/create-checkout-session', async (req, res) => {
  try {
    // Assuming you send the cart items from the client
    const cartItems = req.body.cartItems;
    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // amount in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// For any other routes, serve the React app's index.html file (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Function to start the Apollo Server and Express server
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start(); // Start the Apollo Server
  server.applyMiddleware({ app }); // Apply Apollo middleware to the Express app

  // Start the Express server once the MongoDB connection is open
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`); // Log the server port
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`); // Log the GraphQL endpoint path
    });
  });
};

// Call the function to start the Apollo Server and Express app
startApolloServer(typeDefs, resolvers);
