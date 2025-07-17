export const DeleteProduct = ({
  show,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  children = "Are you sure you want to delete this item?",
}: {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={`modal fade ${show ? "show d-block" : ""}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};