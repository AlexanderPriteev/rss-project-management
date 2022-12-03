import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IMember } from './add-member';
import { getMemberSet } from '../../../methods/get-member';

interface ISelectMember {
  setList: React.Dispatch<React.SetStateAction<IMember[]>>;
  membersId: string[];
  membersName: string[];
}

export const SelectMember = function (props: ISelectMember) {
  const { t } = useTranslation();

  const [membersSet, setMembersSet] = useState(getMemberSet(props.membersId, props.membersName));
  const [members, setMembers] = useState([] as IMember[]);
  const [current, setCurrent] = useState(props.membersId[0]);
  const [alertError, setAlertError] = useState('');

  const add = () => {
    const currentMember = membersSet.find((e) => e.id === current) as IMember;
    const memberList = [...members, currentMember];
    setMembers([...memberList]);
    props.setList([...memberList]);
    const newMembersSet = [...membersSet.filter((e) => e.id !== current)];
    setMembersSet([...newMembersSet]);
    if (newMembersSet.length) {
      setCurrent(newMembersSet[0].id);
    }
  };

  const remove = (member: IMember) => {
    const removeMember = [...members.filter((e) => e.id !== member.id)];
    setMembers([...removeMember]);
    props.setList([...removeMember]);
    setMembersSet([...membersSet, member]);
  };

  return (
    <>
      {!!props.membersId && (
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
                <button className="edit-modal-btn icon-delete c-red" onClick={() => remove(e)}>
                  {t('newMember:remove')}
                </button>
              </div>
            ))}
            {!!membersSet.length && (
              <div className="modal-add-member">
                <div className="modal-add-field-wrapper">
                  <select className="modal-select" onChange={(e) => setCurrent(e.target.value)}>
                    {membersSet.map((e) => (
                      <option value={e.id} key={e.id}>
                        {e.login}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="edit-modal-btn icon-add" onClick={add}>
                  {t('newMember:add')}
                </button>
              </div>
            )}
          </div>
          {alertError && (
            <span className="alert">
              <span className="alert__about">{alertError}</span>
              <i className="alert__close icon-close" onClick={() => setAlertError('')} />
            </span>
          )}
        </div>
      )}
    </>
  );
};
