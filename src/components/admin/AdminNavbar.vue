<template>
	<div>
		<div class="admin-navbar">
			<div class="is-flex gap-20">
				<div class="message-container" @click="openModal">
					<img alt="messages" class="navbar-icon " src="../../assets/icons/email.png"/>
					<div v-if="notificationActive" class="notification">!</div>
				</div>
				<img id="logout" alt="messages" class="navbar-icon" src="../../assets/icons/logout.png"
					 @click="logout"/>
			</div>
		</div>

		<MailModal :is-open="isOpen"
				   @close="closeModal"
		/>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {auth} from "@/main";
import firebase from "firebase/compat/app";
import MailModal from "@/components/admin/MailModal.vue";


export default defineComponent({
	components: {
		MailModal
	},
	data() {
		return {
			notificationActive: false as boolean,
			isOpen: false as boolean,
		};
	},
	async mounted() {
		await this.mailListener();
	},
	methods: {
		openModal() {
			this.isOpen = true;
		},
		closeModal() {
			this.isOpen = false;
		},
		logout() {
			auth.signOut()
				.then(() => {
					this.$router.push('/');
				})
				.catch(error => {
					alert(error.message);
					this.$router.push('/');
				});
		},
		async mailListener() {
			await firebase.firestore().collection('mail').onSnapshot(async (snapshot) => {
				await snapshot.docChanges().forEach((change) => {
					if (change.type === "added") {
						let emailCreationTime = change.doc.data()?.message.timestamp; //data()?.delivery.endTime.seconds
						console.log(change.doc.data());
						let currentTime = new Date().getTime();
						if (emailCreationTime > currentTime) {
							this.notificationActive = true;
						}
					}
				})
			});
		}
	},
});
</script>

<style scoped>

</style>
