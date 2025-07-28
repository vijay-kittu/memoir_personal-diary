import express from "express";
import Journal from "../db/Journal.js";

const journalRouter = express.Router();

journalRouter.get("/:userId", async (req, res) => {
  try {
    const {
      params: { userId },
    } = req;
    const journalsList = await Journal.find({ user: userId }).sort({
      dateTime: -1,
    });
    return res.status(200).send(journalsList);
  } catch (error) {
    console.error("Error fetching journals by userId: ", error);
    return res.status(500).json({ message: "Failed to fetch journals" });
  }
});

journalRouter.get("/:userId/:date", async (req, res) => {
  try {
    const { userId, date } = req.params;

    const journalsByDate = await Journal.find({ userId, date });
    return res.status(200).json({
      journalsByDate,
    });
  } catch (error) {
    console.log("Error in fetching journals: ", error);
    return res.status(400).json({ message: "Error in fetching journals" });
  }
});

journalRouter.post("/:userId", async (req, res) => {
  try {
    const { title, journal, dateTime } = req.body;
    const { userId } = req.params;
    const newJournal = await Journal.create({
      user: userId,
      title: title,
      journal: journal,
      dateTime: dateTime,
    });
    if (newJournal) {
      console.log("Journal saved: ", newJournal);
      return res.status(201).json(newJournal);
    }
    /*const savedJournal = await newJournal.save();
    return res.status(201).send(savedJournal);*/
  } catch (error) {
    console.log("Error saving the journal: ", error);
    return res.status(400).json({ error: error.message });
  }
});

journalRouter.patch("/:userId/:journalId", async (req, res) => {
  const {
    body,
    params: { userId, journalId },
  } = req;

  try {
    const updatedJournal = await Journal.findOneAndUpdate(
      { _id: journalId, userId },
      { ...body },
      { new: true }
    );
    if (!updatedJournal) {
      return res
        .status(404)
        .json({ message: "Journal not found or unauthorized" });
    }
    return res.status(200).json(updatedJournal);
  } catch (error) {
    console.error("Error updating journal:", error);
    return res.status(500).json({ message: "Failed to update journal" });
  }
});

journalRouter.delete("/:userId/:journalId", async (req, res) => {
  const {
    params: { userId, journalId },
  } = req;
  try {
    const journalToBeDeleted = await Journal.findOneAndDelete({
      _id: journalId,
      user: userId,
    });
    if (!journalToBeDeleted) {
      return res
        .status(404)
        .json({ message: "Journal not found or unauthorized" });
    }
    return res.status(200).json({ message: "Journal deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Failed to delete journal" });
  }
});

export default journalRouter;
