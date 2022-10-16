import { IPainter } from './painter';
import { IDotPosition, ILinePosition } from '../../../types/line';
import { firstArgumentOfFnInInterface } from '../../../types/customTypes';

export interface IDrawer<PainterType extends IPainter<Parameters<PainterType['setStrokeStyle']>[0], Parameters<PainterType['setLineCap']>[0]>> {
  painter: PainterType;
  drawLine: (line: ILinePosition) => void;
  drawLines: (lines: ILinePosition[]) => void;
  clearAll: () => void;
  animateCollapsingLines: (lines: ILinePosition[], animationDuration: number) => void;
	drawDot: (dot: IDotPosition) => void;
	drawDots: (dots: IDotPosition[]) => void;
	drawIntersectionPoints: (mainLine: ILinePosition, lines: ILinePosition[]) => IDotPosition[];
	setPenColor: (penColor: firstArgumentOfFnInInterface<PainterType, 'setStrokeStyle'>) => void;
	setLineCap: (lineCap: firstArgumentOfFnInInterface<PainterType, 'setLineCap'>) => void;
	setLineWidth: (width: number) => void;
}
