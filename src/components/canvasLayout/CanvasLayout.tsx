import { Component, MouseEventHandler } from 'react';

import Canvas from './../canvas/Canvas';
import './canvasLayout.scss';

export interface ICanvasLayoutHandlers {
  clearHandler: () => void;
}

class CanvasLayout extends Component {
  handlers: ICanvasLayoutHandlers | null = null;

  setButtonClearHandlerRef = (handler: ICanvasLayoutHandlers) => {
    this.handlers = handler;
  };

  buttonClearHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (!this.handlers) return;
    this.handlers.clearHandler();
  };

  render() {
    return (
      <div className='canvas-field'>
        <div className='canvas-field__canvas-container'>
          <Canvas setClearHandler={this.setButtonClearHandlerRef} />
          <button onClick={this.buttonClearHandler} className='canvas-field__collapse-btn'>
            collapse lines
          </button>
        </div>
      </div>
    );
  }
}

export default CanvasLayout;
