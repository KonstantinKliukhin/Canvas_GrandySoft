import { IDotPosition, ILinePosition } from '../../types/line';
import { IGeometricCalculator, IStep } from '../common/types/geometricCalculator';

class GeometricCalculator implements IGeometricCalculator {
  private toFixedNumber(value: number, numbersAfterPoint: number) {
    return Number(value.toFixed(numbersAfterPoint));
  }

  calculateStepToLineCenter(line: ILinePosition, partsOfLine: number): IStep {
    const stepX = this.toFixedNumber(
      (line.secondDotPosition.x - line.firstDotPosition.x) / partsOfLine,
      2
    );
    const stepY = this.toFixedNumber(
      (line.secondDotPosition.y - line.firstDotPosition.y) / partsOfLine,
      2
    );

    return {
      stepX,
      stepY,
    };
  }

  calculateNewLinePositionDecreasedToCeter(line: ILinePosition, step: IStep): ILinePosition {
    const newFirstDotPositionX = this.toFixedNumber(line.firstDotPosition.x + step.stepX, 2);
    const newFirstDotPositionY = this.toFixedNumber(line.firstDotPosition.y + step.stepY, 2);

    const newSecondDotPositionX = this.toFixedNumber(line.secondDotPosition.x - step.stepX, 2);
    const newSecondDotPositionY = this.toFixedNumber(line.secondDotPosition.y - step.stepY, 2);

    const newLine: ILinePosition = {
      firstDotPosition: {
        x: newFirstDotPositionX,
        y: newFirstDotPositionY,
      },
      secondDotPosition: {
        x: newSecondDotPositionX,
        y: newSecondDotPositionY,
      },
    };

    return newLine;
  }

  calculateLineIntersectionPoints(mainLine: ILinePosition, lines: ILinePosition[]): IDotPosition[] {
    const intersectionPoints: IDotPosition[] = [];

    lines.forEach((line) => {
      const intersectionPoint = this.calculateTwoLinesIntersectionPoint(mainLine, line);

      if (!intersectionPoint) return;

      intersectionPoints.push(intersectionPoint);
    });

    return intersectionPoints;
  }

  private calculateTwoLinesIntersectionPoint(
    firstLine: ILinePosition,
    secondLine: ILinePosition
  ): IDotPosition | false {
    // According to Paul Bourke, the equation for this problem looks like this: Pa = Pb;
    // where Pa = P1 + ua ( P2 - P1 ) and Pb = P3 + ub ( P4 - P3 );
    // from this we must find "ua" and "ub"
    // then we need to solve 2 equations: x = x1 + ua (x2 - x1) and y = y1 + ua (y2 - y1)
    // x and y are coordinates of dot intersection

		// Pa and Pb are the same point of 2 lines if this lines intersects
		// P1 and P2 are endpoints of the first line, P3 and P4 are endpoints of the second line
		
    // Check if none of the lines are of length 0
    if (
      (firstLine.firstDotPosition.x === firstLine.secondDotPosition.x &&
        firstLine.firstDotPosition.y === firstLine.secondDotPosition.y) ||
      (secondLine.firstDotPosition.x === secondLine.secondDotPosition.x &&
        secondLine.firstDotPosition.y === secondLine.secondDotPosition.y)
    ) {
      return false;
    }

    const denominator =
      (secondLine.secondDotPosition.y - secondLine.firstDotPosition.y) *
        (firstLine.secondDotPosition.x - firstLine.firstDotPosition.x) -
      (secondLine.secondDotPosition.x - secondLine.firstDotPosition.x) *
        (firstLine.secondDotPosition.y - firstLine.firstDotPosition.y);

    // Check if line is parallel
    if (denominator === 0) {
      return false;
    }

    const ua =
      ((secondLine.secondDotPosition.x - secondLine.firstDotPosition.x) *
        (firstLine.firstDotPosition.y - secondLine.firstDotPosition.y) -
        (secondLine.secondDotPosition.y - secondLine.firstDotPosition.y) *
          (firstLine.firstDotPosition.x - secondLine.firstDotPosition.x)) /
      denominator;
    const ub =
      ((firstLine.secondDotPosition.x - firstLine.firstDotPosition.x) *
        (firstLine.firstDotPosition.y - secondLine.firstDotPosition.y) -
        (firstLine.secondDotPosition.y - firstLine.firstDotPosition.y) *
          (firstLine.firstDotPosition.x - secondLine.firstDotPosition.x)) /
      denominator;

    // Check is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return false;
    }

    // Return point of intersection
    const x =
      firstLine.firstDotPosition.x +
      ua * (firstLine.secondDotPosition.x - firstLine.firstDotPosition.x);
    const y =
      firstLine.firstDotPosition.y +
      ua * (firstLine.secondDotPosition.y - firstLine.firstDotPosition.y);

    return { x, y };
  }
}

const geometricCalculator = new GeometricCalculator();

export default geometricCalculator;
