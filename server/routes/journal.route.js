import express from "express";
import Journal from "../db/Journal.js";

const journalRouter = express.Router();

journalRouter.get("/api/journals/:userId", async (req, res) => {
  try {
    const {
      params: { userId },
    } = req;
    const journalsList = await Journal.find({ userId }).sort({ dateTime: -1 });
    return res.status(200).send(journalsList);
  } catch (error) {
    console.error("Error fetching journals by userId: ", error);
    return res.status(500).json({ message: "Failed to fetch journals" });
  }
});

/*journalRouter.get("/api/journals/:userIdId/:date", async (req, res) => {
  try{
      const {params: {userIdId, date}}
  }
  catch(error){

  }
})*/

journalRouter.post("/api/journals", async (req, res) => {
  const { body } = req;
  const newJournal = new Journal(body);
  try {
    const savedJournal = await newJournal.save();
    return res.status(201).send(savedJournal);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

journalRouter.patch("/api/journals/:userId/:journalId", async (req, res) => {
  const {
    body,
    params: { userId, journalId },
  } = req;
  const dateTime = new Date();

  try {
    const updatedJournal = await Journal.findOneAndUpdate(
      { _id: journalId, userId },
      { ...body, dateTime },
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

journalRouter.delete("/api/journals/:userId/:journalId", async (req, res) => {
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
