export interface IPainter<StrokeStyleType, LineCapType> {
  width: number;
  height: number;

  setScale: (x: number, y: number) => void;
  moveTo: (x: number, y: number) => void;
  lineTo: (x: number, y: number) => void;
  stroke: () => void;
  beginPath: () => void;
  closePath: () => void;
  clearRect: (x: number, y: number, w: number, h: number) => void;
  setLineWidth: (width: number) => void;
  setLineCap: (lineCap: LineCapType) => void;
  setStrokeStyle: (strokeStyle: StrokeStyleType) => void;
}
