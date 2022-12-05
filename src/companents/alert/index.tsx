import React from 'react';

interface IAlert {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  bgColor?: string;
}

export const AlertModal = function (props: IAlert) {
  return (
    <span className={`alert ${props.bgColor || ''}`}>
      <span className="alert__about">{props.title}</span>
      <i className="alert__close icon-close" onClick={() => props.setTitle('')} />
    </span>
  );
};
