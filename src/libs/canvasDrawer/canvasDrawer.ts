import { CanvasLineCapType, CanvasStrokeStyleType } from '../../types/canvas';
import { IDrawer } from '../../types/drawer';

const CANVAS_PIXEL_SCALE_W = 2;
const CANVAS_PIXEL_SCALE_H = 2;

export class CanvasDrawer implements IDrawer {
  protected context: CanvasRenderingContext2D;
  protected canvasElement: HTMLCanvasElement;

  constructor(
    width: number,
    height: number,
    lineCap: CanvasLineCapType,
    strokeStyle: CanvasStrokeStyleType,
    lineWidth: number,
    canvasElement: HTMLCanvasElement,
  ) {
    canvasElement.style.width = `${width}px`;
    canvasElement.style.height = `${height}px`;

    const context = canvasElement.getContext('2d');

    if (!context) {
      throw new Error(`incorrect context type ${typeof context}`);
    }

    this.canvasElement = canvasElement;
    this.context = context;

    this.setScale(CANVAS_PIXEL_SCALE_W, CANVAS_PIXEL_SCALE_H);
    this.width = width * CANVAS_PIXEL_SCALE_W;
    this.height = height * CANVAS_PIXEL_SCALE_H;
    this.lineCap = lineCap;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
    this.width = width;
    this.height = height;
    this.lineCap = lineCap;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  setScale(x: number, y: number): void {
    this.context.scale(x, y);
  }

  moveTo(x: number, y: number): void {
    this.context.moveTo(x, y);
  }

  lineTo(x: number, y: number): void {
    this.context.lineTo(x, y);
  }

  stroke(): void {
    this.context.stroke();
  }

  beginPath(): void {
    this.context.beginPath();
  }

  closePath(): void {
    this.context.closePath();
  }

  clearRect(x: number, y: number, w: number, h: number): void {
    this.context.clearRect(x, y, w, h);
  }

  set width(value: number) {
    this.canvasElement.width = value;
  }

  get width(): number {
    return this.canvasElement.width;
  }

  set height(value: number) {
    this.canvasElement.height = value;
  }

  get height(): number {
    return this.canvasElement.height;
  }

  set lineCap(value: CanvasLineCapType) {
    this.context.lineCap = value;
  }

  get lineCap(): CanvasLineCapType {
    return this.context.lineCap;
  }

  set strokeStyle(value: CanvasStrokeStyleType) {
    this.context.strokeStyle = value;
  }

  get strokeStyle(): CanvasStrokeStyleType {
    return this.context.strokeStyle;
  }

  set lineWidth(value: number) {
    this.context.lineWidth = value;
  }

  get lineWidth(): number {
    return this.context.lineWidth;
  }
}

export default CanvasDrawer;
