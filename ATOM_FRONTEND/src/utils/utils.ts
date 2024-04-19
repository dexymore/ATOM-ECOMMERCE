
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Definition: Contains utility functions that are used in the application.
// used to split the string into characters using regex
export function splitStringUsingRegex(str: string): string[] {
const charcters : string[] = []
const regex = /[\s\S]/gu;

let match

while ((match = regex.exec(str))!==null) {
  charcters.push(match[0])}
    return charcters


}
// used to preload images
export const preloadImages = (srcArray: string[]): void => {
  srcArray.forEach((src) => {
    const newImage = new Image();
    newImage.src = src;
  });
};

 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}