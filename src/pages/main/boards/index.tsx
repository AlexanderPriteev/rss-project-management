import React, { useEffect, useState } from 'react';
import { Board } from './board';
import { CreateModal } from '../../../companents/modal/create-form';
import { useLocation, useNavigate } from 'react-router-dom';

export const tmpBoard = {
  id: '1234',
  title: 'Project 1 New Project',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum pulvinar tincidunt. Maecenas et ipsum tempor, finibus odio sit amet, maximus tortor. Phasellus malesuada fringilla lacus vel volutpat. Nulla aliquam porta turpis eu bibendum. Praesent erat eros, ultricies vel arcu et, lacinia pharetra tellus.',
  team: [
    'Alexander Priteev',
    'Wade Warren',
    'Cameron Williamson',
    'Jane Cooper',
    'Brooklyn Simmons',
    'Leslie Alexander',
    'Jenny Wilson',
  ],
  date: '2022-11-12',
  pm: 'Alexander Priteev',
  countTasks: '9',
};

export const MainBoards = function () {
  const location = useLocation();
  const router = useNavigate();
  const [createModal, setCreateModal] = useState(location.state);
  useEffect(() => {
    if (location.state) {
      router(location.pathname, {});
    }
  }, [location, router]);

  return (
    <div className="main-boards">
      <div className="headline">
        Boards
        <span className="board-new icon-add" onClick={() => setCreateModal(true)}>
          Create New Board
        </span>
      </div>
      <div className="board-list">
        <Board {...tmpBoard} />
        <Board {...tmpBoard} />
        <Board {...tmpBoard} />
      </div>
      {createModal && <CreateModal type={'Board'} control={setCreateModal} />}
    </div>
  );
};
