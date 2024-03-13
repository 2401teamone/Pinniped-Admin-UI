export default function DeleteBtn({ action }) {
  return (
    <button onClick={action} className="delete-btn">
      <i className="fa-regular fa-minus"></i>
    </button>
  );
}
