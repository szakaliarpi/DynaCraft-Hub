<template>
	<div>
		<Navbar v-show="!isAdminPage"></Navbar>
		<div class="services">
			<div v-show="!isAdminPage" class="text-center mb-50">
				<img alt="services" class="case-studies" src="../../assets/services.svg"/>
			</div>

			<div v-for="service in services" class="services-container">
				<div :style="{ 'background-image': 'url(' + service.image + ')' }" class="services-icon"></div>
				<div class="services-text">
					<div class="services-title">{{ service.title }}</div>
					<div class="services-description">{{ service.description }}</div>
					<div class="box-container">
						<div v-for="box in service.boxes">
							<div class="services-shadowed-boxes">
								{{ box }}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-show="!isAdminPage" class="text-center mt-30">
				<router-link class="button button--orange" to="/get-in-touch">reach out to me</router-link>
			</div>
		</div>
		<Contact v-show="!isAdminPage"></Contact>
	</div>
</template>

<script lang="ts">
import Contact from "@/components/Contact.vue";
import Navbar from "@/components/Navbar.vue";
import {defineComponent} from "vue";
import firebase from "firebase/compat/app";
import {ServiceType} from "@/components/types/ServiceType";

export default defineComponent({
	components: {
		Navbar,
		Contact,
	},
	props: {
		component: {
			type: String,
			required: false
		},
	},
	computed: {
		isAdminPage(): boolean {
			const currentUrl = window.location.href;
			return currentUrl.includes('/admin');
		}
	},
	mounted() {
		this.getServicesFromFirebase();
	},
	data() {
		return {
			services: [] as ServiceType[],
		};
	},
	methods: {
		async getServicesFromFirebase() {
			const snapshot = await firebase.firestore().collection('services').get();
			this.services = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as ServiceType[];
			console.log(this.services);
		},
	}
});
</script>

<style scoped>

</style>
