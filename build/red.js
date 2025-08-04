import { CharacterClient, delay } from "./CharacterClient.js";

const Red = new CharacterClient("RedBuba");

async function redRoutine() {
  while (true) {
    await Red.moveTo(4, 1, 55);
    await Red.bankDepositAll();
    await Red.depositGoldAll();

    await delay(3_000);
    await Red.moveTo(-3, -3, 55);
    const FIGHT_MS = 50_000;
    const REST_MS = 60_000;

    for (let i = 0; i < 200; i++) {
      const ok = await Red.fight();
      if (!ok) {
        await delay(5_000);
        continue;
      }

      await delay(FIGHT_MS);
      await Red.rest();
      await delay(REST_MS);
    }
  }
}

await Promise.all([redRoutine()]);
