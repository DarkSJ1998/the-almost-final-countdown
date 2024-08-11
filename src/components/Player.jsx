import { useRef, useState } from 'react';

export default function Player() {
	const playerNameRef = useRef();
	const [playerName, setPlayerName] = useState('');

	function savePlayerName() {
		setPlayerName(playerNameRef.current.value);
	}

	return (
		<section id='player'>
			<h2>Welcome {playerName ?? 'unknown entity'}</h2>
			<p>
				<input type='text' ref={playerNameRef} />
				<button onClick={savePlayerName}>Set Name</button>
			</p>
		</section>
	);
}
