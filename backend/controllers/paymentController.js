const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Set up PostgreSQL client
const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

client.connect();

module.exports = {
  createPaymentIntent: async (req, res) => {
    const { amount, userId } = req.body;

    try {
      // Create a PaymentIntent with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });

      // Save the transaction in PostgreSQL
      const transactionQuery = `
        INSERT INTO transactions (user_id, transaction_id, amount, currency, status)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
      `;
      const values = [
        userId,
        paymentIntent.id,
        amount,
        'usd',
        'pending',
      ];

      const result = await client.query(transactionQuery, values);

      res.send({
        clientSecret: paymentIntent.client_secret,
        transaction: result.rows[0],
      });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

  webhook: async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      // Verify the webhook signature
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;

        // Update the transaction status to 'succeeded' in the database
        const transactionQuery = `
          UPDATE transactions
          SET status = $1, updated_at = CURRENT_TIMESTAMP
          WHERE transaction_id = $2 RETURNING *;
        `;
        const values = ['succeeded', paymentIntent.id];

        await client.query(transactionQuery, values);

        res.status(200).send({ received: true });
      } else {
        res.status(400).send(`Event type not handled: ${event.type}`);
      }
    } catch (err) {
      console.error(`Webhook error: ${err.message}`);
      res.status(400).send(`Webhook error: ${err.message}`);
    }
  },
};
