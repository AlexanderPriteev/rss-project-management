import React, { useState } from 'react';

interface IStringKey {
  str: string;
  key: string;
}

export const AddMember = function () {
  const [members, setMembers] = useState([] as IStringKey[]);
  const [current, setCurrent] = useState('');

  const add = () => {
    const value = {
      str: current,
      key: `${new Date().getTime()}`,
    };
    setMembers([...members, value]);
    setCurrent('');
  };

  const remove = (id: string) => {
    setMembers([...members.filter((e) => e.key !== id)]);
  };

  return (
    <div className="modal-add">
      <span className="modal-add-title">Add Member:</span>
      <div className="modal-add-members">
        {members.map((e) => (
          <div key={e.key} id={e.key} className="modal-add-member">
            <div className="modal-add-field-wrapper">
              <input
                type="text"
                className="modal-add-field"
                defaultValue={e.str}
                placeholder="Type Name"
              />
            </div>
            <button className="edit-modal-btn icon-delete c-red" onClick={() => remove(e.key)}>
              remove
            </button>
          </div>
        ))}

        <div className="modal-add-member">
          <div className="modal-add-field-wrapper">
            <input
              type="text"
              className="modal-add-field"
              placeholder="Type Name"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
            />
          </div>
          <button className="edit-modal-btn icon-add" onClick={add}>
            add
          </button>
        </div>
      </div>
    </div>
  );
};
