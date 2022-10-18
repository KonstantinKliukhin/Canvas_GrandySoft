import { IDotPosition, ILinePosition } from './line';
import { IPainter } from './painter';

export interface IDrawerOptions<LineCapType, PenColorType> {
  lineCap?: LineCapType;
  penColor?: PenColorType;
  lineWidth?: number;
  revertSettingsBack?: boolean;
}

export interface IDrawer<
  PainterType extends IPainter<PainterType['strokeStyle'], PainterType['lineCap']>,
> {
  drawLine: (
    line: ILinePosition,
    options?: IDrawerOptions<PainterType['lineCap'], PainterType['strokeStyle']>,
  ) => void;
  drawLines: (
    lines: ILinePosition[],
    options?: IDrawerOptions<PainterType['lineCap'], PainterType['strokeStyle']>,
  ) => void;
  clearAll: () => void;
  drawDot: (
    dot: IDotPosition,
    options?: IDrawerOptions<PainterType['lineCap'], PainterType['strokeStyle']>,
  ) => void;
  drawDots: (
    dots: IDotPosition[],
    options?: IDrawerOptions<PainterType['lineCap'], PainterType['strokeStyle']>,
  ) => void;
  setOptions: (
    options: Omit<
      IDrawerOptions<PainterType['lineCap'], PainterType['strokeStyle']>,
      'revertSettingsBack'
    >,
  ) => void;
}
