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

		<MailModal ref="getMails"
				   :is-open="isOpen"
				   @close="closeModal"
		/>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {auth} from "@/main";
import firebase from "firebase/compat/app";
import MailModal from "@/components/modals/MailModal.vue";
import {MailType} from "@/components/types/MailType";

export default defineComponent({
	components: {
		MailModal
	},
	data() {
		return {
			notificationActive: false as boolean,
			isOpen: false as boolean,
			currentTime: new Date().getTime(),
			mails: [] as MailType[],
		};
	},
	mounted() {
		this.mailListener();
	},
	methods: {
		openModal() {
			this.isOpen = true;
			this.notificationActive = false;
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
			await firebase.firestore().collection('mail').onSnapshot(async (snapshot) => {
				await snapshot.docChanges().forEach((change) => {
					if (change.type === "added") {
						let emailCreationTime = change.doc.data()?.message.timestamp; //data()?.delivery.endTime.seconds
						if (emailCreationTime > this.currentTime) {
							this.notificationActive = true;
							const audio = new Audio(require('@/assets/sounds/sound.mp3'));
							audio.play().catch(error => {
								console.error('Error playing sound:', error);
							});

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
