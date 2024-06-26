<template>
	<div v-if="isOpen !== undefined && isOpen" class="modal">
		<div class="mail-content">
			<img alt="messages" class="close-image" src="../../assets/icons/close.png" @click="closeModal('mail')"/>
			<div v-for="mail in mails" :key="mail.id" class="mail-container">
				<img alt="remove" class="remove-mail" src="../../assets/icons/red-trash.png" @click="removeMail(mail.id)"/>
				<h3>{{ mail.message.sender }}</h3>
				<h4>{{ mail.message.messageSubject }}</h4>
				<p>{{ mail.message.text }}</p>
				<div class="mail-footer">
					<span>{{ mail.message.fromEmail }}</span>
					<span>{{ formatTimestamp(mail.message.timestamp) }}</span>
				</div>

			</div>
		</div>

		<NoticeModal :isOpen="isNoticeModalOpen"
					 :message="message"
					 @close="closeModal('notice')"
					 @confirm-delete="deleteConfirmed"/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import firebase from "firebase/compat/app";
import { MailType } from "@/components/types/MailType";
import {Messages} from "@/config/config";
import NoticeModal from "@/components/modals/NoticeModal.vue";

export default defineComponent({
	components: {
		NoticeModal
	},
	props: {
		isOpen: {
			type: Boolean,
			required: true
		},
	},
	data() {
		return {
			mails: [] as MailType[],
			isNoticeModalOpen: false as boolean,
			message: Messages.notice,
			editedMails: {
				id: '',
				to: '',
				description: '',
				message: {
					subject: '',
					html: '',
					text: '',
					timestamp: 0,
					sender: '',
					messageSubject: '',
					fromEmail: ''
				},
			} as MailType,
		};
	},
	methods: {
		closeModal(type: string) {
			if (type === 'notice') {
				this.isNoticeModalOpen = false;
			} else {
				this.$emit("close");
			}
		},
		async getMails() {
			const snapshot = await firebase.firestore().collection('mail').orderBy('message.timestamp', 'desc').get();
			this.mails = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MailType[];
		},
		formatTimestamp(timestamp) {
			const date = new Date(timestamp);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			return `${year}-${month}-${day}`;
		},
		async removeMail(id: string) {
			this.editedMails.id = id;
			this.isNoticeModalOpen = true;
		},
		deleteConfirmed() {
			this.isNoticeModalOpen = false;
			firebase.firestore().collection('mail').doc(this.editedMails.id).delete().then(() => {
				this.getMails();
			}).catch(error => {
				console.error("Error removing document: ", error);
				this.isNoticeModalOpen = true;
			});
		}
	},
});
</script>

<style scoped>
/* Add your styles here */
</style>
