<template>
	<div>
		<div class="log-in-container">
			<div class="">
				<label for="email">E-mail</label>
				<input id="email" v-model="email"/>
			</div>

			<div class="">
				<label for="password">Password</label>
				<input id="password" v-model="password" type="password"/>
			</div>

			<div class="text-center">
				<div :class="{ 'disabled': isDisabled }" class="button button--coral" @click="login">Log in</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {auth} from "@/main";

export default defineComponent({
	components: {
	},
	data() {
		return {
			email: '',
			password: '',
			isDisabled: false,
		};
	},
	methods: {
		login() {
			auth.signInWithEmailAndPassword(this.email, this.password)
				.then(() => {
					this.$router.push('/admin');
					alert('Successfully logged in');
					console.error('Login error');
				})
				.catch(error => {
					alert(error.message);
				});
		}
	}
});
</script>

<style scoped>

</style>
