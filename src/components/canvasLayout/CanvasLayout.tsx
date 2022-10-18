import { FC, MouseEventHandler, useRef } from 'react';

import Canvas from './../canvas/Canvas';
import './canvasLayout.scss';

export interface IbuttonClearHandlerRef {
  clearHandler: () => void;
}

const CanvasLayout: FC = () => {
  const buttonClearHandlerRef = useRef<IbuttonClearHandlerRef | null>(null);

  const buttonClearHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (!buttonClearHandlerRef.current) return;
    buttonClearHandlerRef.current.clearHandler();
  };

  return (
    <div className='canvas-field'>
      <div className='canvas-field__canvas-container'>
        <Canvas ref={buttonClearHandlerRef} />
        <button onClick={buttonClearHandler} className='canvas-field__collapse-btn'>
          collapse lines
        </button>
      </div>
    </div>
  );
}

export default CanvasLayout;
