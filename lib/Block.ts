import { Content } from "mdast"

type Block = {
  editing: boolean;
  markdownText: string;
  content?: Content;
  htmlText?: string;
  component?: any;
}

export type {Block}