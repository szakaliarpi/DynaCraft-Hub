<template>
	<div v-for="mail in Mails" class="">
		{{ mail.message.subject }}
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import firebase from "firebase/compat/app";
import {MailType} from "@/components/types/MailType";

export default defineComponent({
	components: {

	},
	props: {

	},
	data() {
		return {
			Mails: [] as MailType[],
		};
	},
	methods: {
		async getMailsFromFirebase() {
			const snapshot = await firebase.firestore().collection('mail').get();
			this.Mails = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as MailType[];
		},
	},
});
</script>

<style scoped>

</style>
