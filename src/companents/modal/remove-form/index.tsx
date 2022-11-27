import React from 'react';

interface IRemoveModal {
  name: string;
}

export const RemoveModal = function (props: IRemoveModal) {
  return (
    <div className="remove-modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-body">
        <h2 className="remove-modal-title">Are you absolutely sure?</h2>
        <p className="remove-modal-subtitle">
          This action cannot be undone. This will permanently delete the {props.name}
        </p>
        <p className="remove-modal-about">
          Please type <span className="bold">{props.name}</span> to confirm.
        </p>
        <input type="text" className="remove-modal-field" placeholder="Type" />
      </div>
      <div className="modal-footer">
        <button className="modal-btn bg-red">Remove Project</button>
      </div>
    </div>
  );
};
