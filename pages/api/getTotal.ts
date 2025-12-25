import { NextApiRequest, NextApiResponse } from "next";
import EntryModel from "../../models/EntryModel";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        await connectToDatabase(); // Connect to the database

        const entries = await EntryModel.find(); // Fetch all entries

        let totalHours = 0;
        let totalLabour = 0;

        entries.forEach(entry => {
            // Convert `duration` to number (assuming it's stored as a string)
            totalHours += entry.duration ? parseFloat(entry.duration) : 0;
            totalLabour += entry.labour ? entry.labour : 0;

            // Sum up extra entries
            entry.extraEntrys.forEach(extra => {
                totalHours += extra.duration ? parseFloat(extra.duration) : 0;
                totalLabour += extra.labour ? extra.labour : 0;
            });
        });

        return res.status(200).json({ totalHours, totalLabour });
    } catch (error) {
        console.error("Error fetching totals:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
