import React from 'react';
import * as ReactDOM from 'react-dom';

type Props = {
  children: React.ReactNode
}

class Modal extends React.Component<Props> {

  modalRoot: HTMLElement;
  el: HTMLElement;

  constructor(props: Props) {
    super(props);
    this.modalRoot = document.getElementById('modal-root')!;
    this.el = document.createElement('div');
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Modal;
