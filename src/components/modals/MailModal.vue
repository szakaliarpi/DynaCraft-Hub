<template>
	<div v-if="isOpen !== undefined && isOpen" class="modal">
		<div class="mail-content">
			<img alt="messages" class="close-image" src="../../assets/icons/close.png" @click="closeModal"/>
			<div v-for="mail in mails">
				<div class="mail-container">
					<h3>{{ mail.message.sender }}</h3>
					<h4> {{ mail.message.messageSubject }} </h4>
					<p> {{ mail.message.text }}</p>
					<div class="is-flex space-between">
						<span>{{ mail.message.fromEmail }}</span>
						<span>{{ formatTimestamp(mail.message.timestamp) }}</span>
					</div>
				</div>
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
	computed: {},
	methods: {
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
