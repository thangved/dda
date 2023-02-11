const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const allInputs = document.querySelectorAll("input");
const startButton = document.getElementById("start-btn");

const padding = 50;

const pWidth = 20;
const pHeight = 20;

const rows = 25;
const columns = 25;

const poss = {
	px1: 4,
	py1: 5,
	px2: 18,
	py2: 15,
};

function initCanvas() {
	context.fillStyle = "#fff";
	context.beginPath();
	context.rect(
		0,
		0,
		columns * pWidth + padding * 2,
		rows * pHeight + padding * 2
	);
	context.fill();
}

function putPixel(px, py, color = "white") {
	context.fillStyle = color;
	context.strokeStyle = "#aaa";
	context.beginPath();
	context.rect(
		padding + px * pWidth,
		padding + py * pHeight,
		pWidth,
		pHeight
	);
	context.stroke();
	context.fill();
}

function drawRealLine() {
	context.strokeStyle = "#000";
	context.beginPath();
	context.moveTo(padding + poss.px1 * pWidth, padding + poss.py1 * pWidth);
	context.lineTo(padding + poss.px2 * pWidth, padding + poss.py2 * pHeight);
	context.stroke();
}

function initGrid() {
	initCanvas();
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			putPixel(i, j);
		}
	}
}

const wait = (timeout) =>
	new Promise((resolve) =>
		setTimeout(() => {
			resolve();
		}, timeout)
	);

async function drawWidthLine(px1, px2) {
	context.strokeStyle = "red";
	for (let i = px1; i < px2; i++) {
		context.beginPath();
		context.moveTo(padding + i * pWidth, padding / 2);
		context.lineTo(padding + (i + 1) * pWidth, padding / 2);
		context.stroke();

		await wait(20);
	}

	const cpx = ((px1 + px2) * pWidth) / 2 + padding;
	const cpy = padding / 4;

	context.fillStyle = "red";

	context.fillText(Math.abs(px1 - px2), cpx, cpy);
}

async function drawHeightLine(py1, py2) {
	context.strokeStyle = "red";
	for (let i = py1; i < py2; i++) {
		context.beginPath();
		context.moveTo(padding / 2, padding + i * pWidth);
		context.lineTo(padding / 2, padding + (i + 1) * pWidth);
		context.stroke();

		await wait(20);
	}

	const cpy = ((py1 + py2) * pWidth) / 2 + padding;
	const cpx = padding / 4;

	context.fillStyle = "red";

	context.fillText(Math.abs(py1 - py2), cpx, cpy);
}

async function start() {
	initGrid();
	drawRealLine();

	for (let i = poss.px1; i < poss.px2; i++) {
		for (let j = poss.py1; j < poss.py2; j++) {
			putPixel(i, j, "yellow");
		}
		await wait(10);
		drawRealLine();
	}

	await drawWidthLine(poss.px1, poss.px2);
	await drawHeightLine(poss.py1, poss.py2);

	const dxInc = Math.abs(poss.px1 - poss.px2);

	document.getElementById("dx-inc").innerText = dxInc;

	await wait(100);

	const dyInc = Math.abs(poss.py1 - poss.py2);

	document.getElementById("dy-inc").innerText = dyInc;

	await wait(100);

	const maxSteps = Math.max(dxInc, dyInc);

	document.getElementById("max-steps").innerText = maxSteps;
	await wait(10);
}

initGrid();
drawRealLine();

allInputs.forEach((input) => {
	input.addEventListener("change", (event) => {
		poss[event.target.name] = parseInt(event.target.value);
		initGrid();
		drawRealLine();
	});
});

startButton.addEventListener("click", start);
