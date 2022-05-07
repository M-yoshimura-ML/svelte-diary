<script>
	import "smelte/src/tailwind.css" ;
	export let url = "";
	import { Router, Link, Route } from "svelte-routing";
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import Home from "./components/Home.svelte";
	import Create from "./components/Create.svelte";
	import Diary from "./components/Diary.svelte";
	import About from "./components/About.svelte";
	import './helpers/firebase';
</script>

<main class="bg-background-500 dark:bg-dark-300">
	<Header />
	<section class="content p-8">
		<Router url="{url}">
			<div>
				<Route path="diary/:id" component="{Diary}" let:params ><Diary id={params.id} /></Route>
				<Route path="create" component="{Create}" />
				<Route path="about" component="{About}" />
				<Route path="/"><Home /></Route>
			</div>
		</Router>
	</section>
	
	<Footer />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 640px;
		margin: 0 auto; /* 横方向自動センタリング */
	}

	.content{
		min-height: calc(100vh - 60px - 60px);
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	/* @media (min-width: 640px) {
		main {
			max-width: none;
		}
	} */
</style>