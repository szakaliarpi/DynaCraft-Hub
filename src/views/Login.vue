<template>
	<div class="login-wrapper">
		<div class="login-container">
			<div class="input-group">
				<label for="email">E-mail</label>
				<input id="email" v-model="email" />
			</div>

			<div class="input-group">
				<label for="password">Password</label>
				<input id="password" v-model="password" type="password" @keyup.enter="handleEnterKey" />
			</div>

			<div class="text-center">
				<div :class="{ 'disabled': isDisabled }" class="button button--orange" @click="login">Log in</div>
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
				})
				.catch(error => {
					alert(error.message);
				});
		},
		handleEnterKey(event: KeyboardEvent) {
			if (event.key === "Enter") {
				this.login();
			}
		},

	}
});
</script>
