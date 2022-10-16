import { firstArgumentOfFnInInterface } from '../../types/customTypes';
import { IDotPosition, ILinePosition } from '../../types/line';
import { IDrawer } from '../common/types/drawer';
import { IGeometricCalculator, IStep } from '../common/types/geometricCalculator';
import { IPainter } from './../common/types/painter';


const FPS_FOR_ANIMATION = 60;
const NUMBER_OF_LINE_ENDS = 2;
const ONE_SECOND = 1000;

class Drawer<
  PainterType extends IPainter<
    Parameters<PainterType['setStrokeStyle']>[0],
    Parameters<PainterType['setLineCap']>[0]
  >
> implements IDrawer<PainterType>
{
  painter: PainterType;
  private geometricCalculator: IGeometricCalculator;

  constructor(geometricCalculator: IGeometricCalculator, painter: PainterType) {
    this.painter = painter;
    this.geometricCalculator = geometricCalculator;
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

  animateCollapsingLines(lines: ILinePosition[], animationDuration: number) {
    const steps: IStep[] = [];

    const secondsNumber = Math.floor(animationDuration / ONE_SECOND);

    const framesPerAnimation = secondsNumber * FPS_FOR_ANIMATION;

    const lineParts = framesPerAnimation * NUMBER_OF_LINE_ENDS;

    const iterationDuration = animationDuration / framesPerAnimation;

    lines.forEach((line) => {
      const step = this.geometricCalculator.calculateStepToLineCenter(line, lineParts);

      steps.push(step);
    });

    const newLines: ILinePosition[] = [];

    this.startLinesCollapsingAnumation(
      lines,
      newLines,
      steps,
      iterationDuration,
      framesPerAnimation
    );
  }

  drawIntersectionPoints(mainLine: ILinePosition, lines: ILinePosition[]): IDotPosition[] {
    const intersectionPoints = this.geometricCalculator.calculateLineIntersectionPoints(
      mainLine,
      lines
    );

    this.drawDots(intersectionPoints);

    return intersectionPoints;
  }

  setPenColor(penColor: firstArgumentOfFnInInterface<PainterType, 'setStrokeStyle'>) {
    this.painter.setStrokeStyle(penColor);
  }

  setLineCap(lineCap: firstArgumentOfFnInInterface<PainterType, 'setLineCap'>) {
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

  private startLinesCollapsingAnumation(
    lines: ILinePosition[],
    newLines: ILinePosition[],
    steps: IStep[],
    iterationDuration: number,
    framesPerAnimation: number
  ) {
    setTimeout(
      (() => {
        let i = 0;

        const drawNewLines = () => {
          if (i >= framesPerAnimation) {
            this.clearAll();
            return;
          }

          i++;

          setTimeout(drawNewLines, iterationDuration);

          const currentLines = newLines.length ? newLines : lines;

          currentLines.forEach((line, i) => {
            newLines[i] = this.geometricCalculator.calculateNewLinePositionDecreasedToCeter(
              line,
              steps[i]
            );
          });

          this.clearAll();
          this.drawLines(newLines);
        };

        return drawNewLines;
      })(),
      iterationDuration
    );
  }
}

export default Drawer;
