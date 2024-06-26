import mongoose, { Document, Schema } from "mongoose";
import connectDB from "../db";

export interface ITranslation extends Document {
  timestamp: Date;
  fromText: string;
  from: string;
  toText: string;
  to: string;
}
interface IUser extends Document {
  userId: string;
  translations: Array<ITranslation>;
}

const translationSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  fromText: String,
  from: String,
  toText: String,
  to: String,
});

const userSchema = new Schema<IUser>({
  userId: String,
  translations: [translationSchema],
});

// Check if the model already exists
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export async function addOrUpdateUser(
  userId: string,
  translation: {
    fromText: string;
    from: string;
    toText: string;
    to: string;
  }
): Promise<IUser> {
  const filter = { userId: userId };
  const update = {
    $set: { userId: userId },
    $push: { translations: translation },
  };

  await connectDB();

  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  try {
    const user: IUser | null = await User.findOneAndUpdate(
      filter,
      update,
      options
    );
    console.log("User added or updated:", user);
    if (!user) {
      throw new Error("User not found and was not created.");
    }

    return user;
  } catch (err) {
    console.error("Error adding or updating user:", err);
    throw err;
  }
}

export async function getTranslations(
  userId: string
): Promise<Array<ITranslation>> {
  await connectDB();

  try {
    const user: IUser | null = await User.findOne({ userId: userId });
    if (user) {
      // Sort translations by timestamp in descending order
      user.translations.sort(
        (a: ITranslation, b: ITranslation) =>
          b.timestamp.getTime() - a.timestamp.getTime()
      );

      return user.translations;
    } else {
      console.log(`User with userId ${userId} not found.`);
      return [];
    }
  } catch (err) {
    console.error("Error retrieving translations:", err);
    throw err;
  }
}

export async function removeTranslation(
  userId: string,
  translationId: string
): Promise<IUser> {
  await connectDB();

  try {
    const user: IUser | null = await User.findOneAndUpdate(
      { userId: userId },
      { $pull: { translations: { _id: translationId } } },
      { new: true }
    );
    if (!user) {
      throw new Error("User not found.");
    }
    console.log("Translation deleted.", user);
    return user;
  } catch (err) {
    console.error("Error removing translation from user: ", err);
    throw err;
  }
}

export default User;
