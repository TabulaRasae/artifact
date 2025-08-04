import { CharacterClient, delay } from "./CharacterClient.js";

const Huba = new CharacterClient("HubaBuba");

async function mineCopper() {
  while (true) {
    try {
      await delay(5_000);
      await Huba.moveTo(4, 1, 45);
      await Huba.bankDepositAll();

      await Huba.moveTo(2, 0, 45);
      await Huba.gather(100, 30);

      await Huba.moveTo(1, 5, 10);
      await Huba.craft("copper_bar", 10, 5.5);

      console.log("✅ Huba cycle complete");
    } catch (err) {
      console.error("Huba cycle crashed:", err.message);
    }
    await delay(1_000);
  }
}

async function mineIron() {
  while (true) {
    try {
      await delay(3_000);
      await Huba.moveTo(4, 1, 45);
      await Huba.bankDepositAll();

      await delay(3_000);
      await Huba.moveTo(1, 7, 45);
      await Huba.gather(100, 31);

      await Huba.moveTo(1, 5, 10);
      await Huba.craft("iron_bar", 10, 5.5);

      console.log("✅ Blue cycle complete");
    } catch (err) {
      console.error("Blue cycle crashed:", err.message);
    }
    await delay(1_000);
  }
}

await Promise.all([mineIron()]);
