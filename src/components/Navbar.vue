<template>
	<div>
		<div class="navbar">
			<router-link to="/" class="is-flex is-relative">
				<div>
					<img alt="name" class="logo-name" src="../assets/brand-logo.svg"/>
				</div>
			</router-link>
			<div class="navbar-items hide-on-mobile-tablet">
				<router-link class="navbar-item" to="/" v-bind:class="{ 'navbar-item-active': isActive('/') || isActive('/case-study')}">Work</router-link>
				<router-link class="navbar-item" to="/nice-to-meet-you" v-bind:class="{ 'navbar-item-active': isActive('/nice-to-meet-you')}">Nice to meet you!</router-link>
				<router-link class="navbar-item" to="/services" v-bind:class="{ 'navbar-item-active': isActive('/services')}">Services</router-link>

<!--				<div class="navbar-item" v-bind:class="{ 'navbar-item-active': isActive('/services/ux-ui-design') || isActive('/services/graphic-design')}"-->
<!--					 v-on:click=toggleServicesMenu>-->
<!--					Services-->
<!--					<img v-if="isActive('/services/ux-ui-design') || isActive('/services/graphic-design')" alt="arrow-down" class="arrow-down" src="../assets/arrow-down-red.svg"/>-->
<!--					<img v-else alt="arrow-down" class="arrow-down" src="../assets/arrow-down.svg"/>-->
<!--				</div>-->
<!--				<div class="navbar-item" v-bind:class="{ 'navbar-item-active': isActive('/services/ux-ui-design') || isActive('/services/graphic-design')}">-->
<!--					Services-->
<!--					<img v-if="isActive('/services/ux-ui-design') || isActive('/services/graphic-design')" alt="arrow-down" class="arrow-down" src="../assets/arrow-down-red.svg"/>-->
<!--					<img v-else alt="arrow-down" class="arrow-down" src="../assets/arrow-down.svg"/>-->
<!--				</div>-->
<!--				<div class="services-active" v-show="servicesActive">-->
<!--					<router-link class="services-active-item" to="/services/ux-ui-design">-->
<!--						ux/ui design-->
<!--					</router-link>-->
<!--					<router-link class="services-active-item" to="/services/graphic-design">-->
<!--						graphic design-->
<!--					</router-link>-->
<!--				</div>-->
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
<!--					<li @click="toggleServicesSubmenu">-->
<!--						<div class="menu__item">-->
<!--							Services-->
<!--						</div>-->
<!--						<ul v-show="contactSubmenuOpen" class="submenu">-->
<!--							<li><router-link class="submenu__item" to="/services/ux-ui-design">UX/UI Design</router-link></li>-->
<!--							<li><router-link class="submenu__item" to="/services/graphic-design">Graphic Design</router-link></li>-->
<!--						</ul>-->
<!--					</li>-->
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
		toggleServicesMenu() {
			this.servicesActive = !this.servicesActive;
		},
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen;
		},
		toggleServicesSubmenu() {
			this.contactSubmenuOpen = !this.contactSubmenuOpen;
		},
	},
});
</script>

<style scoped>

</style>
