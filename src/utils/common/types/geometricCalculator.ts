import { IDotPosition, ILinePosition } from '../../../types/line';

export interface IStep {
  stepX: number;
  stepY: number;
}

export interface IGeometricCalculator {
  calculateStepToLineCenter: (line: ILinePosition, partsOfLine: number) => IStep;
  calculateNewLinePositionDecreasedToCeter: (line: ILinePosition, step: IStep) => ILinePosition;
	calculateLineIntersectionPoints:(mainLine: ILinePosition, lines: ILinePosition[]) => IDotPosition[];
}
