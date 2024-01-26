import * as mongoose from "mongoose";
import * as pc from "picocolors";

export const connectDB = async () => {
  try {
    if (Bun.env.DB !== undefined) {
      const conn = await mongoose.connect(Bun.env.DB, {
        autoIndex: true,
      });

      console.log(
        pc.cyan(
          `Success: MongoDB Connected: ${conn.connection.host}:${conn.connection.port} - [${conn.connection.name}]`
        )
      );
    }
  } catch (err: any) {
    console.error(pc.red(`Error: ${err.message}`));
    process.exit(1);
  }
};
