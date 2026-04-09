const Feedback = require('../models/Feedback');

const submitFeedback = async (req, res) => {
  const { name, email, rating, comments } = req.body;

  try {
    const feedback = new Feedback({
      name,
      email,
      rating,
      comments
    });

    const createdFeedback = await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', data: createdFeedback });
  } catch (error) {
    console.error("FEEDBACK SUBMIT ERROR:", error);
    res.status(500).json({ message: 'Server error while submitting feedback', error: error.message });
  }
};

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching feedbacks' });
  }
};

const getMyFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ email: req.user.email }).sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching your feedbacks' });
  }
};

const replyToFeedback = async (req, res) => {
  const { reply } = req.body;
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    feedback.reply = reply;
    const updatedFeedback = await feedback.save();
    res.json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error replying to feedback' });
  }
};

module.exports = { submitFeedback, getFeedbacks, replyToFeedback, getMyFeedbacks };
