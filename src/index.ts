// reflect-metadata is required for tsyringe to work properly and it should be imported at the top of the entry point file.
import "reflect-metadata";
// This file is the entry point for the application.
import { multiplyArrays } from "../tests/tp-multiplyArrays";

// async function start() {
//   console.log("Application starts...");

//   const textToNormalize = " Hello world    ";
//   console.log(`Text to normalize: "${textToNormalize}"`);
//   const stringFormatter = container.resolve(StringFormatter);
//   const normalizedText = stringFormatter.normalize(textToNormalize);
//   console.log(`Normalized text: "${normalizedText}"`);

//   console.log("Application ends...");
// }

// start();

async function start2() {
  console.log("Application starts...");

  const result = multiplyArrays([3, 5, 2], [4, 3, 1]);
  console.log(`Result: ${result}`);

  console.log("Application ends...");
}

start2();
