<script lang="ts">
	import { onMount } from "svelte";

	const fps = 8;
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let screenWidth = 0;
	let screenHeight = 0;
	let resolution = 10;
	let columns = 0;
	let rows = 0;
	let pixelRatio = 0;
	let gameIntervalId: number;
	let gameGrid: Array<Array<number>>;

	function handleResize() {
		screenWidth = window.innerWidth;
		screenHeight = window.innerHeight;
		pixelRatio = window.devicePixelRatio;

		columns = Math.floor(screenWidth / resolution);
		rows = Math.floor(screenHeight / resolution);

		handleGameInit();
	}

	function handleGameInit() {
		gameGrid = new Array(columns)
			.fill(null)
			.map(() => new Array(rows).fill(null).map(() => Math.floor(Math.random() * 2)));

		if (gameIntervalId) {
			clearInterval(gameIntervalId);
		}

		gameIntervalId = setInterval(handleGameStep, 1000 / fps);
	}

	function handleGameStep() {
		const newGrid = gameGrid.map((arr) => [...arr]);

		for (let col = 0; col < gameGrid.length; col++) {
			for (let row = 0; row < gameGrid[col].length; row++) {
				const cell = gameGrid[col][row];
				let aliveNeighbours = 0;

				for (let x = -1; x < 2; x++) {
					for (let y = -1; y < 2; y++) {
						if (x === 0 && y === 0) {
							continue;
						}

						const cellX = col + x;
						const cellY = row + y;

						if (cellX >= 0 && cellY >= 0 && cellX < columns && cellY < rows) {
							const currentNeighbour = Math.max(gameGrid[col + x][row + y], 0);
							aliveNeighbours += currentNeighbour;
						}
					}
				}

				// gol's rules

				if (cell === 1 && aliveNeighbours < 2) {
					newGrid[col][row] = -1;
				} else if (cell === 1 && aliveNeighbours > 3) {
					newGrid[col][row] = -1;
				} else if (cell <= 0 && aliveNeighbours === 3) {
					newGrid[col][row] = 1;
				}
			}
		}

		gameGrid = newGrid;

		handleGameRender();
	}

	function handleGameRender() {
		context.clearRect(0, 0, screenWidth, screenHeight);

		for (let col = 0; col < gameGrid.length; col++) {
			for (let row = 0; row < gameGrid[col].length; row++) {
				const cell = gameGrid[col][row];
				let color = "rgba(0, 0, 0, 0)";

				switch (cell) {
					case 1:
						color = "white";
						break;
					case -1:
						gameGrid[col][row] = 0;
						color = "rgba(200, 200, 200, 0.2)";
						break;
				}

				context.fillStyle = color;
				context.fillRect(col * resolution, row * resolution, resolution, resolution);
			}
		}
	}

	onMount(() => {
		context = canvas.getContext("2d")!;

		handleResize();

		return () => {
			clearInterval(gameIntervalId);
		};
	});
</script>

<svelte:window on:resize|passive={handleResize} />
<canvas
	bind:this={canvas}
	width={screenWidth * pixelRatio}
	height={screenHeight * pixelRatio}
	style="opacity: 1; pointer-events: none; transition: opacity 1.2s ease 0s"
/>