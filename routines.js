import { CharacterClient, delay } from "./CharacterClient.js";

const Huba = new CharacterClient("HubaBuba");
const Red = new CharacterClient("RedBuba");
const Blue = new CharacterClient("BlueBuba");
const Yellow = new CharacterClient("YellowBobo");
const RedBobo = new CharacterClient("RedBobo");

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

async function redBoboRoutine() {
  while (true) {
    try {
      await delay(5_000);
      await RedBobo.moveTo(4, 1, 36);
      await RedBobo.bankDepositAll();

      await RedBobo.moveTo(2, 2);
      await RedBobo.gather(100, 27);

      console.log("✅ Yellow cycle complete");
    } catch (err) {
      console.error("Yellow cycle crashed:", err.message);
    }
    await delay(1_000);
  }
}

async function redRoutine() {
  await delay(5_000);
  await Red.moveTo(4, 1, 20);
  await Red.bankDepositAll();
  await Red.moveTo(0, 1, 20);
  const FIGHT_MS = 14_000;
  const REST_MS = 5_000;

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
  hubaRoutine(),
  redRoutine(),
  blueRoutine(),
  yellowRoutine(),
  redBoboRoutine(),
]);
