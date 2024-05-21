<template>
	<div class="footer">
		<div>
			<div class="is-grid">
				<h2>Contact info</h2>
				<div class="contact-info">{{ contact }}</div>
				<div class="contact-info">{{ phone }}</div>
			</div>

			<div class="contact-container">
				<a href="https://www.linkedin.com/">
					<img alt="linkedin" id="linkedin" class="contact-icon" src="../assets/contact/linkedin.svg"/>
				</a>
				<a href="https://www.instagram.com//">
					<img alt="instagram" id="instagram" class="contact-icon" src="../assets/contact/instagram.svg"/>
				</a>
				<a href="https://www.facebook.com//">
					<img alt="facebook" id="facebook" class="contact-icon" src="../assets/contact/facebook.svg"/>
				</a>
			</div>
		</div>

		<div class="">
			<img alt="footer-logo" class="footer-logo" src="../assets/main-logo.svg"/>
		</div>

	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {ContactInfo} from "@/config/config";

export default defineComponent({
	data() {
		return {
			contact: ContactInfo.contact as string,
			phone: ContactInfo.phone as string,
		};
	},
});

</script>

<style scoped>

</style>
