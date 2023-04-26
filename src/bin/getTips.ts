import { updateAndStoreTips } from "../data/tips";

async function run() {
  const result = await updateAndStoreTips();
}

run().catch((error) =>
  console.error("Error occurred while running the function:", error)
);
