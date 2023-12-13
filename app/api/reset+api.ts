import { ExpoRequest, ExpoResponse } from "expo-router/server";
import fs from "fs";

const database = "./todos.database.txt";

export async function POST() {
  fs.writeFileSync(
    database,
    JSON.stringify({
      todos: [
        { id: 1, title: "Create Expo App" },
        { id: 2, title: "Deploy to EAS" },
      ],
    })
  );
  return ExpoResponse.json({});
}
