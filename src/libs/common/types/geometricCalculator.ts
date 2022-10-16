import { IDotPosition, ILinePosition } from '../../../types/line';
import { IStep } from '../../../types/step';

export interface IGeometricCalculator {
  calculateStepToLineCenter: (line: ILinePosition, partsOfLine: number) => IStep;
  calculateNewLinePositionDecreasedToCeter: (line: ILinePosition, step: IStep) => ILinePosition;
  calculateLineIntersectionPoints: (
    mainLine: ILinePosition,
    lines: ILinePosition[],
  ) => IDotPosition[];
}
