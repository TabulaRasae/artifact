import { CharacterClient, delay } from "./CharacterClient.js";

const Yellow = new CharacterClient("YellowBobo");

async function yellowRoutine() {
  while (true) {
    try {
      await delay(5_000);
      await Yellow.moveTo(4, 1, 36);
      await Yellow.bankDepositAll();

      await Yellow.moveTo(5, 2, 10);
      await Yellow.gather(90, 35);

      await Yellow.moveTo(1, 1, 20);
      await Yellow.craft("cooked_shrimp", 90, 5.5);

      console.log("✅ Yellow cycle complete");
    } catch (err) {
      console.error("Yellow cycle crashed:", err.message);
    }
    await delay(1_000);
  }
}

await Promise.all([
  yellowRoutine(),
]);