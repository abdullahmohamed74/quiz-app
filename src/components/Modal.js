import useGlobalContext from '../hooks/useGlobalContext';

function Modal() {
  const { isModalOpen, closeModal, correct, questions } = useGlobalContext();

  return (
    <div className={isModalOpen ? 'modal-container isOpen' : 'modal-container'}>
      <div className="modal-content">
        <h2>congrats</h2>
        <p>
          you answered {((correct / questions.length) * 100).toFixed(0)}% of
          quesions correctly
        </p>
        <button onClick={closeModal} className="close-btn">
          play again
        </button>
      </div>
    </div>
  );
}
export default Modal;
