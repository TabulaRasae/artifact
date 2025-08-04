import { CharacterClient, delay } from "./CharacterClient.js";

const RedBobo = new CharacterClient("RedBobo");

async function redBoboMineCopper() {
  while (true) {
    try {
      await RedBobo.moveTo(4, 1, 45);
      await RedBobo.bankDepositAll();
      
      await RedBobo.moveTo(2, 0, 45);
      await RedBobo.gather(100, 30);
      
      await delay(5_000);
      await RedBobo.moveTo(1, 5, 10);
      await RedBobo.craft("copper_bar", 10, 5.5);
      console.log(" RedBobo cycle complete");
    } catch (err) {
      console.error("RedBobo cycle crashed:", err.message);
    }
    await delay(1_000);
  }
}

async function redBoboGatherSmallHealth() {
  while (true) {
    try {
      await RedBobo.moveTo(4, 1, 36);
      await RedBobo.bankDepositAll();
      
      await delay(5_000);
      await RedBobo.moveTo(2, 2);
      await RedBobo.gather(100, 27);

      await RedBobo.moveTo(2, 3, 5);
      await RedBobo.craft("small_health_potion", 33, 5.5);

      console.log("✅ RedBobo cycle complete");
    } catch (err) {
      console.error("RedBobo cycle crashed:", err.message);
    }
    await delay(1_000);
  }
}

async function mineIron() {
  while (true) {
    try {
      await delay(3_000);
      await RedBobo.moveTo(4, 1, 45);
      await RedBobo.bankDepositAll();

      await delay(3_000);
      await RedBobo.moveTo(1, 7, 45);
      await RedBobo.gather(100, 31);

      await RedBobo.moveTo(1, 5, 10);
      await RedBobo.craft("iron_bar", 10, 5.5);

      console.log("✅ Blue cycle complete");
    } catch (err) {
      console.error("Blue cycle crashed:", err.message);
    }
    await delay(1_000);
  }
}

await Promise.all([mineIron()]);
