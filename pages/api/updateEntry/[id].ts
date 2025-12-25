import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb"; // Ensure DB connection
import EntryModel from "../../../models/EntryModel"; // Your Mongoose model

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        await connectToDatabase();

        const { id } = req.query;
        const updateData = req.body;

        if (!id) {
            return res.status(400).json({ error: "Missing entry ID" });
        }

        // Ensure labour values are numbers
        if (updateData.labour !== undefined) {
            updateData.labour = Number(updateData.labour);
        }
        if (updateData.extraEntrys) {
            updateData.extraEntrys = updateData.extraEntrys.map((entry: any) => ({
                ...entry,
                labour: Number(entry.labour) || 0
            }));
        }

        // Recalculate totalLabour
        const mainLabour = updateData.labour || 0;
        const extraLabourTotal = updateData.extraEntrys?.reduce((sum: number, entry: any) => sum + entry.labour, 0) || 0;
        updateData.totalLabour = mainLabour + extraLabourTotal;

        const updatedEntry = await EntryModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedEntry) {
            return res.status(404).json({ error: "Entry not found" });
        }

        res.status(200).json({ message: "Entry updated successfully", data: updatedEntry });
    } catch (error) {
        console.error("Error updating entry:", error);
        res.status(500).json({ error: error.message });
    }
}
