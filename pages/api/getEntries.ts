import { NextApiRequest, NextApiResponse } from "next";
import EntryModel from "../../models/EntryModel";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("GET LISTING API CALLED"); 
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        await connectToDatabase();

        const entries = await EntryModel.find();

        // 🔹 Calculate Total Labour in All Entries
        let totalLabour = 0;
        let totalExtraLabour = 0;

        entries.forEach(entry => {
            totalLabour += entry.labour || 0; // ✅ Add labour from main entry

            // ✅ Add labour from extra entries
            entry.extraEntrys.forEach(extra => {
                totalExtraLabour += extra.labour || 0;
            });
        });

        const grandTotalLabour = totalLabour + totalExtraLabour; // ✅ Final sum

        res.status(200).json({
            success: true,
            data: entries,
            totalLabour, // 🔹 Labour from main entries
            totalExtraLabour, // 🔹 Labour from extra entries
            grandTotalLabour // 🔹 Final Labour Count
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
