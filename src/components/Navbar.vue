<template>
	<div>
		<div class="navbar">
			<router-link to="/" class="is-flex is-relative">
				<div class="mt-10">
					<img alt="name" class="logo-name" src="../assets/brand-logo.svg"/>
				</div>
			</router-link>
			<div class="navbar-items hide-on-mobile-tablet">
				<router-link class="navbar-item" to="/" v-bind:class="{ 'navbar-item-active': isActive('/') || isActive('/case-study')}">Work</router-link>
				<router-link class="navbar-item" to="/nice-to-meet-you" v-bind:class="{ 'navbar-item-active': isActive('/nice-to-meet-you')}">Nice to meet you!</router-link>
				<router-link class="navbar-item" to="/services" v-bind:class="{ 'navbar-item-active': isActive('/services')}">Services</router-link>
				<router-link class="navbar-item" to="/get-in-touch" v-bind:class="{ 'navbar-item-active': isActive('/get-in-touch')}">Get in touch</router-link>
			</div>

			<div class="hamburger-menu hide-on-desktop">
				<div id="menu__toggle"/>
				<label class="menu__btn" for="menu__toggle" @click="toggleMenu">
					<span></span>
				</label>

				<ul class="menu__box" :style="{ right: isMenuOpen ? '0' : '-110%' }">
					<li>
						<router-link class="menu__item" to="/">Work</router-link>
					</li>
					<li>
						<router-link class="menu__item" to="/nice-to-meet-you">Nice to meet you!</router-link>
					</li>
					<li><router-link class="menu__item" to="/services">Services</router-link></li>
					<li><router-link class="menu__item" to="/get-in-touch">Get in touch</router-link></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
	data() {
		return {
			isMenuOpen: false,
			contactSubmenuOpen: false,
			servicesActive: false,
		};
	},
	methods: {
		isActive(path: string) {
			if (path === '/') {
				return window.location.pathname === '/';
			}
			return window.location.pathname.startsWith(path);
		},
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen;
		},
	},
});
</script>

<style scoped>

</style>
