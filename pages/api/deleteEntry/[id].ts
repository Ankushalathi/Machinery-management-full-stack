// 📜 File: pages/api/deleteEntry/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import {connectToDatabase} from "../../../lib/mongodb";
import EntryModel from "../../../models/EntryModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("DELETE API CALLED"); 
    if (req.method !== "DELETE") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        await connectToDatabase();

        const { id } = req.query; // ✅ Query Params se ID le rahe hain
        if (!id) {
            return res.status(400).json({ error: "Missing entry ID" });
        }

        const deletedEntry = await EntryModel.findByIdAndDelete(id);
        if (!deletedEntry) {
            return res.status(404).json({ error: "Entry not found" });
        }

        res.status(200).json({ status: true, message: "Entry deleted successfully" });
    } catch (error) {
        console.error("Error deleting entry:", error);
        res.status(500).json({ error: error.message });
    }
}
