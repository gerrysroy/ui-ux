import React from "react";
import { BarrierefreiheitMiniDemo } from "../Barrierefreiheit/MiniDemo";
import { ButtonsMiniDemo } from "../Buttons/MiniDemo";
import { CardsMiniDemo } from "../Cards/MiniDemo";
import { CheckboxSwitchMiniDemo } from "../Checkbox-Switch/MiniDemo";
import { DatagridMiniDemo } from "../Datagrid/MiniDemo";
import { DesignStylesMiniDemo } from "../Design-Styles/MiniDemo";
import { DialogsMiniDemo } from "../Dialogs/MiniDemo";
import { DropDownsMiniDemo } from "../DropDowns/MiniDemo";
import { FormsMiniDemo } from "../Forms/MiniDemo";
import { InputsMiniDemo } from "../Inputs/MiniDemo";
import { KopfFusszeileMiniDemo } from "../Kopf-Fusszeile/MiniDemo";
import { NavigationMenuMiniDemo } from "../Navigation-Menu/MiniDemo";
import { SpinnerLoadingMiniDemo } from "../Spinner-Loading/MiniDemo";
import { TabsMiniDemo } from "../Tabs/MiniDemo";
import { ToastFeedbackMiniDemo } from "../Toast-Feedback/MiniDemo";
import { TreeViewMiniDemo } from "../TreeView/MiniDemo";

export type DemoId =
  | "buttons"
  | "inputs"
  | "forms"
  | "dropdowns"
  | "checkbox-switch"
  | "dialogs"
  | "datagrid"
  | "tabs"
  | "spinner-loading"
  | "toast-feedback"
  | "cards"
  | "navigation-menu"
  | "kopf-fusszeile"
  | "design-styles"
  | "barrierefreiheit"
  | "treeview";

export const demoMap: Record<DemoId, { title: string; Component: React.ComponentType }> = {
  buttons: { title: "Buttons", Component: ButtonsMiniDemo },
  inputs: { title: "Inputs", Component: InputsMiniDemo },
  forms: { title: "Forms", Component: FormsMiniDemo },
  dropdowns: { title: "DropDowns", Component: DropDownsMiniDemo },
  "checkbox-switch": { title: "Checkbox-Switch", Component: CheckboxSwitchMiniDemo },
  dialogs: { title: "Dialogs", Component: DialogsMiniDemo },
  datagrid: { title: "Datagrid", Component: DatagridMiniDemo },
  tabs: { title: "Tabs", Component: TabsMiniDemo },
  "spinner-loading": { title: "Spinner-Loading", Component: SpinnerLoadingMiniDemo },
  "toast-feedback": { title: "Toast-Feedback", Component: ToastFeedbackMiniDemo },
  cards: { title: "Cards", Component: CardsMiniDemo },
  "navigation-menu": { title: "Navigation-Menu", Component: NavigationMenuMiniDemo },
  "kopf-fusszeile": { title: "Kopf- und Fusszeile", Component: KopfFusszeileMiniDemo },
  "design-styles": { title: "Design-Styles", Component: DesignStylesMiniDemo },
  barrierefreiheit: { title: "Barrierefreiheit", Component: BarrierefreiheitMiniDemo },
  treeview: { title: "TreeView", Component: TreeViewMiniDemo },
};

export const defaultDemo: DemoId = "buttons";
