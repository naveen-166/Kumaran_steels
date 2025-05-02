const express = require('express');
const router = express.Router();
const Inquiry = require('../Model/Inquiry');

router.post('/', async (req, res) => {
  const { name, email, category, phone, description } = req.body;

  try {
    const newInquiry = new Inquiry({ name, email, category, phone, description });
    await newInquiry.save();
    res.status(201).json({ message: 'Message received successfully!' });
  } catch (err) {
    console.error('Error saving contact message:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

//get ll req
router.get('/fetchRequests',async (req,res)=>{
  const request=await Inquiry.find();
  res.json(request);
})
// PUT /contact/updateStatus/:id
router.put('/updateStatus/:id', async (req, res) => {
  try {
    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { $set: { status: req.body.status } },
      { new: true }
    );
    res.json(updatedInquiry);
  } catch (error) {
    console.error('Failed to update status:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});


module.exports = router;


