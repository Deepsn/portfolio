import { onCleanup, onMount } from "solid-js";
import AntIcon from "@/assets/icons/ant.svg?component-solid";

const CELL_SIZE = 12;
const CELL_GAP = 3;
const MAX_PIXEL_RATIO = 2;
const ANT_COUNT = 3;
const STEPS_PER_SECOND = 40;
const MAX_STEPS_PER_FRAME = 10;
const LIFE_GENERATIONS_PER_SECOND = 4;
const MAX_FRAME_DELTA_MS = 100;

const EMPTY = 0;
const LIFE = 1;
const TRAIL = 2;

const BACKGROUND = "#101216";
const CELL_COLORS = [BACKGROUND, "#2f3f8f", "#c9a227"];
const ANT_COLOR = "#ecebe6";

const DX = [0, 1, 0, -1];
const DY = [-1, 0, 1, 0];

interface Ant {
	x: number;
	y: number;
	direction: number;
}

interface Simulation {
	cols: number;
	rows: number;
	cells: Uint8Array;
	ants: Ant[];
}

const wrap = (value: number, size: number) => ((value % size) + size) % size;

export function LangtonAnt() {
	let containerRef!: HTMLDivElement;
	let canvasRef!: HTMLCanvasElement;

	onMount(() => {
		const context = canvasRef.getContext("2d", { alpha: false });
		if (!context) return;

		let sim: Simulation = { cols: 0, rows: 0, cells: new Uint8Array(0), ants: [] };
		let pixelRatio = 1;
		let cellPx = CELL_SIZE;
		let gapPx = CELL_GAP;
		let animationFrame = 0;
		let lastTime = 0;
		let stepBudget = 0;
		let lifeBudget = 0;
		let spareCells = new Uint8Array(0);

		const paintCell = (x: number, y: number, color: string) => {
			context.fillStyle = BACKGROUND;
			context.fillRect(x * cellPx, y * cellPx, cellPx, cellPx);
			if (color === BACKGROUND) return;

			context.fillStyle = color;
			context.fillRect(x * cellPx + gapPx / 2, y * cellPx + gapPx / 2, cellPx - gapPx, cellPx - gapPx);
		};

		const paintCellFromState = (x: number, y: number) => {
			paintCell(x, y, CELL_COLORS[sim.cells[y * sim.cols + x]]);
		};

		const paintAnts = () => {
			for (const ant of sim.ants) paintCell(ant.x, ant.y, ANT_COLOR);
		};

		const paintAll = () => {
			context.fillStyle = BACKGROUND;
			context.fillRect(0, 0, canvasRef.width, canvasRef.height);

			for (let y = 0; y < sim.rows; y += 1) {
				for (let x = 0; x < sim.cols; x += 1) {
					if (sim.cells[y * sim.cols + x] !== EMPTY) paintCellFromState(x, y);
				}
			}

			paintAnts();
		};

		const layout = () => {
			pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
			const nextCellPx = Math.max(1, Math.round(CELL_SIZE * pixelRatio));
			const cols = Math.max(1, Math.ceil((containerRef.clientWidth * pixelRatio) / nextCellPx));
			const rows = Math.max(1, Math.ceil((containerRef.clientHeight * pixelRatio) / nextCellPx));

			if (cols === sim.cols && rows === sim.rows && nextCellPx === cellPx) return;
			cellPx = nextCellPx;
			gapPx = Math.round(CELL_GAP * pixelRatio);

			const cells = new Uint8Array(cols * rows);
			let ants: Ant[];

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

				ants = sim.ants.map((ant) => ({
					x: wrap(ant.x + offsetX, cols),
					y: wrap(ant.y + offsetY, rows),
					direction: ant.direction,
				}));
			} else {
				ants = Array.from({ length: ANT_COUNT }, () => ({
					x: Math.floor(Math.random() * cols),
					y: Math.floor(Math.random() * rows),
					direction: Math.floor(Math.random() * 4),
				}));
			}

			sim = { cols, rows, cells, ants };
			spareCells = new Uint8Array(cols * rows);

			canvasRef.width = cols * cellPx;
			canvasRef.height = rows * cellPx;
			canvasRef.style.width = `${canvasRef.width / pixelRatio}px`;
			canvasRef.style.height = `${canvasRef.height / pixelRatio}px`;

			paintAll();
		};

		const advance = (steps: number) => {
			const { cols, rows, cells } = sim;

			for (const ant of sim.ants) {
				for (let i = 0; i < steps; i += 1) {
					const index = ant.y * cols + ant.x;
					const isFilled = cells[index] !== EMPTY;

					ant.direction = (ant.direction + (isFilled ? 1 : 3)) & 3;
					cells[index] = isFilled ? EMPTY : TRAIL;
					paintCellFromState(ant.x, ant.y);

					ant.x = wrap(ant.x + DX[ant.direction], cols);
					ant.y = wrap(ant.y + DY[ant.direction], rows);
				}
			}
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
						Number(cells[up + left] !== EMPTY) +
						Number(cells[up + x] !== EMPTY) +
						Number(cells[up + right] !== EMPTY) +
						Number(cells[row + left] !== EMPTY) +
						Number(cells[row + right] !== EMPTY) +
						Number(cells[down + left] !== EMPTY) +
						Number(cells[down + x] !== EMPTY) +
						Number(cells[down + right] !== EMPTY);

					const previous = cells[row + x];
					const isAlive = neighbors === 3 || (previous !== EMPTY && neighbors === 2);
					const state = isAlive ? LIFE : EMPTY;
					next[row + x] = state;
					if (state !== previous) paintCell(x, y, CELL_COLORS[state]);
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

			for (const ant of sim.ants) paintCellFromState(ant.x, ant.y);
			advance(steps);
			if (runLife) generate();
			paintAnts();
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
		<>
			<div class="fixed inset-0 z-[-1] overflow-hidden">
				<div class="absolute inset-0 mask-[linear-gradient(to_right,rgb(0_0_0/0.25),black_65%)]" ref={containerRef}>
					<canvas class="block" ref={canvasRef} role="img" />
				</div>
			</div>

			<div class="fixed group right-6 bottom-6 flex h-9 w-9 items-center gap-2 overflow-hidden rounded-full border border-border bg-background/80 px-2 backdrop-blur transition-all duration-300 ease-in-out hover:w-78">
				<span class="flex h-4 w-4 shrink-0 items-center justify-center">
					<AntIcon />
				</span>

				<span class="max-w-0 overflow-hidden whitespace-nowrap text-xs font-mono text-muted-foreground opacity-0 transition-all duration-300 group-hover:max-w-78 group-hover:opacity-100">
					Langton's Ant + Conway's Game of Life
				</span>
			</div>
		</>
	);
}
