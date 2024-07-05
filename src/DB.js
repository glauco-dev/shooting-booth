
export default class DB {
    constructor() {
      this.db = openDB("shooting-booth", 1);
    }
  
    async get(key) {
      const tx = this.db.transaction("data", "readonly");
      const store = tx.objectStore("data");
      const req = store.get(key);
      const res = await req;
      return res;
    }
  
    async set(key, value) {
      const tx = this.db.transaction("data", "readwrite");
      const store = tx.objectStore("data");
      const req = store.put(value, key);
      await req;
    }
  }