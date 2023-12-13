import { ExpoRequest, ExpoResponse } from "expo-router/server";
import fs from "fs";

const database = "./todos.database.txt";

export function GET(_request: ExpoRequest) {
  console.log("CHANGE ME - THIS SHOULD FAST REFRESH");

  const data = JSON.parse(fs.readFileSync(database, "utf-8"));
  return ExpoResponse.json({ data: data.todos });
}

export async function POST(request: ExpoRequest) {
  const { data: newTodo } = await request.json();
  let data = JSON.parse(fs.readFileSync(database, "utf-8"));
  data.todos.push(newTodo);
  fs.writeFileSync(database, JSON.stringify(data));
  return ExpoResponse.json({ data: data.todos });
}
