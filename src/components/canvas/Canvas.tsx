import { Component, MouseEventHandler, ReactNode, createRef } from 'react';

import { CanvasGeometricAnimationDrawer, geometricCalculator } from '../../libs';
import { IGeometricAnimationDrawer } from '../../types/geometricAnimationDrawer';
import { IDotPosition, ILinePosition } from '../../types/line';
import { ICanvasLayoutHandlers } from '../canvasLayout/CanvasLayout';
import './canvas.scss';

interface ICanvasProps {
  setClearHandler: (handlers: ICanvasLayoutHandlers) => void;
}

interface ICanvasState {
  isAnimating: boolean;
  visibleLines: ILinePosition[];
  firstDotPosition: IDotPosition | null;
  intersectionDots: IDotPosition[];
  animationWarning: boolean;
}

class Convas extends Component<ICanvasProps, ICanvasState> {
  state = {
    isAnimating: false,
    visibleLines: [],
    firstDotPosition: null,
    intersectionDots: [],
    animationWarning: false,
  };

  animationDrawer: IGeometricAnimationDrawer | null = null;
  canvasRef = createRef<HTMLCanvasElement>();

  componentDidMount(): void {
    this.props.setClearHandler({
      clearHandler: this.animateLinesCollapsing,
    });

    if (!this.canvasRef.current) return;
    const animationDrawer = new CanvasGeometricAnimationDrawer(
      geometricCalculator,
      800,
      600,
      'round',
      'black',
      5,
      this.canvasRef.current,
    );
    this.animationDrawer = animationDrawer;
  }

  animateLinesCollapsing = () => {
    const { visibleLines, isAnimating } = this.state;
    if (!this.animationDrawer) return;
    if (isAnimating) {
      this.setState({ animationWarning: true });
      return;
    }

    this.animationDrawer.animateLinesCollapsing(visibleLines, undefined, {
      strokeStyle: 'red',
      lineWidth: 15,
      revertSettingsBack: true,
    });

    this.setState({
      isAnimating: true,
      visibleLines: [],
      firstDotPosition: null,
      intersectionDots: [],
    });

    setTimeout(() => {
      this.setState({
        isAnimating: false,
        animationWarning: false,
      });
    }, 3000);
  };

  drawDots = (dots: IDotPosition[]) => {
    if (!this.animationDrawer || !dots.length) return;
    this.animationDrawer.drawDots(dots, {
      strokeStyle: 'red',
      lineWidth: 15,
      revertSettingsBack: true,
    });
  };

  saveIntersectionDots = (newDots: IDotPosition[]) => {
    this.setState(({ intersectionDots }) => {
      return {
        intersectionDots: [...intersectionDots, ...newDots],
      };
    });
  };

  getIntersectionDots = (mainLine: ILinePosition): IDotPosition[] => {
    return geometricCalculator.calculateLineIntersectionDots(mainLine, this.state.visibleLines);
  };

  saveLine = (newLine: ILinePosition): void => {
    if (!this.state.firstDotPosition) return;

    this.setState(({ visibleLines }) => ({
      visibleLines: [...visibleLines, newLine],
    }));
  };

  drawLine = (line: ILinePosition) => {
    const animationDrawer = this.animationDrawer;
    if (!animationDrawer) return;

    animationDrawer.clearAll();

    animationDrawer.drawLines([line, ...this.state.visibleLines]);
  };

  moveHandler: MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent }) => {
    if (!this.state.firstDotPosition || !this.animationDrawer) return;
    const { firstDotPosition, intersectionDots, isAnimating } = this.state;

    if (isAnimating) {
      this.setState({
        animationWarning: true,
      });
      return;
    }

    const { offsetX, offsetY } = nativeEvent;

    const secondDotPosition: IDotPosition = {
      x: offsetX,
      y: offsetY,
    };

    const currentLine: ILinePosition = {
      firstDotPosition,
      secondDotPosition,
    };

    this.drawLine(currentLine);

    const currentIntersectionDots = this.getIntersectionDots(currentLine);

    this.drawDots([...intersectionDots, ...currentIntersectionDots]);
  };

  clickHandler: MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent }) => {
    const { firstDotPosition, isAnimating } = this.state;

    if (isAnimating) {
      this.setState({
        animationWarning: true,
      });
      return;
    }

    const { offsetX, offsetY } = nativeEvent;

    const newDotPosition: IDotPosition = {
      x: offsetX,
      y: offsetY,
    };

    if (!firstDotPosition) {
      this.setState({
        firstDotPosition: newDotPosition,
      });
      return;
    }

    const newLine: ILinePosition = {
      firstDotPosition: firstDotPosition,
      secondDotPosition: newDotPosition,
    };

    const newIntersectionDots = this.getIntersectionDots(newLine);
    this.saveIntersectionDots(newIntersectionDots);
    this.saveLine(newLine);
    this.setState({
      firstDotPosition: null,
    });
  };

  render(): ReactNode {
    return (
      <>
        <canvas
          onClick={this.clickHandler}
          onMouseMove={this.moveHandler}
          ref={this.canvasRef}
          className='canvas-field__canvas'
        ></canvas>
        {this.state.animationWarning && (
          <p className='canvas-field__warning'>Don't touch while the animation lasts</p>
        )}
      </>
    );
  }
}

export default Convas;
