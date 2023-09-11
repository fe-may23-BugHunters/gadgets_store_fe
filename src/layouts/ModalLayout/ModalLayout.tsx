import React from 'react';
import './ModalLayout.scss';
import { NavLink } from 'react-router-dom';
import { WideBtn } from '../../components/WideBtn';
import CloseImgfrom from '../../assets/icons/Close.svg';

interface Props {
  title: string,
  icon: string,
  btnPath?: string,
  btnTitle?: string,
  handleClick: () => void,
  closeModal: () => void,
}

export const ModalLayout: React.FC<Props> = ({
  title,
  icon,
  btnPath = '/',
  btnTitle = 'Back to Store',
  handleClick,
  closeModal,
}) => {
  const modalBlockRef = React.useRef<HTMLDivElement | null>(null);
  const modalContentRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleModalClose = (e: MouseEvent) => {
      if (!modalBlockRef.current?.contains(e.target as Node)) {
        return;
      }

      if (!modalContentRef.current?.contains(e.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener('click', handleModalClose);

    return () => {
      document.removeEventListener('click', handleModalClose);
    };
  }, [title]);

  return (
    <div className="modal" ref={modalBlockRef}>
      <div className="modal__content" ref={modalContentRef}>
        <button
          className="modal__closeBtn"
          onClick={closeModal}
        >
          <img
            className="modal__closeBtn-img"
            src={CloseImgfrom}
            alt="Close modal"
          />
        </button>
        <h2 className="modal__title">{title}</h2>

        <div className="modal__icon">
          <img
            className="modal__img"
            src={icon}
            alt="icon"
          />
        </div>

        <NavLink
          to={btnPath}
          className="modal__backBtn"
          onClick={handleClick}
        >
          <WideBtn mainTitle={btnTitle} />
        </NavLink>
      </div>
    </div>
  );
};
