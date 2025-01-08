const router = require('express').Router();
const Paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);

router.post('/pay', async (req, res) => {
  const { amount, email } = req.body; // Get payment details from the request body
  
  const paymentData = {
    amount: amount * 100, // Amount is in kobo (1 Naira = 100 Kobo)
    email: email,
  };

  try {
    const paymentResponse = await Paystack.transaction.initialize(paymentData);
    res.json(paymentResponse); // Respond with the Paystack payment initialization response
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Payment initialization failed.' });
  }
});

module.exports = router;
