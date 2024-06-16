// models/slotModel.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ISlot extends Document {
  service: Schema.Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: 'available' | 'booked' | 'canceled';
}

const slotSchema: Schema = new Schema(
  {
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: {
      type: String,
      enum: ['available', 'booked', 'canceled'],
      default: 'available',
    },
  },
  { timestamps: true }
);

export const Slot = mongoose.model<ISlot>('Slot', slotSchema);
