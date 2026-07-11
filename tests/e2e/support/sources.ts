import fs from "node:fs";
import path from "node:path";

export const cssSourceFiles = [
  "src/app/globals.css",
  "src/styles/tokens.css",
  "src/styles/base.css",
  "src/styles/layout.css",
  "src/styles/sections.css",
  "src/styles/motion.css",
  "src/styles/reduced-mobile.css"
] as const;

export const contentSourceFiles = [
  "src/content/types.ts",
  "src/content/brand.ts",
  "src/content/customers.ts",
  "src/content/solutions.ts",
  "src/content/company.ts",
  "src/content/contact.ts",
  "src/content/index.ts",
  "src/content/site.ts"
] as const;

export function readSourceFiles(filePaths: readonly string[]) {
  return filePaths
    .map((filePath) => fs.readFileSync(path.join(process.cwd(), filePath), "utf8"))
    .join("\n");
}
