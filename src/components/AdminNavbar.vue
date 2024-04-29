<template>
	<div>
		<div class="admin-navbar">
			<div class="is-flex gap-20">
				<img alt="messages" class="navbar-icon" src="../assets/icons/email.png"/>
				<img alt="messages" class="navbar-icon" src="../assets/icons/logout.png" @click="logout"/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {auth} from "@/main";

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
		logout() {
			auth.signOut()
				.then(() => {
					alert('Successfully logged out');
					this.$router.push('/');
				})
				.catch(error => {
					alert(error.message);
					this.$router.push('/');
				});
		},
	},
});
</script>

<style scoped>

</style>
