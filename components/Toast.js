import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Toast({ message, state }) {
  const [showToast, setShowToast] = useState(true); // Estado para controlar a exibição do toast
  const [msgColor, setMsgColor] = useState('red')

  useEffect(() => {
    if(state){
      setMsgColor('green')
    }
  }, [state])

  const handleClose = () => {
    setShowToast(false); // Atualiza o estado para ocultar o toast
  };

  return (
    message && (
      showToast && (
        <div className="toast align-items-center text-bg-primary border-0" style={{
          display: 'block',
          position: 'fixed',
          top: '0',
          right: '0',
          zIndex: '100'
          }} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex" style={{
            backgroundColor: msgColor
          }}>
            <div className="toast-body">
              {message}
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={handleClose} // Usa o onClick para fechar o toast
              aria-label="Close"
            ></button>
          </div>
        </div>
      )
    )
  );
}
