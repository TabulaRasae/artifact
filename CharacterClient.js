import "dotenv/config";

const server = "https://api.artifactsmmo.com";
const TOKEN  = process.env.TOKEN;
const delay  = (ms) => new Promise((r) => setTimeout(r, ms));

export class CharacterClient {
  constructor(name) {
    this.name = name;
    this.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    };
  }

  async #post(path, body) {
    return fetch(`${server}/my/${this.name}${path}`, {
      method: "POST",
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async moveTo(x, y, wait = 60) {
    const res = await this.#post("/action/move", { x, y });
    if (res.status !== 200) {
      const txt = await res.text().catch(() => "");
      throw new Error(`Move failed → ${res.status} ${txt}`);
    }
    console.log(`${this.name} → (${x},${y}) — waiting ${wait}s`);
    await delay(wait * 1000);
  }

  async bankDepositAll() {
    while (true) {
      const invRes = await fetch(`${server}/characters/${this.name}`, {
        headers: this.headers,
      });
      if (invRes.status !== 200)
        throw new Error(`Inventory read failed → ${invRes.status}`);

      const { data } = await invRes.json();
      const items = data.inventory.filter((it) => it.code && it.quantity > 0);
      if (!items.length) {
        console.log(`${this.name} ✅ nothing to deposit`);
        return;
      }

      const payload = items.slice(0, 20).map(({ code, quantity }) => ({
        code,
        quantity,
      }));

      const depRes = await this.#post("/action/bank/deposit/item", payload);
      if (depRes.status !== 200)
        throw new Error(`Deposit failed → ${depRes.status}`);

      console.log(
        `${this.name} ⬅️ deposited ${payload.length} type(s) — wait ${
          payload.length * 3
        }s`
      );
      await delay(payload.length * 3 * 1000); // 3 s per item-type
    }
  }

  async gather(times = 100, cd = 30.5) {
    let done = 0;
    while (done < times) {
      const res = await this.#post("/action/gathering");
      if (res.status === 200) {
        console.log(`${this.name} gather #${++done} ✔ — wait ${cd}s`);
        await delay(cd * 1000);
      } else if (res.status === 499) {
        console.log(`${this.name} ⏳ gather cooldown — wait 5s`);
        await delay(5_000);
      } else if (res.status === 497) {
        console.log(`${this.name} ⚠️  inventory full`);
        return "INV_FULL";
      } else {
        const txt = await res.text().catch(() => "");
        console.log(`${this.name} gather err ${res.status} ${txt} — retry 5s`);
        await delay(5_000);
      }
    }
    return "DONE";
  }

  async craft(code = "ash_plank", times = 10, cd = 5.5) {
    let done = 0;
    while (done < times) {
      const res = await this.#post("/action/crafting", { code });
      if (res.status === 200) {
        console.log(`${this.name} craft #${++done} ✔ — wait ${cd}s`);
        await delay(cd * 1000);
      } else if (res.status === 471 || res.status === 478) {
        console.log(`${this.name} 🛑 no resources to craft`);
        return "NO_RES";
      } else if (res.status === 499) {
        console.log(`${this.name} ⏳ craft cooldown — wait 5s`);
        await delay(5_000);
      } else {
        const txt = await res.text().catch(() => "");
        console.log(`${this.name} craft err ${res.status} ${txt} — retry 5s`);
        await delay(5_000);
      }
    }
    return "DONE";
  }

  async fight() {
    const res = await this.#post("/action/fight");
    if (res.status === 200) {
      const js = await res.json().catch(() => ({}));
      console.log(
        `${this.name} 🥊 fight result:`,
        js?.data?.fight?.result ?? "(no data)"
      );
      return true;
    }
    if (res.status === 499) console.log(`${this.name} cooldown — retry`);
    else console.log(`${this.name} fight err`, res.status);
    return false;
  }

  async rest() {
    const res = await this.#post("/action/rest");
    const js = await res.json().catch(() => ({}));
    console.log(`${this.name} 💤 rest:`, js);
  }
}

export { delay };
