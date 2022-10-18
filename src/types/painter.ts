export interface IPainter<StrokeStyleType, LineCapType> {
  width: number;
  height: number;
  lineCap: LineCapType;
  strokeStyle: StrokeStyleType;
  lineWidth: number;

  setScale: (x: number, y: number) => void;
  moveTo: (x: number, y: number) => void;
  lineTo: (x: number, y: number) => void;
  stroke: () => void;
  beginPath: () => void;
  closePath: () => void;
  clearRect: (x: number, y: number, w: number, h: number) => void;
}
