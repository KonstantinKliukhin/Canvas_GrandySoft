export type CanvasStrokeStyleType = CanvasRenderingContext2D['strokeStyle'];
export type CanvasLineCapType = CanvasRenderingContext2D['lineCap'];

export interface ICanvasOptions {
  lineCap?: CanvasLineCapType;
  strokeStyle?: CanvasStrokeStyleType;
  lineWidth?: number;
  revertSettingsBack?: boolean;
}
