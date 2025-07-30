import { CharacterClient, delay } from "./CharacterClient.js";

const Yellow = new CharacterClient("YellowBobo");

async function yellowRoutine() {
  while (true) {
    try {
      await delay(5_000);
      await Yellow.moveTo(4, 1, 36);
      await Yellow.bankDepositAll();

      await Yellow.moveTo(2, 0);
      await Yellow.gather(100, 27);

      await Yellow.moveTo(1, 5, 36);
      await Yellow.craft("copper_bar", 10, 5.5);

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