import { NextApiRequest, NextApiResponse } from "next";
import EntryModel from "../../models/EntryModel"; // Fix import path
import { connectToDatabase } from "../../lib/mongodb"; // Fix import path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        await connectToDatabase();

        const { date, description, duration, endTime, extraEntrys, farmerName, grandTotal, phoneNumber, startTime, labour } = req.body;

        if (!date || !farmerName || !phoneNumber || !startTime || labour === undefined) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // ✅ Fix: Ensure all values are numbers before addition
        const mainLabour = Number(labour) || 0;
        const extraLabourTotal = extraEntrys?.reduce((sum, entry) => sum + (Number(entry.labour) || 0), 0) || 0;

        const totalLabour = mainLabour + extraLabourTotal;

        console.log("Main Labour:", mainLabour);
        console.log("Extra Labour Total:", extraLabourTotal);
        console.log("Calculated Total Labour:", totalLabour);

        const newEntry = new EntryModel({
            date,
            description,
            duration,
            endTime,
            extraEntrys: extraEntrys || [],
            farmerName,
            grandTotal,
            phoneNumber,
            startTime,
            labour: mainLabour,
            totalLabour, // ✅ Store corrected total labour
        });

        await newEntry.save();
        res.status(201).json({ message: "Entry added successfully", data: newEntry });

    } catch (error) {
        console.error("Error saving entry:", error);
        res.status(500).json({ error: error.message });
    }
}


