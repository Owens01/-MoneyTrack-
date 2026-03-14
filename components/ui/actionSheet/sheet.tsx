import { AboutSheet } from "./AboutSheet";
import { registerSheet, SheetDefinition } from "react-native-actions-sheet";

registerSheet("about-sheet", AboutSheet);

export const Sheets = () => null

declare module "react-native-actions-sheet" {
  export interface SheetRegistry {
    "about-sheet": SheetDefinition;
  }
}
