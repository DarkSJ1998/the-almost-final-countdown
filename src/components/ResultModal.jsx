import { forwardRef, useImperativeHandle, useRef } from 'react';

const ResultModal = forwardRef(function (
	{ remainingTime, targetTime, onTimerReset },
	forwardedRef
) {
	const localDialogRef = useRef();

	/**
	 * We can derive if the user lost the game or not based
	 * on the `remainingTime` state variable.
	 */
	const userLost = remainingTime <= 0;

	/**
	 * We need to convert the time back to seconds (from ms)
	 * and we can also format it a little bit.
	 */
	const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

	useImperativeHandle(forwardedRef, () => {
		return {
			open() {
				localDialogRef.current.showModal();
			},
		};
	});

	return (
		<dialog ref={localDialogRef} className='result-modal'>
			{userLost && <h2>You lost</h2>}
			<p>
				The target time was <strong>{targetTime}</strong> seconds.
			</p>
			<p>
				You stopped the timer with{' '}
				<strong>{formattedRemainingTime} seconds left.</strong>
			</p>
			<form method='dialog' onSubmit={onTimerReset}>
				<button>Close</button>
			</form>
		</dialog>
	);
});

export default ResultModal;
