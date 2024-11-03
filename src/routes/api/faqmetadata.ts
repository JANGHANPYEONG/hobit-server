import { Router, Request, Response } from "express";
import FAQMetadata from "../../models/FAQMetadata";
import HttpStatusCodes from "http-status-codes";
import { Types } from "mongoose";

const router = Router();

// @route   POST api/faqMetadata/search
// @desc    Update search count for a specific FAQ by date
// @access  Public
router.post("/search", async (req: Request, res: Response) => {
  const { faqId } = req.body;

  try {
    // Ensure faqId is a valid ObjectId
    if (!Types.ObjectId.isValid(faqId)) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid FAQ ID" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day

    // Find the metadata for today or create a new one if it doesn't exist
    let metadata = await FAQMetadata.findOne({ faqId, searchDate: today });

    if (metadata) {
      // If found, increment search count
      metadata.searchCount += 1;
    } else {
      // If not found, create a new document with searchCount 1
      metadata = new FAQMetadata({
        faqId,
        searchDate: today,
        searchCount: 1,
      });
    }

    await metadata.save();
    res.json(metadata);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// @route   POST api/faqMetadata/feedback
// @desc    Add feedback score for a specific FAQ
// @access  Public
router.post("/feedback", async (req: Request, res: Response) => {
  const { faqId, score } = req.body;

  try {
    // Validate score is between 1 and 5
    if (score < 1 || score > 5) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ msg: "Score must be between 1 and 5" });
    }

    // Ensure faqId is a valid ObjectId
    if (!Types.ObjectId.isValid(faqId)) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid FAQ ID" });
    }

    // Find today's metadata document or create a new one
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day

    let metadata = await FAQMetadata.findOne({ faqId, searchDate: today });

    if (metadata) {
      // Add score to feedbackScores array
      metadata.feedbackScores.push(score);
    } else {
      // If no document for today, create a new one with initial feedback
      metadata = new FAQMetadata({
        faqId,
        searchDate: today,
        searchCount: 0,
        feedbackScores: [score],
      });
    }

    await metadata.save();
    res.json(metadata);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

export default router;
