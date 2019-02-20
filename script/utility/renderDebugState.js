export default function renderDebugState(state) {
	document.querySelector('.debug-window').innerHTML = `<pre>${JSON.stringify(state, null, ' ')}</pre>`;
}
