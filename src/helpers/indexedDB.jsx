export let db;

export function retrieveData() {
  const objectStore = db.transaction("purchases").objectStore("purchases");
  let result = [];
  objectStore.openCursor().onsuccess = function (event) {
    const cursor = event.target.result;
    if (cursor) {
      result.push(cursor.value);
      cursor.continue();
    }
  };
  return result;
}

class Database {
  constructor() {
    this.createDB();
    this.DB = null;
  }

  createDB() {
    const dbCreate = window.indexedDB.open("rec-fin", 1);

    dbCreate.onerror = function (event) {
      console.log("Error creating database");
    };

    dbCreate.onsuccess = function (event) {
      console.log("Database created successfully");
      db = dbCreate.result;
    };

    dbCreate.onupgradeneeded = function (event) {
      const objectStore = event.currentTarget.result.createObjectStore(
        "purchases",
        {
          keyPath: "id",
          autoIncrement: false,
        }
      );

      objectStore.createIndex("commerceInfo", "commerceInfo", {
        unique: false,
      });
      objectStore.createIndex("walletSelected", "walletSelected", {
        unique: false,
      });
      objectStore.createIndex("dateInvoice", "dateInvoice", { unique: false });
      objectStore.createIndex("description", "description", { unique: false });

      objectStore.createIndex("subTotal", "subTotal", { unique: false });
      objectStore.createIndex("discountTotal", "discountTotal", {
        unique: false,
      });
      objectStore.createIndex("net", "net", { unique: true });
      objectStore.createIndex("tax", "tax", { unique: true });
      objectStore.createIndex("total", "total", { unique: true });

      objectStore.createIndex("items", "items", { unique: true });
    };
  }
  storeData(data) {
    const transaction = db.transaction(["purchases"], "readwrite");
    const objectStore = transaction.objectStore("purchases");
    const request = objectStore.add(data);

    request.onsuccess = function (event) {
      console.log("Data saved successfully");
    };

    request.onerror = function (event) {
      console.log("Error saving data");
    };
  }

  updateData(id, data) {
    const transaction = db.transaction(["purchases"], "readwrite");
    const objectStore = transaction.objectStore("purchases");
    const request = objectStore.get(id);

    request.onsuccess = function (event) {
      const purchase = event.target.result;
      if (purchase) {
        const requestUpdate = objectStore.put({ ...purchase, ...data });

        requestUpdate.onsuccess = function (event) {
          console.log("Data updated successfully");
        };

        requestUpdate.onerror = function (event) {
          console.log("Error updating data");
        };
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving data");
    };
  }
  retrieveData() {
    const transaction = db.transaction(["purchases"], "readwrite");
    const objectStore = transaction.objectStore("purchases");

    let result = [];
    objectStore.openCursor().onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        result.push(cursor.value);
        cursor.continue();
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving data");
      return null;
    };
    return result;
  }
  deleteData(id) {
    const transaction = db.transaction(["purchases"], "readwrite");
    const objectStore = transaction.objectStore("purchases");
    const request = objectStore.delete(id);

    request.onsuccess = function (event) {
      console.log("Data deleted successfully");
    };

    request.onerror = function (event) {
      console.log("Error deleting data");
    };
  }
}

export default Database;
