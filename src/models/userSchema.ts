import { Document, Schema, model } from 'mongoose';
import validator from 'validator';

export type genre =  "acción" | "aventura" | "drama" | "suspense" | "deportivo" | "humor" | "biografía";

export interface UserDocumentInterface extends Document {
  name: string;
  username: string;
  email: string;
  favoriteGenre: genre[]
}

const UserSchema = new Schema<UserDocumentInterface>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!validator.default.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  favoriteGenre: [{
    type: String,
    enum: ["acción", "aventura", "drama", "suspense", "deportivo", "humor", "biografía"]
  }],
});

export const User = model<UserDocumentInterface>('User', UserSchema);