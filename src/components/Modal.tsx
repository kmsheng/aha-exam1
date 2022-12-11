import React from 'react';
import * as ReactDOM from 'react-dom';

type Props = {
  children: React.ReactNode
}

class Modal extends React.Component<Props> {

  modalRoot: HTMLElement | null;
  el: HTMLElement;

  constructor(props: Props) {
    super(props);
    this.modalRoot = document.getElementById('modal-root');
    this.el = document.createElement('div');
  }

  componentDidMount() {
    if (this.modalRoot) {
      this.modalRoot.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (this.modalRoot) {
      this.modalRoot.removeChild(this.el);
    }
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Modal;
