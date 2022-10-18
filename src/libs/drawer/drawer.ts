import { IDrawer, IDrawerOptions } from '../../types/drawer';
import { IDotPosition, ILinePosition } from '../../types/line';
import { IPainter } from '../../types/painter';

class Drawer<PainterType extends IPainter<PainterType['strokeStyle'], PainterType['lineCap']>>
  implements IDrawer<PainterType>
{
  private painter: PainterType;

  constructor(painter: PainterType) {
    this.painter = painter;
  }

  setOptions(
    options: Omit<
      IDrawerOptions<PainterType['lineCap'], PainterType['strokeStyle']>,
      'revertSettingsBack'
    >,
  ): void {
    if (options.lineCap) {
      this.painter.lineCap = options.lineCap;
    }

    if (options.lineWidth) {
      this.painter.lineWidth = options.lineWidth;
    }

    if (options.penColor) {
      this.painter.strokeStyle = options.penColor;
    }
  }

  private setOptionsWrapper(
    fn: (...args: unknown[]) => void,
    options?: IDrawerOptions<PainterType['lineCap'], PainterType['strokeStyle']>,
  ): void {
    if (!options) {
      fn.call(this);
      return;
    }

    const savedOptions = options.revertSettingsBack && {
      lineWidth: this.painter.lineWidth,
      penColor: this.painter.strokeStyle,
      lineCap: this.painter.lineCap,
    };

    this.setOptions(options);

    fn.call(this);

    if (savedOptions) {
      this.setOptions(savedOptions);
    }
  }

  drawLine = (
    line: ILinePosition,
    options?: IDrawerOptions<PainterType['lineCap'], PainterType['strokeStyle']>,
  ): void => {
    this.setOptionsWrapper(() => {
      this.painter.beginPath();
      this.painter.moveTo(line.firstDotPosition.x, line.firstDotPosition.y);
      this.painter.lineTo(line.secondDotPosition.x, line.secondDotPosition.y);
      this.painter.stroke();
      this.painter.closePath();
    }, options);
  };

  drawLines = (
    lines: ILinePosition[],
    options?: IDrawerOptions<PainterType['lineCap'], PainterType['strokeStyle']>,
  ): void => {
    this.setOptionsWrapper(() => {
      for (const line of lines) {
        this.drawLine(line);
      }
    }, options);
  };

  clearAll(): void {
    this.painter.clearRect(0, 0, this.painter.width, this.painter.height);
  }

  drawDot = (
    dot: IDotPosition,
    options?: IDrawerOptions<PainterType['lineCap'], PainterType['strokeStyle']>,
  ): void => {
    this.setOptionsWrapper(() => {
      this.painter.beginPath();
      this.painter.moveTo(dot.x, dot.y);
      this.painter.lineTo(dot.x, dot.y);
      this.painter.stroke();
      this.painter.closePath();
    }, options);
  };

  drawDots = (
    dots: IDotPosition[],
    options?: IDrawerOptions<PainterType['lineCap'], PainterType['strokeStyle']>,
  ): void => {
    this.setOptionsWrapper(() => {
      dots.forEach((dot) => {
        this.drawDot(dot);
      });
    }, options);
  };
}

export default Drawer;
