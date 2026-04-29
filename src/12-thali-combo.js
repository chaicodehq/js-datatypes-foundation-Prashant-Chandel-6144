/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  if (
    typeof thali !== "object" ||
    thali === null ||
    typeof thali.name !== "string" ||
    !Array.isArray(thali.items) ||
    thali.items.length === 0 ||
    typeof thali.price !== "number" ||
    typeof thali.isVeg !== "boolean"
  ) {
    return "";
  }
  const name = thali.name.toUpperCase();
  const price = thali.price.toFixed(2);
  const items = thali.items.join(", ");
  const vegStr = thali.isVeg ? "Veg" : "Non-Veg";
  return `${name} (${vegStr}) - Items: ${items} - Rs.${price}`;
}

export function getThaliStats(thalis) {
  if (!Array.isArray(thalis) || thalis === null || thalis.length === 0) {
    return null;
  }
  const totalThalis = thalis.length;
  let vegCount = 0;
  let nonVegCount = 0;
  let prices = [];
  let names = [];
  for (const t of thalis) {
    if (t.isVeg) vegCount++;
    else nonVegCount++;
    prices.push(t.price);
    names.push(t.name);
  }
  const avgPrice = (prices.reduce((a, b) => a + b, 0) / totalThalis).toFixed(2);
  const cheapest = Math.min(...prices);
  const costliest = Math.max(...prices);
  return {
    totalThalis,
    vegCount,
    nonVegCount,
    avgPrice,
    cheapest,
    costliest,
    names,
  };
}

export function searchThaliMenu(thalis, query) {
  if (!Array.isArray(thalis) || typeof query !== "string") {
    return [];
  }
  const q = query.toLowerCase();
  return thalis.filter((thali) => {
    if (typeof thali.name === "string" && thali.name.toLowerCase().includes(q)) {
      return true;
    }
    if (Array.isArray(thali.items) && thali.items.some(item => typeof item === "string" && item.toLowerCase().includes(q))) {
      return true;
    }
    return false;
  });
}

export function generateThaliReceipt(customerName, thalis) {
  if (typeof customerName !== "string" || !Array.isArray(thalis) || thalis.length === 0) {
    return "";
  }
  const upperName = customerName.toUpperCase();
  let total = 0;
  const lineItems = thalis.map(thali => {
    total += thali.price;
    // Format price as integer if possible, else keep as is
    const priceStr = Number.isInteger(thali.price) ? thali.price : thali.price.toFixed(2);
    return `- ${thali.name} x Rs.${priceStr}`;
  }).join("\n");
  const count = thalis.length;
  // Format total as integer if possible
  const totalStr = Number.isInteger(total) ? total : total.toFixed(2);
  return `THALI RECEIPT\n---\nCustomer: ${upperName}\n${lineItems}\n---\nTotal: Rs.${totalStr}\nItems: ${count}`;
}
