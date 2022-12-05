import React, { useEffect, useState } from 'react';
import { LineInput } from '../../../line-input';
import { TaskMember } from '../companents/member';
import { AddMember, IMember } from '../../companents/add-member';
import { RemoveModal } from '../../remove-form';
import { useTranslation } from 'react-i18next';
import { IBoard } from '../../../../pages/main/boards/board';
import { useDispatch, useSelector } from 'react-redux';
import { reduxBoards, StateReduxInterface } from '../../../../state';
import { AlertModal } from '../../../alert';
import { updateBoard } from '../../../../api/requests';

interface IEditModal {
  card: IBoard;
  control: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditModalBoard = function (props: IEditModal) {
  const token = localStorage.getItem('token') as string;
  const data = useSelector((state: StateReduxInterface) => state);
  const dispatch = useDispatch();

  const card = { ...props.card };
  const [title, setTitle] = useState(
    card.title
      .split(' - ')
      .filter((e, i) => i)
      .join(' - ')
  );

  const [members, setMembers] = useState(card.usersName || []);
  const [membersID, setMembersID] = useState(card.users);
  const [remove, setRemove] = useState('');
  const [addMember, setAddMember] = useState(false);
  const [newMembers, setNewMembers] = useState([] as IMember[]);
  const [removeModal, setRemoveModal] = useState(false);
  const [alertError, setAlertError] = useState('');
  const [preloader, setPreloader] = useState('');

  const { t } = useTranslation();

  const body = document.body.classList;
  if (!body.contains('ov-hidden')) body.add('ov-hidden');
  const close = () => {
    document.body.classList.remove('ov-hidden');
    props.control(false);
  };

  useEffect(() => {
    if (remove) {
      const removePosition = membersID.indexOf(remove);
      setMembers(members.filter((e, i) => i !== removePosition));
      setMembersID(membersID.filter((e) => e !== remove));
      setRemove('');
    }
  }, [members, membersID, remove]);

  const update = async () => {
    const updatedCart = {
      ...card,
      users: membersID.concat(newMembers.map((e) => e.id)),
      usersName: members.concat(newMembers.map((e) => e.name || e.login)),
      title: `${card.title.split(' - ')[0]} - ${title}`,
    };
    dispatch(reduxBoards(data.boards.map((e) => (e._id === updatedCart._id ? updatedCart : e))));

    try {
      setPreloader(' spinner-btn spinner-btn--dark');
      await updateBoard(
        token,
        updatedCart._id,
        updatedCart.title,
        updatedCart.owner,
        updatedCart.users
      );
    } catch (e) {
      setAlertError(t('edit:alert') as string);
      setTimeout(() => setAlertError(''), 3000);
    }
    setPreloader('');
    close();
  };

  return (
    <div className="modal-wrapper" onClick={close}>
      {!removeModal && (
        <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
          <LineInput
            hasIcons={true}
            isReadOnly={true}
            defValue={title}
            setValue={setTitle}
            wrapperStyles={'edit-modal__title'}
          />

          <div className="edit-modal__members">
            <div className="edit-modal__member-list">
              {membersID.map((e, i) => (
                <TaskMember
                  member={members[i]}
                  userId={card.owner}
                  id={e}
                  setRemove={setRemove}
                  key={e}
                />
              ))}
            </div>

            {!addMember && (
              <span className="edit-modal-btn icon-add" onClick={() => setAddMember(true)}>
                {t('edit:add')}
              </span>
            )}
          </div>
          {addMember && <AddMember setList={setNewMembers} membersId={membersID} />}

          <div className="edit-modal__controls">
            <button className={`edit-modal-btn icon-check${preloader}`} onClick={() => update()}>
              {t('edit:update')}
            </button>
            <button
              className="edit-modal-btn icon-delete c-red"
              onClick={() => setRemoveModal(true)}
            >
              {t('edit:remove')}
            </button>
          </div>
        </div>
      )}
      {removeModal && (
        <RemoveModal name={title} id={card._id} type={'Board'} control={props.control} />
      )}
      {alertError && <AlertModal title={alertError} setTitle={setAlertError} />}
    </div>
  );
};
