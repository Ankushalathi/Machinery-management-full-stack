import mongoose, { Schema, Document } from "mongoose";

interface IExtraEntry {
    date: string;
    description?: string;
    duration: string;
    startTime: string;
    endTime: string;
    labour: number;
}

export interface IEntry extends Document {
    date: string;
    description?: string;
    duration?: string;
    startTime: string;
    endTime?: string;
    extraEntrys: IExtraEntry[];
    farmerName: string;
    grandTotal?: string;
    phoneNumber: number;
    labour: number;
    totalLabour: number;
}

const ExtraEntrySchema = new Schema<IExtraEntry>({
    date: { type: String, required: true },
    description: { type: String },
    duration: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    labour: { type: Number },

});

const EntrySchema = new Schema<IEntry>({
    date: { type: String, required: true },
    description: { type: String },
    duration: { type: String },
    startTime: { type: String, required: true },
    endTime: { type: String },
    extraEntrys: [ExtraEntrySchema],
    farmerName: { type: String, required: true },
    grandTotal: { type: String },
    phoneNumber: { type: Number, required: true },
    labour: { type: Number },
    totalLabour: { type: Number }, // ✅ New field
});


// Fix Model Registration
export default mongoose.models.Entry || mongoose.model<IEntry>("Entry", EntrySchema);
