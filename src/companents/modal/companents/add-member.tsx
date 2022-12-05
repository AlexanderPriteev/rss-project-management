import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { StateReduxInterface } from '../../../state';
import { getUsers, IUser } from '../../../api/requests';

export interface IMember {
  id: string;
  login: string;
  name?: string;
}

interface IAddMember {
  setList: React.Dispatch<React.SetStateAction<IMember[]>>;
  membersId?: string[];
}

export const AddMember = function (props: IAddMember) {
  const token = localStorage.getItem('token') as string;
  const user = useSelector((state: StateReduxInterface) => state.user);
  const { t } = useTranslation();

  const [members, setMembers] = useState([] as IMember[]);
  const [current, setCurrent] = useState('');
  const [usersList, setUserList] = useState([] as IUser[]);

  const [alertError, setAlertError] = useState('');
  const [preloader, setPreloader] = useState('');

  const add = async () => {
    if (user.login === current) {
      setAlertError(t('newMember:alert:you') as string);
    } else if (!!members.find((e) => e.login === current)) {
      setAlertError(t('newMember:alert:added') as string);
    } else {
      try {
        setPreloader(' spinner-btn spinner-btn--dark');
        let users = [...usersList];
        if (!usersList.length) {
          users = await getUsers(token);
          setUserList(users);
        }
        const currentUser = users.find((e) => e.login === current);
        if (!currentUser) {
          setAlertError(t('newMember:alert:none') as string);
        } else if (props.membersId?.includes(currentUser._id as string)) {
          setAlertError(t('newMember:alert:member') as string);
        } else {
          const value = {
            id: currentUser._id as string,
            login: currentUser.login,
            name: currentUser.name,
          };
          const newUsers = [...members, value];
          setMembers(newUsers);
          props.setList(newUsers);
          setCurrent('');
        }
      } catch {
        setAlertError(t('newMember:alert:error') as string);
      }
      setPreloader('');
    }

    setTimeout(() => setAlertError(''), 3000);
  };

  const remove = (id: string) => {
    const removeMember = [...members.filter((e) => e.id !== id)];
    setMembers(removeMember);
    props.setList(removeMember);
  };

  return (
    <div className="modal-add">
      <span className="modal-add-title">{t('newMember:title')}</span>
      <div className="modal-add-members">
        {members.map((e) => (
          <div key={e.id} id={e.id} className="modal-add-member">
            <div className="modal-add-field-wrapper">
              <input
                type="text"
                className="modal-add-field"
                defaultValue={e.login}
                readOnly={true}
              />
            </div>
            <button className="edit-modal-btn icon-delete c-red" onClick={() => remove(e.id)}>
              {t('newMember:remove')}
            </button>
          </div>
        ))}

        <div className="modal-add-member">
          <div className="modal-add-field-wrapper">
            <input
              type="text"
              className="modal-add-field"
              placeholder={t('newMember:placeholder') as string}
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
            />
          </div>
          <button className={`edit-modal-btn icon-add${preloader}`} onClick={add}>
            {t('newMember:add')}
          </button>
        </div>
      </div>
      {alertError && (
        <span className="alert">
          <span className="alert__about">{alertError}</span>
          <i className="alert__close icon-close" onClick={() => setAlertError('')} />
        </span>
      )}
    </div>
  );
};
