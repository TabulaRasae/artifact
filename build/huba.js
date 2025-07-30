import { CharacterClient, delay } from "./CharacterClient.js";

const Huba = new CharacterClient("HubaBuba");

async function hubaRoutine() {
  while (true) {
    try {
      await delay(5_000);
      await Huba.moveTo(4, 1, 60);
      await Huba.bankDepositAll();

      await Huba.moveTo(6, 1);
      await Huba.gather(100, 27);

      await Huba.moveTo(-2, -3, 60);
      await Huba.craft("ash_plank", 10, 5.5);

      console.log("✅ Huba cycle complete");
    } catch (err) {
      console.error("Huba cycle crashed:", err.message);
    }
    await delay(1_000);
  }
}

await Promise.all([
  hubaRoutine(),
]);