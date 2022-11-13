<template>
	<div class="app">
		<Sidebar />
		<div>
			<Tabs />
			<keep-alive><router-view /></keep-alive>
		</div>
	</div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import Tabs from './components/Tabs.vue'
</script>

<style lang="scss">
:root {
	--primary: #4ad2de;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 250px;
}
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}
body {
	background: var(--light);
}
button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}
.app {
	display: flex;
	main {
		flex: 1 1 0;
		padding: 2rem;
	}
}
</style>