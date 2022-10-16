import { MouseEventHandler, useRef } from 'react';

import Canvas from './../canvas/Canvas';
import './canvasLayout.scss';

export interface IbuttonClearHandlerRef {
  clearHandler: () => void;
}

export default function CanvasLayout() {
  const buttonClearHandlerRef = useRef<IbuttonClearHandlerRef | null>(null);

  const buttonClearHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (!buttonClearHandlerRef.current) return;
    buttonClearHandlerRef.current.clearHandler();
  };

  return (
    <div className='canvas-field'>
      <Canvas ref={buttonClearHandlerRef} />
      <button onClick={buttonClearHandler} className='canvas-field__collapse-btn'>
        collapse lines
      </button>
    </div>
  );
}
