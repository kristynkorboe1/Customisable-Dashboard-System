<template>
    <div class="menu">
        <!-- <router-link to="/tab1" class="button">
            <span class="text">Glucose Data</span>
        </router-link>
        <router-link to="/tab2" class="button">
            <span class="text">Exercise Data</span>
        </router-link> -->

		<button 
			@click="activeTab = 'Tab1'">
			<span class="text">Glucose Board</span>
		</button>

		<button 
			@click="activeTab = 'Tab2'">
			<span class="text">Exercise Board</span>
		</button>

		<button 
			@click="activeTab = 'Tab3'">
			<span class="text">Insulin Board</span>
		</button>

		<button 
			@click="activeTab = 'Tab4'">
			<span class="text">Meal Board</span>
		</button>

		<keep-alive><component :is="activeTab" /></keep-alive>
    </div>
</template>

<script>
import Home from '../views/Home.vue'
import Tab1 from '../views/Tab1.vue'
import Tab2 from '../views/Tab2.vue'
import Tab3 from '../views/Tab3.vue'
import Tab4 from '../views/Tab4.vue'

export default {
	name: "Tabs",
	components: {
		Home,
		Tab1,
		Tab2,
		Tab3,
		Tab4
	},
	data() {
		return {
			activeTab: 'Home'
		}
	}
}
</script>

<style lang="scss" scoped>

	.menu {
		margin-bottom: 1.5rem;

		button {
            background-color: var(--dark-alt);
            border: 5px solid var(--dark-alt);
			padding: 0.5rem 2rem;
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
			&:focus {
				background-color: var(--dark-alt);
				border-bottom: 5px solid var(--primary);
				.text {
					color: var(--primary);
				}
			}
			// &.router-link-exact-active {
			// 	background-color: var(--dark-alt);
			// 	border-bottom: 5px solid var(--primary);
			// 	.text {
			// 		color: var(--primary);
			// 	}
			// }
		}
	}
</style>