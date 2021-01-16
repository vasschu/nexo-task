import './HistoryModal.css';
import { createPortal } from 'react-dom';
import { useCallback, useEffect } from 'react';

const modalElement = document.getElementById('modal-root');

function HistoryModal({ isOpen, setIsOpen, children }) {
	const handleEscape = useCallback((event) => {
		if (event.keyCode === 27) setIsOpen(false);
	});

	useEffect(() => {
		if (isOpen) document.addEventListener('keydown', handleEscape, false);
		return () => {
			document.removeEventListener('keydown', handleEscape, false);
		};
	}, [handleEscape, isOpen]);

	return createPortal(
		isOpen ? (
			<div className={`modal ${isOpen ? 'modal-fade' : ''}`}>
				<div className='modal-overlay' onClick={() => setIsOpen(false)} />
				<span
					role='button'
					className='modal-close'
					aria-label='close'
					onClick={() => setIsOpen(false)}
				>
					X
				</span>
				<div className='modal-body'>{children}</div>
			</div>
		) : null,
		modalElement,
	);
}

export default HistoryModal;
