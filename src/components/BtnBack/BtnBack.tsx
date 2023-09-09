import React from 'react';
import './BtnBack.scss';
import { ReactComponent as ArrowLeft } from '../../assets/icons/backBtn.svg';
import { useNavigate } from 'react-router-dom';

export const BtnBack: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button className="btnBack" onClick={() => navigate(-1)}>
      <ArrowLeft className="btnBack__img" id="arrowBackBtn" />
      Back
    </button>
  );
};
