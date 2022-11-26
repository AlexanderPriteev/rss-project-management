import React from 'react';

//TODO
interface IMainCard {
  id: string;
  title: string;
  status: string;
  description: string;
  projectId: string;
  projectName: string;
}

export const MainCard = function (card: IMainCard) {
  const [taskId, title, status, description, projectId, projectName] = Object.values(card);
  return (
    <div className="main-card" id={taskId}>
      <div className="main-card__headline">
        <h4 className="main-card-title">{title}</h4>
        <span className="main-card-status">
          <span className="bold">status:</span> {status}
        </span>
      </div>
      <p className="main-card-about">{description}</p>
      <span className="main-card-link icon-next-arrow">
        <span className="main-card-link-wrapper" id={projectId}>
          Go to <span className="main-card-link__name">{projectName}</span> board
        </span>
      </span>
    </div>
  );
};
