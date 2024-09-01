import { useRef, useState } from 'react';

import ResultModal from './ResultModal';

/**
 * This doesn't work since it's shared by all the `TimerChallenge`
 * component instances, so the previous values are always overwritten.
 */
// let timer;

export default function TimerChallenge({ title, targetTime }) {
	/**
	 * This doesn't work since it's re-initialized on every render,
	 * hence the value is lost.
	 */
	// let timer;

	/**
	 * This value persists the render cycle and is specific to each
	 * instance of `TimerChallenge` component.
	 */
	const timer = useRef();

	/**
	 * This ref is used to access the dialog element inside the
	 * `ResultModal`.
	 */
	const dialogRef = useRef();

	/**
	 * We will store the remaining time for a challenge (in ms)
	 * and we can derive the other needed information using
	 * this state variable (such as `isTimerActive` variable).
	 */
	const [remainingTime, setRemainingTime] = useState(targetTime * 1000);

	const isTimerActive =
		remainingTime > 0 && remainingTime < targetTime * 1000;

	/**
	 * If the remaining time is <= 0, it means the challenge
	 * was lost. So, we have to show the result and kill the
	 * timer. Also, we need to reset the remainingTime to the
	 * original timer for the challenge.
	 */
	if (remainingTime <= 0) {
		dialogRef.current.open();
		clearInterval(timer.current);
	}

	function handleTimerReset() {
		setRemainingTime(targetTime * 1000);
	}

	function handleStart() {
		timer.current = setInterval(() => {
			// Updating the state variable and deducting 50ms
			setRemainingTime((prevRemainingTime) => prevRemainingTime - 50);
		}, 50);
	}

	function handleStop() {
		dialogRef.current.open();
		clearInterval(timer.current);
	}

	return (
		<>
			<ResultModal
				remainingTime={remainingTime}
				targetTime={targetTime}
				onTimerReset={handleTimerReset}
				ref={dialogRef}
			/>

			<section className='challenge'>
				<h2>{title}</h2>

				{remainingTime <= 0 && <p>You lost!</p>}
				<p className='challenge-time'>
					{targetTime} second{targetTime > 1 ? 's' : null}
				</p>
				<p>
					<button onClick={isTimerActive ? handleStop : handleStart}>
						{isTimerActive ? 'Stop' : 'Start'} Challenge
					</button>
				</p>
				<p className={isTimerActive ? 'active' : undefined}>
					{isTimerActive ? 'Time is running...' : 'Timer inactive'}
				</p>
			</section>
		</>
	);
}
