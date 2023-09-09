import { Router, Request, Response } from "express";
import { sample_foods, sample_tags } from "../data";
import asyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const foodsCount = await FoodModel.countDocuments();
    if (foodsCount > 0) {
      res.send("Seed is already done!");
      return;
    }

    await FoodModel.create(sample_foods);
    res.send("Seed Is Done!");
  })
);

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const foods = await FoodModel.find();
    res.json(foods);
  })
);

router.get(
  "/search/:searchTerm",
  asyncHandler(async (req: Request, res: Response) => {
    const searchTerm = req.params.searchTerm;
    const foodRegx = new RegExp(searchTerm, "i");
    const foods = await FoodModel.find({ name: { $regex: foodRegx } });
    res.json(foods);
  })
);

router.get(
  "/tags",
  asyncHandler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: "All",
      count: await FoodModel.countDocuments(),
    };

    tags.unshift(all);
    res.send(tags);
  })
);

router.get(
  "/tag/:tagName",
  asyncHandler(async (req: Request, res: Response) => {
    const tagName = req.params.tagName;
    const foods = await FoodModel.find({ tags: tagName });
    res.json(foods);
  })
);

router.get(
  "/:foodId",
  asyncHandler(async (req: Request, res: Response) => {
    const foodId = req.params.foodId;
    const foods = await FoodModel.findById(foodId);
    res.json(foods);
  })
);

export default router;
