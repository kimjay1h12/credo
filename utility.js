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
export function getRandomItems(array, count) {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, count);
}
