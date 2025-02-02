/* eslint-disable */
async function pluginInit(page) {
	await page.evaluateOnNewDocument(() => {

		if (window !== window.parent) return;

		window.addEventListener('DOMContentLoaded', () => {

			const box = document.createElement('face-was-here');
			const element = document.createElement('style');

            element.innerHTML = `
              face-was-here {
                pointer-events: none;
                position: absolute;
                top: 0;
                z-index: 10000;
                left: 0;
                width: 20px;
                height: 20px;
                background: rgb(255 0 0);
                border: 1px solid white;
                border-radius: 10px;
                margin: -10px 0 0 -10px;
                padding: 0;
                transition: background .2s, border-radius .2s, border-color .2s;
            }
            face-was-here.i-1 {
                transition: none;
                background: rgba(0,0,0,0.9);
            }
            face-was-here.i-2 {
                transition: none;
                border-color: rgba(0,0,255,0.9);
            }
            face-was-here.i-3 {
                transition: none;
                border-radius: 4px;
            }
            face-was-here.i-4 {
                transition: none;
                border-color: rgba(255,0,0,0.9);
            }
            face-was-here.i-5 {
                transition: none;
                border-color: rgba(0,255,0,0.9);
            }
            `;

			document.head.appendChild(element);
			document.body.appendChild(box);

			/** HANDLE EVENTS */

			document.addEventListener('mousemove', event => {
				box.style.left = event.pageX + 'px';
				box.style.top = event.pageY + 'px';
				update(event.buttons);
			}, true);

			document.addEventListener('mousedown', event => {
				update(event.buttons);
				box.classList.add('i-' + event.which);
			}, true);

			document.addEventListener('mouseup', event => {
				update(event.buttons);
				box.classList.remove('i-' + event.which);
			}, true);

			function update(buttons) {
				for (let i = 0; i < 5; i++) {
					/** TOGGLE CERTAIN PARTS OF THE INSERTED MOUSE */
					box.classList.toggle('i-' + i, buttons & (1 << i));
				}
			}
		}, false);
	});
}

module.exports = pluginInit;