import { ICanvasOptions } from './canvas';
import { IGeometricDrawer } from './geometricDrawer';
import { ILinePosition } from './line';

export interface IGeometricAnimationDrawer extends IGeometricDrawer {
  animateLinesCollapsing: (
    lines: ILinePosition[],
    linesOptions?: ICanvasOptions,
    dotsOptions?: ICanvasOptions,
  ) => void;
}
