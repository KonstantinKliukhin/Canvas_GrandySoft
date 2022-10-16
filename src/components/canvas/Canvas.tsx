import {
  MouseEventHandler,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { IDotPosition, ILinePosition } from '../../types/line';
import CanvasPainter from '../../utils/canvasPainter/canvasPainter';
import Drawer from '../../utils/drawer/drawer';
import geometricCalculator from '../../utils/geometricCalculator/geometricCalculator';
import { IbuttonClearHandlerRef } from '../canvasLayout/CanvasLayout';
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

    const drawer = new Drawer(geometricCalculator, canvasPainter);

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

        drawerRef.current.animateCollapsingLines(visibleLines, 3000);

        setTimeout(() => {
          setIsAnimating(false);
          setAnimationWarning(false);
        }, 3000);
      },
    }),
    [visibleLines]
  );

	const drawIntersectionPoints = (line: ILinePosition) => {
		if (!drawerRef.current) return;
		drawerRef.current.setPenColor('red');
		drawerRef.current.setLineWidth(15);
		drawerRef.current.drawIntersectionPoints(line, visibleLines);
		drawerRef.current.drawDots(intersectionDots);
		drawerRef.current.setPenColor('black');
		drawerRef.current.setLineWidth(5);
	}

	const drawNewIntersectionPoints = (secondDotPosition: IDotPosition) => {
		if (!drawerRef.current || !firstDotPosition) return;

		const line = {
			firstDotPosition,
			secondDotPosition
		}

		drawerRef.current.setPenColor('red');
		drawerRef.current.setLineWidth(15);
		const newIntersectionDots = drawerRef.current.drawIntersectionPoints(line, visibleLines);
		drawerRef.current.drawDots(intersectionDots);

		setIntersectionDots(dots => {
			return [...dots, ...newIntersectionDots];
		})

		drawerRef.current.setPenColor('black');
		drawerRef.current.setLineWidth(5);
	}

  const saveLine = (secondDotPosition: IDotPosition) => {
    if (!firstDotPosition) return;

		const newLine: ILinePosition = {
			firstDotPosition,
			secondDotPosition,
		}

    setVisibleLines((lines) => {
      return [
        ...lines,
         newLine,
      ];
    });
  };

  const draw = (secondDotPosition: IDotPosition) => {
    if (!drawerRef.current || !firstDotPosition) return;

    drawerRef.current.clearAll();

    drawerRef.current.drawLines(visibleLines);

    const newLine = {
      firstDotPosition,
      secondDotPosition,
    };

    drawerRef.current.drawLine(newLine);

		drawIntersectionPoints(newLine);
  };

  const moveHandler: MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent }) => {
    if (!firstDotPosition) return;

    if (isAnimating) {
      setAnimationWarning(true);
      return;
    }

    const { offsetX, offsetY } = nativeEvent;

    const secondDotPosition: IDotPosition = {
      x: offsetX,
      y: offsetY,
    };

    draw(secondDotPosition);
  };

  const clickHandler: MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent }) => {
    if (isAnimating) {
      setAnimationWarning(true);
      return;
    }

    const { offsetX, offsetY } = nativeEvent;

    const newFirstDotPosition: IDotPosition = {
      x: offsetX,
      y: offsetY,
    };

    if (!firstDotPosition) {
      setFirstDotPosition(newFirstDotPosition);
    } else {
			drawNewIntersectionPoints(newFirstDotPosition);
      saveLine(newFirstDotPosition);
      setFirstDotPosition(null);
    }
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
