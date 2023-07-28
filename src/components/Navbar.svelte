<nav class="flex w-full my-7 justify-between">
	<ul class="flex w-[45%] justify-evenly items-center">
		<i id="menu" class="hidden material-symbols-outlined">menu</i>
		<a href="/">~/</a>
		<a href="/random">~/random</a>
		<a href="/about">~/about</a>
	</ul>

	<ul class="flex w-[45%] justify-evenly items-center">
		<a href="https://github.com/Deepsn/portfolio">~/source</a>
		<p id="made-with">
			Made with
			<a href="https://svelte.dev">
				<i class="devicon-svelte-plain" />
			</a>
		</p>
		<i id="made-with-simple" class="hidden devicon-svelte-plain" />
	</ul>
</nav>

<style>
	a {
		text-decoration: underline transparent;
		transition: text-decoration-color 200ms;
	}

	a:hover {
		text-decoration-color: white;
	}

	@media screen and (max-width: 655px) {
		#made-with {
			display: none;
		}

		#made-with-simple {
			display: block;
		}

		#menu {
			display: block;
		}

		nav > ul:nth-child(1) {
			width: 20%;
		}

		nav > ul:nth-child(1) > a {
			display: none;
		}
	}
</style>
