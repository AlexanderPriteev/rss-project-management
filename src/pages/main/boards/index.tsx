import React, { useEffect, useState } from 'react';
import { Board } from './board';
import { CreateModal } from '../../../companents/modal/create-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { StateReduxInterface } from '../../../state';

export const MainBoards = function () {
  const { t } = useTranslation();
  const data = useSelector((state: StateReduxInterface) => state);

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
        {t('main:title')}
        <span className="board-new icon-add" onClick={() => setCreateModal(true)}>
          {t('main:create')}
        </span>
      </div>
      <div className="board-list">
        {data.boards.map((e) => (
          <Board {...e} key={e._id} />
        ))}
      </div>
      {createModal && <CreateModal type={'Board'} control={setCreateModal} />}
    </div>
  );
};
