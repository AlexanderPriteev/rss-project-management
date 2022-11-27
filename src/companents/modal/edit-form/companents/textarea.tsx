import React, { useState } from 'react';

interface ITextarea {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

export const TaskTextarea = function (props: ITextarea) {
  const [desc, setDesc] = useState(props.description);
  const [newDesc, setNewDesc] = useState(props.description);
  const [read, setRead] = useState(true);
  const updateValue = () => {
    setRead(!read);
    setDesc(newDesc);
  };

  const clearValue = () => {
    setRead(!read);
    setNewDesc(desc);
  };

  return (
    <div className="edit-modal__desc">
      <textarea
        className="edit-modal__desc-field"
        value={newDesc}
        readOnly={read}
        onChange={(e) => setNewDesc(e.target.value)}
      />
      <div className="edit-modal__desc-icons">
        {read ? (
          <i className="edit-modal__desc-icon icon-pen" onClick={() => setRead(!read)} />
        ) : (
          <>
            <i className="edit-modal__desc-icon icon-check c-green" onClick={updateValue} />
            <i className="edit-modal__desc-icon icon-close c-red" onClick={clearValue} />
          </>
        )}
      </div>
    </div>
  );
};
