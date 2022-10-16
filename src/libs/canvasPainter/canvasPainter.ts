import { CanvasLineCapType, CanvasStrokeStyleType } from '../../types/canvasPainter';
import { IPainter } from '../../types/painter';

const CANVAS_PIXEL_SCALE_W = 2;
const CANVAS_PIXEL_SCALE_H = 2;

class CanvasPainter implements IPainter<CanvasStrokeStyleType, CanvasLineCapType> {
  width: number;
  height: number;
  private context: CanvasRenderingContext2D;

  constructor(
    width: number,
    height: number,
    canvas: HTMLCanvasElement,
    lineCap: CanvasLineCap,
    strokeStyle: CanvasStrokeStyleType,
    lineWidth: number,
  ) {
    this.width = width;
    this.height = height;

    canvas.width = width * CANVAS_PIXEL_SCALE_W;
    canvas.height = height * CANVAS_PIXEL_SCALE_H;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error(`incorrect context type ${typeof context}`);
    }

    context.scale(CANVAS_PIXEL_SCALE_W, CANVAS_PIXEL_SCALE_H);
    context.lineCap = lineCap;
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    CanvasGradient;

    this.context = context;
  }

  setScale(x: number, y: number) {
    this.context.scale(x, y);
  }

  moveTo(x: number, y: number) {
    this.context.moveTo(x, y);
  }

  lineTo(x: number, y: number) {
    this.context.lineTo(x, y);
  }

  stroke() {
    this.context.stroke();
  }

  beginPath() {
    this.context.beginPath();
  }

  closePath() {
    this.context.closePath();
  }

  clearRect(x: number, y: number, w: number, h: number) {
    this.context.clearRect(x, y, w, h);
  }

  setLineWidth(width: number) {
    this.context.lineWidth = width;
  }

  setLineCap(lineCap: CanvasLineCapType) {
    this.context.lineCap = lineCap;
  }

  setStrokeStyle(strokeStyle: string | CanvasGradient | CanvasPattern) {
    this.context.strokeStyle = strokeStyle;
  }
}

export default CanvasPainter;
