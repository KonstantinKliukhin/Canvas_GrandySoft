import { IPainter } from './painter';

export type CanvasStrokeStyleType = CanvasRenderingContext2D['strokeStyle'];
export type CanvasLineCapType = CanvasRenderingContext2D['lineCap'];

export type CanvasPainterType = IPainter<CanvasStrokeStyleType, CanvasLineCapType>;
