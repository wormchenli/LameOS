import * as typeDefinitions from "./../types/typeDefinitions";

export interface IUiProp {
  sizeProp: typeDefinitions.Size;
  positionProp?: typeDefinitions.ElementPosition;
  cssStyleProp?: React.CSSProperties;
  tailWindStyleProp?: string;
  zIndexProp?: number;
  children: React.ReactNode;
}
