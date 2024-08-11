import { useState } from 'react';

export default function Player() {
	const [playerName, setPlayerName] = useState('');
	const [submitted, setSubmitted] = useState(false);

	function handleChangePlayerName(event) {
		setSubmitted(false);
		setPlayerName(event?.target?.value);
	}

	function savePlayerName() {
		setSubmitted(true);
	}

	return (
		<section id='player'>
			<h2>Welcome {submitted ? playerName : 'unknown entity'}</h2>
			<p>
				<input
					type='text'
					onChange={handleChangePlayerName}
					value={playerName}
				/>
				<button onClick={savePlayerName}>Set Name</button>
			</p>
		</section>
	);
}
