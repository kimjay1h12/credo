import Compressor from "compressorjs";
import { storage } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "./firebase";

export const currencyFormatter = (value, options) => {
  const defaultOptions = {
    significantDigits: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
    symbol: "₦",
  };
  if (typeof value !== "number") value = 0.0;
  options = { ...defaultOptions, ...options };

  options.symbol = options.symbol?.replace("USD", "$");
  options.symbol = options.symbol?.replace("NGN", "₦");

  value = value.toFixed(options.significantDigits);

  const [currency, decimal] = value.split(".");
  return `${options.symbol} ${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator
  )}${options.decimalSeparator}${decimal}`;
};
export function addIdsToArray(array) {
  let idCounter = 1; // Initialize a counter for generating unique IDs
  return array.map((item) => ({
    id: idCounter++, // Assign a unique ID to each object
    ...item, // Copy the existing object properties
  }));
}
export const uploadHelmper = (type = "image") => {
  const storage = getStorage(app);

  return new Promise((resolve, reject) => {
    const file = document.createElement("input");
    file.type = "file";
    file.accept = type + "/*";
    file.click();
    file.oncancel = () => {
      resolve({
        loading: false,
        url: null,
        name: "",
      });
    };
    file.onchange = async (e) => {
      try {
        if (type === "image") {
          const f = e.target.files[0];
          console.log(f.size);
          new Compressor(f, {
            quality: 0.5,
            success: async (compressedResult) => {
              // compressedResult has the compressed file.
              // Use the compressed file to upload the images to your server.
              console.log(compressedResult);
              const storageRef = ref(
                storage,
                type + "/" + Date.now() + "_" + compressedResult.name
              );
              const uploadTask = await uploadBytes(
                storageRef,
                compressedResult
              );
              const url = await getDownloadURL(uploadTask.ref);

              resolve({
                loading: false,
                url,
                name: compressedResult.name,
              });
            },
          });
        }
      } catch (error) {
        resolve({
          loading: false,
          url: "",
          name: compressedResult.name,
        });
      }
    };
  });
};
export function formatDateAndTime(inputDate) {
  // Parse the inputDate into a Date object
  const date = new Date(inputDate);

  // Create an array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });

  // Get the day of the month with the appropriate suffix (e.g., 1st, 2nd, 3rd, 4th)
  const dayOfMonth = date.getDate();
  const dayOfMonthWithSuffix =
    dayOfMonth +
    (dayOfMonth % 10 === 1 && dayOfMonth !== 11
      ? "st"
      : dayOfMonth % 10 === 2 && dayOfMonth !== 12
      ? "nd"
      : dayOfMonth % 10 === 3 && dayOfMonth !== 13
      ? "rd"
      : "th");

  // Get the month name
  const monthName = monthNames[date.getMonth()];

  // Get the year
  const year = date.getFullYear();

  // Format the date string
  const formattedDate = `${dayOfWeek
    .split(",")
    .slice(0, 1)
    .join(",")}, ${dayOfMonthWithSuffix} ${monthName}`;

  // Format the time string
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { formattedDate, formattedTime };
}
export function generateRandomTransactionReference() {
  const prefix = "TXN"; // You can customize the prefix
  const timestamp = Date.now().toString(36); // Convert the current timestamp to a base-36 string
  const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string

  const transactionReference = `${prefix}-${timestamp}-${randomString}`;
  return transactionReference.toString(); // Ensure that the result is a string
}

// Example usage
const randomTransactionReference = generateRandomTransactionReference();
console.log(randomTransactionReference);

export function getRandomItems(array, count) {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, count);
}
export const isFormDataComplete = (formData) => {
  for (const key in formData) {
    // Exclude billingCompany from the check
    if (
      key !== "billingCompany" &&
      key !== "noOfItems" &&
      key !== "productName" &&
      key !== "productImageLink" &&
      key !== "amount" &&
      key !== "size" &&
      !formData[key] &&
      formData[key] !== 0
    ) {
      return false; // Return false if any non-optional field is empty, null, or falsy
    }
  }
  return true; // All non-optional fields are filled in, return true
};
export const sumPrices = (items) => {
  let total = 0;

  for (const item of items) {
    // Ensure that the 'price' property exists and is a number
    const itemPrice = parseFloat(item?.product?.price);

    // Add the item price to the total
    if (!isNaN(itemPrice)) {
      total += itemPrice;
    }
  }

  return total;
};
export const sumTotal = (items) => {
  let total = 0;

  for (const item of items) {
    // Ensure that the 'price' property exists and is a number
    const itemPrice = parseFloat(item?.amount);

    // Add the item price to the total
    if (!isNaN(itemPrice)) {
      total += itemPrice;
    }
  }

  return total;
};
