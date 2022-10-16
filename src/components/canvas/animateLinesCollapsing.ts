import { geometricCalculator } from '../../libs';
import { CanvasPainterType } from '../../types/canvasPainter';
import { IDrawer } from '../../types/drawer';
import { ILinePosition } from '../../types/line';
import { IStep } from '../../types/step';

const FPS_FOR_ANIMATION = 60;
const NUMBER_OF_LINE_ENDS = 2;
const ONE_SECOND = 1000;
const ANIMATION_DURATION = 3000;

const animateLinesCollapsing = (lines: ILinePosition[], drawer: IDrawer<CanvasPainterType>) => {
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
    const step = geometricCalculator.calculateStepToLineCenter(line, lineParts);

    steps.push(step);
  });

  const newLines: ILinePosition[] = [];

  startLinesCollapsingAnimation(
    lines,
    newLines,
    steps,
    iterationDuration,
    framesPerAnimation,
    drawer,
  );
};

const startLinesCollapsingAnimation = (
  lines: ILinePosition[],
  newLines: ILinePosition[],
  steps: IStep[],
  iterationDuration: number,
  framesPerAnimation: number,
  drawer: IDrawer<CanvasPainterType>,
) => {
  let i = 0;

  const drawNewLines = () => {
    if (i >= framesPerAnimation) {
      drawer.clearAll();
      return;
    }

    i++;

    setTimeout(drawNewLines, iterationDuration);

    const currentLines = newLines.length ? newLines : lines;

    currentLines.forEach((line, i) => {
      newLines[i] = geometricCalculator.calculateNewLinePositionDecreasedToCeter(line, steps[i]);
    });

    drawer.clearAll();
    drawer.drawLines(newLines);
  };

  drawNewLines();
};

export default animateLinesCollapsing;
