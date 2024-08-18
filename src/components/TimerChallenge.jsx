import { useRef, useState } from 'react';

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

	const [timerStarted, setTimerStarted] = useState(false);
	const [timerExpired, setTimerExpired] = useState(false);

	function handleStart() {
		timer.current = setTimeout(() => {
			setTimerExpired(true);
		}, targetTime * 1000);

		setTimerStarted(true);
	}

	function handleStop() {
		clearTimeout(timer.current);
	}

	return (
		<section className='challenge'>
			<h2>{title}</h2>
			{timerExpired && <p>You lost!</p>}
			<p className='challenge-time'>
				{targetTime} second{targetTime > 1 ? 's' : null}
			</p>
			<p>
				<button onClick={timerStarted ? handleStop : handleStart}>
					{timerStarted ? 'Stop' : 'Start'} Challenge
				</button>
			</p>
			<p className={timerStarted ? 'active' : undefined}>
				{timerStarted ? 'Time is running...' : 'Timer inactive'}
			</p>
		</section>
	);
}
