export function splitStringUsingRegex(str: string): string[] {
const charcters : string[] = []
const regex = /[\s\S]/gu;

let match

while ((match = regex.exec(str))!==null) {
  charcters.push(match[0])}
    return charcters


}
