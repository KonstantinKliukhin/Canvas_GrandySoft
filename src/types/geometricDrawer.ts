import { ICanvasOptions } from './canvas';
import { IDrawer } from './drawer';
import { IDotPosition, ILinePosition } from './line';

export interface IGeometricDrawer extends IDrawer {
  setOptions: (options: ICanvasOptions) => void;
  drawLine: (line: ILinePosition, options?: ICanvasOptions) => void;
  drawLines: (lines: ILinePosition[], options?: ICanvasOptions) => void;
  clearAll: () => void;
  drawDot: (dot: IDotPosition, options?: ICanvasOptions) => void;
  drawDots: (dots: IDotPosition[], options?: ICanvasOptions) => void;
}
