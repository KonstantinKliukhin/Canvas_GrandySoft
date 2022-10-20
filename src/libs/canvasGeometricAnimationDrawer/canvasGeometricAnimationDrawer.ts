import { ICanvasOptions } from '../../types/canvas';
import { IGeometricAnimationDrawer } from '../../types/geometricAnimationDrawer';
import { ILinePosition } from '../../types/line';
import { IStep } from '../../types/step';
import canvasGeometricDrawer from '../canvasGeometricDrawer/canvasGeometricDrawer';
import { IGeometricCalculator } from '../common/types/geometricCalculator';

const FPS_FOR_ANIMATION = 60;
const NUMBER_OF_LINE_ENDS = 2;
const ONE_SECOND = 1000;
const ANIMATION_DURATION = 3000;

class CanvasGeometricAnimationDrawer
  extends canvasGeometricDrawer
  implements IGeometricAnimationDrawer
{
  private geometricCalculator: IGeometricCalculator;

  constructor(
    geometricCalculator: IGeometricCalculator,
    ...args: ConstructorParameters<typeof canvasGeometricDrawer>
  ) {
    super(...args);

    this.geometricCalculator = geometricCalculator;
  }

  animateLinesCollapsing = (
    lines: ILinePosition[],
    linesOptions?: ICanvasOptions,
    dotsOptions?: ICanvasOptions,
  ): void => {
    const steps: IStep[] = [];

    const secondsNumber = Math.floor(ANIMATION_DURATION / ONE_SECOND);

    const framesPerAnimation = secondsNumber * FPS_FOR_ANIMATION;

    // We need odd number of line part for a simultaneous step to the middle of the line
    // this is the reason for adding 1
    const lineParts = framesPerAnimation * NUMBER_OF_LINE_ENDS + 1;

    // We need one more frame to take a step towards the middle, so we need to add 1 to
    // frames per animantion, but the first step we will do  doesn't hav timeout it means that
    // we doesn't need to add 1

    const iterationDuration = ANIMATION_DURATION / framesPerAnimation;

    lines.forEach((line) => {
      const step = this.geometricCalculator.calculateStepToLineCenter(line, lineParts);

      steps.push(step);
    });

    const newLines: ILinePosition[] = [];

    this.startLinesCollapsingAnimation(
      lines,
      newLines,
      steps,
      iterationDuration,
      framesPerAnimation,
      linesOptions,
      dotsOptions,
    );
  };

  private startLinesCollapsingAnimation = (
    lines: ILinePosition[],
    newLines: ILinePosition[],
    steps: IStep[],
    iterationDuration: number,
    framesPerAnimation: number,
    linesOptions?: ICanvasOptions,
    dotsOptions?: ICanvasOptions,
  ) => {
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
          steps[i],
        );
      });

      const newIntersectionDots = this.geometricCalculator.calculateLinesIntersectionDots(newLines);

      this.clearAll();
      this.drawLines(newLines, linesOptions);

      this.drawDots(newIntersectionDots, dotsOptions);
    };
    drawNewLines();
  };
}

export default CanvasGeometricAnimationDrawer;
