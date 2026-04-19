import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import bcryptjs from "bcryptjs";

/**
 * TODO: Define User schema
 *
 * Fields:
 * - name: String, required, trim, minlength 2, maxlength 50
 * - email: String, required, unique, lowercase, trim
 *   Use regex validation: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 * - password: String, required, minlength 6
 *   IMPORTANT: Add { select: false } so password isn't returned by default
 * - role: String, enum ['user', 'admin'], default 'user'
 *
 * Options:
 * - Enable timestamps (createdAt, updatedAt)
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: [true, "Email must be unique"],
      required: [true, "Email is required"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: [6, "Password must be min 6 characters long"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

/**
 * TODO: Add pre-save hook to hash password
 *
 * Before saving a user:
 * 1. Check if password is modified (if not, skip hashing)
 * 2. Hash password using bcrypt.hash(password, 10)
 * 3. Replace plain text password with hashed version
 *
 * Example structure:
 * userSchema.pre('save', async function(next) {
 *   // Only hash if password is modified
 *
 *   // Hash password and replace
 *
 * });
 */

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.comparePassword = async function (plainPassword) {
  return await bcrypt.comare(plainPassword, this.password);
};

// TODO: Create and export the User model
export const User = mongoose.models.User || mongoose.model("User", userSchema);
