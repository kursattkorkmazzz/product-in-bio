import { DATABASE_INSTANCE } from "./db";
import { associateAccount } from "./models/account";
import { associateSession } from "./models/session";

(async () => {
  try {
    await DATABASE_INSTANCE.authenticate();
    console.log("Database connection established successfully.");
    associateModels();
    console.log("Models associated successfully.");
    if (process.env.NODE_ENV === "development") {
      await DATABASE_INSTANCE.sync({ alter: true });
      console.log("Database synchronized successfully.");
    }
  } catch (e) {
    console.error("Database connection failed. \n\n", e);
    process.exit(1);
  }
})();

export function associateModels() {
  associateAccount();
  associateSession();
}
