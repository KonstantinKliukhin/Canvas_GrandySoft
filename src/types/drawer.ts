import { firstArgOfFnInInterface } from './customTypes';
import { IDotPosition, ILinePosition } from './line';
import { IPainter } from './painter';

export interface IDrawer<
  PainterType extends IPainter<
    Parameters<PainterType['setStrokeStyle']>[0],
    Parameters<PainterType['setLineCap']>[0]
  >,
> {
  drawLine: (line: ILinePosition) => void;
  drawLines: (lines: ILinePosition[]) => void;
  clearAll: () => void;
  drawDot: (dot: IDotPosition) => void;
  drawDots: (dots: IDotPosition[]) => void;
  setPenColor: (penColor: firstArgOfFnInInterface<PainterType, 'setStrokeStyle'>) => void;
  setLineCap: (lineCap: firstArgOfFnInInterface<PainterType, 'setLineCap'>) => void;
  setLineWidth: (width: number) => void;
}
