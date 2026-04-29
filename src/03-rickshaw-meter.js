/**
 * 🛺 Auto Rickshaw Fare Calculator - Number & Math
 *
 * Bhaiyya ji ka auto rickshaw hai. Meter se fare calculate hota hai.
 * Different math operations chahiye — round karna, min/max nikalna,
 * strings se numbers parse karna. Tu Bhaiyya ji ka meter software bana!
 *
 * Methods to explore: parseFloat(), parseInt(), .toFixed(),
 *   Math.ceil(), Math.max(), Math.min(), Math.abs()
 *
 * Functions:
 *
 *   1. parseFare(fareString)
 *      - Customer bolte hain "152.50" as string — parseFloat() se number banao
 *      - Agar result NaN hai ya fareString string nahi hai, return -1
 *      - Example: parseFare("152.50") => 152.5
 *      - Example: parseFare("abc") => -1
 *
 *   2. roundFare(amount, decimalPlaces)
 *      - .toFixed(decimalPlaces) se fare round karo
 *      - Result STRING return hota hai (toFixed returns string)
 *      - Agar amount number nahi hai ya decimalPlaces non-negative integer nahi hai, return ""
 *      - Example: roundFare(152.567, 2) => "152.57"
 *      - Example: roundFare(152.567, 0) => "153"
 *
 *   3. calculateSurge(baseFare, surgeMultiplier)
 *      - baseFare * surgeMultiplier karo
 *      - Math.ceil() se always round UP (auto wale ko paisa milna chahiye!)
 *      - Agar baseFare ya surgeMultiplier positive number nahi hai, return 0
 *      - Example: calculateSurge(100, 1.5) => 150
 *      - Example: calculateSurge(73, 1.8) => 132 (Math.ceil(131.4))
 *
 *   4. findCheapestAndCostliest(...fares)
 *      - Rest parameter (...) se variable number of fares le
 *      - Math.min() aur Math.max() se cheapest aur costliest dhundho
 *      - Non-number values filter out karo
 *      - Agar koi valid number nahi mila, return null
 *      - Return: { cheapest, costliest }
 *      - Example: findCheapestAndCostliest(150, 80, 200) => { cheapest: 80, costliest: 200 }
 *
 *   5. getDistanceDifference(from, to)
 *      - parseInt() se string km markers ko numbers mein convert karo
 *      - Math.abs() se absolute difference nikalo (direction matter nahi karta)
 *      - Agar parse ke baad koi NaN hai, return -1
 *      - Example: getDistanceDifference(5, 12) => 7
 *      - Example: getDistanceDifference("15", "8") => 7
 *
 * @example
 *   parseFare("152.50")                    // => 152.5
 *   roundFare(152.567, 2)                  // => "152.57"
 *   findCheapestAndCostliest(150, 80, 200) // => { cheapest: 80, costliest: 200 }
 */
export function parseFare(fareString) {
  // Your code here
  
  if(typeof fareString !== 'string'){
    return -1;
  }
  fareString = parseFloat(fareString);
  if(Number.isNaN(fareString) === true){
    return -1;
  }
  if(typeof fareString === 'number'){
    return fareString;
  }
}

export function roundFare(amount, decimalPlaces) {
  // Your code here
  if(typeof amount !== 'number' || decimalPlaces < 0 || typeof decimalPlaces !== 'number' || Number.isInteger(decimalPlaces) === false){
    return "";
  }
  amount = amount.toFixed(decimalPlaces)
  return amount;
}
export function calculateSurge(baseFare, surgeMultiplier) {
  // Your code here
  let result = baseFare * surgeMultiplier;
  result = Math.ceil(result);
  
  if(baseFare < 0 || surgeMultiplier < 0 || typeof baseFare !== 'number' || typeof surgeMultiplier !== 'number'){
    return 0;
  }
  return result;
}

export function findCheapestAndCostliest(...fares) {
  // Your code here
  
  let newFares = fares.filter((fare) =>
    typeof fare === 'number'
  )
if(newFares.length === 0){
    return null;
  }
  let minValue = Math.min(...newFares);
  let maxValue = Math.max(...newFares);
  return { 'cheapest':minValue, 'costliest':maxValue}
}

export function getDistanceDifference(from, to) {
  // Your code here
  const parsedToValue = parseInt(to);
  const parsedFromValue = parseInt(from)
  const difference = to-from;
  const absValue = Math.abs(difference)

  if(Number.isNaN(parsedToValue) || Number.isNaN(parsedFromValue)){
    return -1;
  }
  return absValue
}
