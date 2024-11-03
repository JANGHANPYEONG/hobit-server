import express, { Request, Response } from "express";
import FAQ from "../../models/FAQ";
import { Types } from "mongoose";

const router = express.Router();

// FAQ 생성
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      mainCategory,
      subCategory,
      question,
      answer,
      createdBy,
      lastModifiedBy,
    } = req.body;

    // createdBy와 lastModifiedBy를 User의 ObjectId로 설정하여 FAQ 문서 생성
    const faq = new FAQ({
      mainCategory,
      subCategory,
      question,
      answer,
      createdBy: new Types.ObjectId(createdBy),
      lastModifiedBy: new Types.ObjectId(lastModifiedBy),
    });

    await faq.save();
    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// FAQ 조회
router.get("/", async (req: Request, res: Response) => {
  try {
    // createdBy와 lastModifiedBy 필드에 해당하는 User 정보를 함께 가져오기 위해 populate 사용
    const faqs = await FAQ.find()
      .populate("createdBy", "email avatar") // createdBy 필드의 User 정보 중 email과 avatar만 가져옴
      .populate("lastModifiedBy", "email avatar"); // lastModifiedBy 필드의 User 정보 중 email과 avatar만 가져옴

    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
