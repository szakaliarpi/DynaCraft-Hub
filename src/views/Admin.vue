<template>
	<div>
		<div class="text-center">
			<div class="button button--coral" @click="logout">Log out</div>
		</div>
	</div>

</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import {defineComponent} from "vue";
import {auth} from "@/main";


export default defineComponent({
	components: {
		Navbar
	},
	data() {
		return {
		};
	},
	methods: {
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
