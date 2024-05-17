<template>
	<div v-if="isOpen !== undefined && isOpen" class="modal">
		<div class="modal-content">
			<div v-for="mail in mails">
				<div>
					{{ mail.message.sender }} <br>
					{{ mail.message.fromEmail }}
					{{ mail.message.messageSubject }}
					{{ formatTimestamp(mail.message.timestamp) }}
				</div>
			</div>

			<div class="text-center mt-30">
				<button class="button button--orange mr-50" @click="submitChanges">Save</button>
				<button class="button button--white" @click="closeModal">Cancel</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import firebase from "firebase/compat/app";
import {MailType} from "@/components/types/MailType";

// composition API in Vue.js with TypeScript,
export default defineComponent({
	props: {
		isOpen: {
			type: Boolean,
			required: true
		},
	},
	data() {
		return {
			mails: [] as MailType[],
		};
	},
	mounted() {
		this.getMails();
	},
	computed: {},
	methods: {
		async submitChanges() {

		},
		closeModal() {
			this.$emit("close");
		},
		async getMails() {
			const snapshot = await firebase.firestore().collection('mail').orderBy('message.timestamp', 'desc').get();
			this.mails = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as MailType[];
		},
		formatTimestamp(timestamp) {
			const date = new Date(timestamp);

			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');

			return `${year}-${month}-${day}`;
		},
	},
});
</script>

<style scoped>
/* Add your styles here */
</style>
