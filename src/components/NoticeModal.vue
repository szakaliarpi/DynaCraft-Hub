<template>
	<div v-if="isOpen" class="modal">
		<div class="modal-content">
			<h1 class="text-center is-orange">{{ message }}</h1>
			<div class="text-center mt-10">
				<button class="button button--white mr-50" @click="confirmDelete">Yes</button>
				<button class="button button--orange" @click="closeModal">No</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		isOpen: {
			type: Boolean,
			required: true
		},
		message: {
			type: String,
			required: true
		}
	},
	data() {
		return {
		};
	},
	methods: {
		closeModal() {
			this.$emit("close");
		},
		confirmDelete() {
			this.$emit("confirm-delete");
		}
	}
});
</script>

<style scoped>

</style>
