import { NextApiRequest, NextApiResponse } from "next";
import EntryModel from "../../../models/EntryModel"; // Fix import path
import { connectToDatabase } from "../../../lib/mongodb"; // Fix import path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await connectToDatabase();

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const entry = await EntryModel.findById(id);

    if (!entry) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json({ success: true, data: entry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}
