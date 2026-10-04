import { onCleanup, onMount } from "solid-js";

const CELL_SIZE = 4;
const MAX_PIXEL_RATIO = 2;
const STEPS_PER_SECOND = 2000;
const MAX_STEPS_PER_FRAME = 500;
const LIFE_GENERATIONS_PER_SECOND = 8;
const MAX_FRAME_DELTA_MS = 100;

const COLORS = {
	empty: "#000000",
	filled: "#facc15",
	ant: "#f8fafc",
};

const DX = [0, 1, 0, -1];
const DY = [-1, 0, 1, 0];

interface Simulation {
	cols: number;
	rows: number;
	cells: Uint8Array;
	antX: number;
	antY: number;
	direction: number;
}

export function LangtonAnt() {
	let containerRef!: HTMLDivElement;
	let canvasRef!: HTMLCanvasElement;

	onMount(() => {
		const context = canvasRef.getContext("2d", { alpha: false });
		if (!context) return;

		let sim: Simulation = { cols: 0, rows: 0, cells: new Uint8Array(0), antX: 0, antY: 0, direction: 0 };
		let pixelRatio = 1;
		let cellPx = CELL_SIZE;
		let animationFrame = 0;
		let lastTime = 0;
		let stepBudget = 0;
		let lifeBudget = 0;
		let spareCells = new Uint8Array(0);

		const paintCell = (x: number, y: number, color: string) => {
			context.fillStyle = color;
			context.fillRect(x * cellPx, y * cellPx, cellPx, cellPx);
		};

		const paintCellFromState = (x: number, y: number) => {
			paintCell(x, y, sim.cells[y * sim.cols + x] === 1 ? COLORS.filled : COLORS.empty);
		};

		const paintAll = () => {
			context.fillStyle = COLORS.empty;
			context.fillRect(0, 0, canvasRef.width, canvasRef.height);

			context.fillStyle = COLORS.filled;
			for (let y = 0; y < sim.rows; y += 1) {
				for (let x = 0; x < sim.cols; x += 1) {
					if (sim.cells[y * sim.cols + x] === 1) {
						context.fillRect(x * cellPx, y * cellPx, cellPx, cellPx);
					}
				}
			}

			paintCell(sim.antX, sim.antY, COLORS.ant);
		};

		const layout = () => {
			pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
			const nextCellPx = Math.max(1, Math.round(CELL_SIZE * pixelRatio));
			const cols = Math.max(1, Math.ceil((containerRef.clientWidth * pixelRatio) / nextCellPx));
			const rows = Math.max(1, Math.ceil((containerRef.clientHeight * pixelRatio) / nextCellPx));

			if (cols === sim.cols && rows === sim.rows && nextCellPx === cellPx) return;
			cellPx = nextCellPx;

			const cells = new Uint8Array(cols * rows);
			let antX = Math.floor(cols / 2);
			let antY = Math.floor(rows / 2);
			let direction = sim.direction;

			if (sim.cols > 0) {
				const offsetX = Math.floor((cols - sim.cols) / 2);
				const offsetY = Math.floor((rows - sim.rows) / 2);

				for (let y = 0; y < sim.rows; y += 1) {
					const nextY = y + offsetY;
					if (nextY < 0 || nextY >= rows) continue;
					for (let x = 0; x < sim.cols; x += 1) {
						const nextX = x + offsetX;
						if (nextX < 0 || nextX >= cols) continue;
						cells[nextY * cols + nextX] = sim.cells[y * sim.cols + x];
					}
				}

				const movedX = sim.antX + offsetX;
				const movedY = sim.antY + offsetY;
				if (movedX >= 0 && movedX < cols && movedY >= 0 && movedY < rows) {
					antX = movedX;
					antY = movedY;
				}
			} else {
				direction = 0;
			}

			sim = { cols, rows, cells, antX, antY, direction };
			spareCells = new Uint8Array(cols * rows);

			canvasRef.width = cols * cellPx;
			canvasRef.height = rows * cellPx;
			canvasRef.style.width = `${canvasRef.width / pixelRatio}px`;
			canvasRef.style.height = `${canvasRef.height / pixelRatio}px`;

			paintAll();
		};

		const advance = (steps: number) => {
			const { cols, rows, cells } = sim;
			let { antX, antY, direction } = sim;

			for (let i = 0; i < steps; i += 1) {
				const index = antY * cols + antX;
				const isFilled = cells[index] === 1;

				direction = (direction + (isFilled ? 1 : 3)) & 3;
				cells[index] = isFilled ? 0 : 1;
				paintCell(antX, antY, isFilled ? COLORS.empty : COLORS.filled);

				antX = (antX + DX[direction] + cols) % cols;
				antY = (antY + DY[direction] + rows) % rows;
			}

			sim.antX = antX;
			sim.antY = antY;
			sim.direction = direction;
		};

		const generate = () => {
			const { cols, rows, cells } = sim;
			const next = spareCells;

			for (let y = 0; y < rows; y += 1) {
				const up = ((y + rows - 1) % rows) * cols;
				const row = y * cols;
				const down = ((y + 1) % rows) * cols;

				for (let x = 0; x < cols; x += 1) {
					const left = x === 0 ? cols - 1 : x - 1;
					const right = x === cols - 1 ? 0 : x + 1;
					const neighbors =
						cells[up + left] +
						cells[up + x] +
						cells[up + right] +
						cells[row + left] +
						cells[row + right] +
						cells[down + left] +
						cells[down + x] +
						cells[down + right];

					const wasAlive = cells[row + x];
					const isAlive = neighbors === 3 || (wasAlive === 1 && neighbors === 2) ? 1 : 0;
					next[row + x] = isAlive;
					if (isAlive !== wasAlive) paintCell(x, y, isAlive === 1 ? COLORS.filled : COLORS.empty);
				}
			}

			sim.cells = next;
			spareCells = cells as Uint8Array<ArrayBuffer>;
		};

		const frame = (time: number) => {
			animationFrame = requestAnimationFrame(frame);

			const delta = Math.min(time - lastTime, MAX_FRAME_DELTA_MS);
			lastTime = time;
			stepBudget += (delta * STEPS_PER_SECOND) / 1000;
			lifeBudget += (delta * LIFE_GENERATIONS_PER_SECOND) / 1000;

			const steps = Math.min(Math.floor(stepBudget), MAX_STEPS_PER_FRAME);
			stepBudget -= steps;

			const runLife = lifeBudget >= 1;
			if (runLife) lifeBudget = Math.min(lifeBudget - 1, 1);
			if (steps === 0 && !runLife) return;

			paintCellFromState(sim.antX, sim.antY);
			advance(steps);
			if (runLife) generate();
			paintCell(sim.antX, sim.antY, COLORS.ant);
		};

		layout();

		const observer = new ResizeObserver(layout);
		observer.observe(containerRef);

		lastTime = performance.now();
		animationFrame = requestAnimationFrame(frame);

		onCleanup(() => {
			cancelAnimationFrame(animationFrame);
			observer.disconnect();
		});
	});

	return (
		<div class="opacity-20 fixed inset-0 -z-10 overflow-hidden" ref={containerRef}>
			<canvas aria-label="Langton's ant simulation" class="block" ref={canvasRef} role="img" />
			<p class="text-white bottom-0 left-0 absolute">langton's ant + game of life</p>
		</div>
	);
}
