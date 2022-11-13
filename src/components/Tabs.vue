<template>
    <div class="menu">
        <router-link to="/tab1" class="button">
            <span class="text">Glucose Data</span>
        </router-link>
        <router-link to="/tab2" class="button">
            <span class="text">Exercise Data</span>
        </router-link>
    </div>
</template>

<script>
</script>

<style lang="scss" scoped>
	.menu {
		margin-bottom: 1.5rem;

		.button {
            background-color: var(--dark-alt);
            border: 5px solid var(--dark-alt);
			padding: 0.5rem 2rem;
			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-in-out;
			}
			.text {
                font-size: 1.3rem;
				color: var(--light);
				transition: 0.2s ease-in-out;
			}
			&:hover {
				.text {
					color: var(--primary);
				}
			}
			&.router-link-exact-active {
				background-color: var(--dark-alt);
				border-bottom: 5px solid var(--primary);
				.text {
					color: var(--primary);
				}
			}
		}
	}
</style>