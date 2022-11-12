<template>
    <div class="menu">
			<router-link to="/" class="button">
				<span class="material-icons">home</span>
				<span class="text">Exercise Data</span>
			</router-link>
			<router-link to="/tab1" class="button">
				<span class="material-icons">description</span>
				<span class="text">Glucose Data</span>
			</router-link>
			<router-link to="/" class="button">
				<span class="material-icons">group</span>
				<span class="text">Insulin Data</span>
			</router-link>
			<router-link to="/" class="button">
				<span class="material-icons">email</span>
				<span class="text">Meal Data</span>
			</router-link>
		</div>
</template>

<script>
export default {
    setup (props, content)
}
</script>

<style lang="scss" scoped>
    .menu {
        &.router-link-exact-active {
				background-color: var(--dark-alt);
				border-right: 5px solid var(--primary);
				.material-icons, .text {
					color: var(--primary);
				}
		}
    }
</style>