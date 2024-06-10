<template>
	<div>
		<div class="admin-navbar">
			<div class="is-flex gap-20">
				<div class="message-container" @click="openModal">
					<img alt="messages" class="navbar-icon" src="../../assets/icons/email.png"/>
					<div v-if="notificationActive" class="notification">!</div>
				</div>
				<img id="logout" alt="messages" class="navbar-icon" src="../../assets/icons/logout.png" @click="logout"/>
			</div>
		</div>
		<MailModal ref="getMails" :is-open="isOpen" @close="closeModal"/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { auth } from "@/main";
import firebase from "firebase/compat/app";
import MailModal from "@/components/modals/MailModal.vue";

export default defineComponent({
	components: {
		MailModal
	},
	data() {
		return {
			notificationActive: false,
			isOpen: false,
			currentTime: new Date().getTime(),
			mails: [],
		};
	},
	mounted() {
		this.checkForNewMailsOnLogin();
		this.mailListener();
	},
	methods: {
		openModal() {
			this.isOpen = true;
			this.notificationActive = false;
			this.setLastCheckedTime(Date.now());
			(this.$refs.getMails as any).getMails();
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
			firebase.firestore().collection('mail').onSnapshot((snapshot) => {
				snapshot.docChanges().forEach((change) => {
					if (change.type === "added") {
						let emailCreationTime = change.doc.data()?.message.timestamp;
						if (emailCreationTime > this.currentTime) {
							this.notificationActive = true;
							const audio = new Audio(require('@/assets/sounds/sound.mp3'));
							audio.play().catch(error => {
								console.error('Error playing sound:', error);
							});
						}
					}
				});
				this.currentTime = new Date().getTime(); // Ensure currentTime is updated
			});
		},
		async checkForNewMailsOnLogin() {
			const lastCheckedTime = this.getLastCheckedTime();
			const snapshot = await firebase.firestore().collection('mail').get();
			let hasNewMails = false;

			snapshot.forEach((doc) => {
				const emailCreationTime = doc.data()?.message.timestamp;
				if (emailCreationTime > lastCheckedTime) {
					hasNewMails = true;
				}
			});

			if (hasNewMails) {
				this.notificationActive = true;
				const audio = new Audio(require('@/assets/sounds/sound.mp3'));
				audio.play().catch(error => {
					console.error('Error playing sound:', error);
				});
			}

			this.setLastCheckedTime(Date.now());
		},
		getLastCheckedTime() {
			return parseInt(localStorage.getItem('lastCheckedTime') || '0', 10);
		},
		setLastCheckedTime(timestamp) {
			localStorage.setItem('lastCheckedTime', timestamp.toString());
		}
	},
});
</script>

<style scoped>
/* Add your styles here */
</style>
