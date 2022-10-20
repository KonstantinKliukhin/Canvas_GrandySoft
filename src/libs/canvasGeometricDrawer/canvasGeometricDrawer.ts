import { ICanvasOptions } from '../../types/canvas';
import { IGeometricDrawer } from '../../types/geometricDrawer';
import { IDotPosition, ILinePosition } from '../../types/line';
import CanvasDrawer from '../canvasDrawer/canvasDrawer';

class canvasGeometricDrawer extends CanvasDrawer implements IGeometricDrawer {
  constructor(...args: ConstructorParameters<typeof CanvasDrawer>) {
    super(...args);
  }

  setOptions(options: ICanvasOptions): void {
    if (options.lineCap) {
      this.lineCap = options.lineCap;
    }

    if (options.lineWidth) {
      this.lineWidth = options.lineWidth;
    }

    if (options.strokeStyle) {
      this.strokeStyle = options.strokeStyle;
    }
  }

  private setOptionsWrapper(fn: (...args: unknown[]) => void, options?: ICanvasOptions): void {
    console.log(options);
    if (!options) {
      fn.call(this);
      return;
    }

    const savedOptions = options.revertSettingsBack && {
      lineWidth: this.lineWidth,
      strokeStyle: this.strokeStyle,
      lineCap: this.lineCap,
    };

    this.setOptions(options);

    fn.call(this);

    if (savedOptions) {
      this.setOptions(savedOptions);
    }
  }

  drawLine = (line: ILinePosition, options?: ICanvasOptions): void => {
    this.setOptionsWrapper(() => {
      this.beginPath();
      this.moveTo(line.firstDotPosition.x, line.firstDotPosition.y);
      this.lineTo(line.secondDotPosition.x, line.secondDotPosition.y);
      this.stroke();
      this.closePath();
    }, options);
  };

  drawLines = (lines: ILinePosition[], options?: ICanvasOptions): void => {
    this.setOptionsWrapper(() => {
      for (const line of lines) {
        this.drawLine(line);
      }
    }, options);
  };

  clearAll(): void {
    this.clearRect(0, 0, this.width, this.height);
  }

  drawDot = (dot: IDotPosition, options?: ICanvasOptions): void => {
    this.setOptionsWrapper(() => {
      this.beginPath();
      this.moveTo(dot.x, dot.y);
      this.lineTo(dot.x, dot.y);
      this.stroke();
      this.closePath();
    }, options);
  };

  drawDots = (dots: IDotPosition[], options?: ICanvasOptions): void => {
    this.setOptionsWrapper(() => {
      dots.forEach((dot) => {
        this.drawDot(dot);
      });
    }, options);
  };
}

export default canvasGeometricDrawer;
