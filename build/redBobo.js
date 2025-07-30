import { CharacterClient, delay } from "./CharacterClient.js";

const RedBobo = new CharacterClient("RedBobo");

async function redBoboRoutine() {
  while (true) {
    try {
      await delay(5_000);
      await RedBobo.moveTo(4, 1, 36);
      await RedBobo.bankDepositAll();

      await RedBobo.moveTo(2, 2);
      await RedBobo.gather(100, 27);

      await RedBobo.moveTo(2, 3, 5);
      await RedBobo.craft("small_health_potion", 33, 5.5);

      console.log("✅ Yellow cycle complete");
    } catch (err) {
      console.error("Yellow cycle crashed:", err.message);
    }
    await delay(1_000);
  }
}

await Promise.all([redBoboRoutine()]);
