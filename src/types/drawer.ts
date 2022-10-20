export interface IDrawer {
  width: number;
  height: number;
  lineCap: string;
  strokeStyle: string | object;
  lineWidth: number;

  setScale(x: number, y: number): void;
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
  stroke(): void;
  beginPath(): void;
  closePath(): void;
  clearRect(x: number, y: number, w: number, h: number): void;
}
