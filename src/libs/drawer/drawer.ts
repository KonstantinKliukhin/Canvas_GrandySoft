import { firstArgOfFnInInterface } from '../../types/customTypes';
import { IDrawer } from '../../types/drawer';
import { IDotPosition, ILinePosition } from '../../types/line';
import { IPainter } from '../../types/painter';

class Drawer<
  PainterType extends IPainter<
    Parameters<PainterType['setStrokeStyle']>[0],
    Parameters<PainterType['setLineCap']>[0]
  >,
> implements IDrawer<PainterType>
{
  private painter: PainterType;

  constructor(painter: PainterType) {
    this.painter = painter;
  }

  drawLine(line: ILinePosition): void {
    this.painter.beginPath();
    this.painter.moveTo(line.firstDotPosition.x, line.firstDotPosition.y);
    this.painter.lineTo(line.secondDotPosition.x, line.secondDotPosition.y);
    this.painter.stroke();
    this.painter.closePath();
  }

  drawLines(lines: ILinePosition[]): void {
    for (const line of lines) {
      this.drawLine(line);
    }
  }

  clearAll(): void {
    this.painter.clearRect(0, 0, this.painter.width, this.painter.height);
  }

  setPenColor(penColor: firstArgOfFnInInterface<PainterType, 'setStrokeStyle'>) {
    this.painter.setStrokeStyle(penColor);
  }

  setLineCap(lineCap: firstArgOfFnInInterface<PainterType, 'setLineCap'>) {
    this.painter.setLineCap(lineCap);
  }

  setLineWidth(width: number) {
    this.painter.setLineWidth(width);
  }

  drawDot(dot: IDotPosition) {
    this.painter.beginPath();
    this.painter.moveTo(dot.x, dot.y);
    this.painter.lineTo(dot.x, dot.y);
    this.painter.stroke();
    this.painter.closePath();
  }

  drawDots(dots: IDotPosition[]) {
    dots.forEach((dot) => {
      this.drawDot(dot);
    });
  }
}

export default Drawer;
