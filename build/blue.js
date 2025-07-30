import { CharacterClient, delay } from "./CharacterClient.js";

const Blue = new CharacterClient("BlueBuba");

async function blueRoutine() {
  while (true) {
    try {
      await delay(5_000);
      await Blue.moveTo(4, 1, 36);
      await Blue.bankDepositAll();

      await Blue.moveTo(2, 0);
      await Blue.gather(100, 27);

      await Blue.moveTo(1, 5, 36);
      await Blue.craft("copper_bar", 10, 5.5);

      console.log("✅ Blue cycle complete");
    } catch (err) {
      console.error("Blue cycle crashed:", err.message);
    }
    await delay(1_000);
  }
}

await Promise.all([
  blueRoutine(),
]);