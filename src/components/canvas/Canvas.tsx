import {
  MouseEventHandler,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { CanvasPainter } from '../../libs';
import { Drawer } from '../../libs';
import { geometricCalculator } from '../../libs';
import { IDotPosition, ILinePosition } from '../../types/line';
import { IbuttonClearHandlerRef } from '../canvasLayout/CanvasLayout';
import animateLinesCollapsing from './animateLinesCollapsing';
import './canvas.scss';

const Canvas = forwardRef<IbuttonClearHandlerRef | null>((_props, clearHandlerRef) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawerRef = useRef<Drawer<CanvasPainter>>();

  const [visibleLines, setVisibleLines] = useState<ILinePosition[]>([]);
  const [firstDotPosition, setFirstDotPosition] = useState<IDotPosition | null>(null);
  const [intersectionDots, setIntersectionDots] = useState<IDotPosition[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationWarning, setAnimationWarning] = useState<boolean>(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const canvasPainter = new CanvasPainter(800, 600, canvas, 'round', 'black', 5);

    const drawer = new Drawer(canvasPainter);

    drawerRef.current = drawer;
  }, []);

  useImperativeHandle(
    clearHandlerRef,
    () => ({
      clearHandler: () => {
        if (!drawerRef.current) return;
        if (isAnimating) {
          setAnimationWarning(true);
          return;
        }

        setIsAnimating(true);
        setVisibleLines([]);
        setFirstDotPosition(null);
        setIntersectionDots([]);

        animateLinesCollapsing(visibleLines, drawerRef.current);

        setTimeout(() => {
          setIsAnimating(false);
          setAnimationWarning(false);
        }, 3000);
      },
    }),
    [visibleLines],
  );

  const drawDots = (dots: IDotPosition[]) => {
    if (!drawerRef.current) return;
    drawerRef.current.drawDots(dots, {
      penColor: 'red',
      lineWidth: 15,
      revertSettingsBack: true,
    });
  };

  const saveIntersectionDots = (newDots: IDotPosition[]) => {
    setIntersectionDots((oldDots) => {
      return [...oldDots, ...newDots];
    });
  };

  const getIntersectionDots = (mainLine: ILinePosition): IDotPosition[] => {
    return geometricCalculator.calculateLineIntersectionDots(mainLine, visibleLines);
  };

  const saveLine = (newLine: ILinePosition) => {
    if (!firstDotPosition) return;

    setVisibleLines((lines) => {
      return [...lines, newLine];
    });
  };

  const drawLine = (line: ILinePosition) => {
    if (!drawerRef.current) return;

    drawerRef.current.clearAll();

    drawerRef.current.drawLines([line, ...visibleLines]);
  };

  const moveHandler: MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent }) => {
    if (!firstDotPosition || !drawerRef.current) return;

    if (isAnimating) {
      setAnimationWarning(true);
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

    drawLine(currentLine);

    const currentIntersectionDots = getIntersectionDots(currentLine);

    drawDots([...intersectionDots, ...currentIntersectionDots]);
  };

  const clickHandler: MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent }) => {
    if (isAnimating) {
      setAnimationWarning(true);
      return;
    }

    const { offsetX, offsetY } = nativeEvent;

    const newDotPosition: IDotPosition = {
      x: offsetX,
      y: offsetY,
    };

    if (!firstDotPosition) {
      setFirstDotPosition(newDotPosition);
      return;
    }

    const newLine: ILinePosition = {
      firstDotPosition: firstDotPosition,
      secondDotPosition: newDotPosition,
    };

    const newIntersectionDots = getIntersectionDots(newLine);
    saveIntersectionDots(newIntersectionDots);
    saveLine(newLine);
    setFirstDotPosition(null);
  };

  return (
    <>
      <canvas
        onClick={clickHandler}
        onMouseMove={moveHandler}
        ref={canvasRef}
        className='canvas-field__canvas'
      ></canvas>
      {animationWarning && (
        <p className='canvas-field__warning'>Don't touch while the animation lasts</p>
      )}
    </>
  );
});

Canvas.displayName = 'Canvas';

export default Canvas;
