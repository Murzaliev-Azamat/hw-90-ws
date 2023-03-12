import React from 'react';
import { motion } from 'framer-motion';
import Backdrop from './Backdrop/Backdrop';

interface ModalProps extends React.PropsWithChildren {
  show: boolean;
  title: string;
  onClose: React.MouseEventHandler;
}

const YoutubeModal: React.FC<ModalProps> = ({ show, title, onClose, children }) => {
  return (
    <div style={{ zIndex: 1 }}>
      <Backdrop show={show} />
      <motion.div
        className="modal show"
        style={{ display: show ? 'block' : 'none' }}
        onClick={onClose}
        animate={{ y: show ? 0 : -200 }}
        transition={{
          default: {
            duration: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          },
        }}
      >
        <div className="modal-dialog  modal-fullscreen-sm-down" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{title}</h1>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default YoutubeModal;
