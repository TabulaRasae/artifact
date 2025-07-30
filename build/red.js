import { CharacterClient, delay } from "./CharacterClient.js";

const Red = new CharacterClient("RedBuba");

async function redRoutine() {
  await delay(5_000);
  await Red.moveTo(4, 1, 30);
  await Red.bankDepositAll();
  await Red.depositGoldAll();

  await Red.moveTo(2, -1, 30);
  const FIGHT_MS = 40_000;
  const REST_MS = 30_000;

  while (true) {
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

await Promise.all([
  redRoutine(),
]);