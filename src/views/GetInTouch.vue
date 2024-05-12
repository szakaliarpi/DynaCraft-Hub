<template>
	<div>
		<Navbar></Navbar>
		<div class="get-in-touch-container">
			<div class="text-center mb-50">
				<img alt="get-in-touch" class="case-studies" src="../assets/get-in-touch.svg"/>
			</div>
			<div class="input-grid">
				<div class="flex-1">
					<label for="first-name">First name*</label>
					<input id="first-name" type="text" v-model="firstName" @input="validateFirstName"/>
					<div class="error-message">{{ firstNameError }}</div>
				</div>

				<div class="flex-1">
					<label for="last-name">Last name*</label>
					<input id="last-name" type="text" v-model="lastName" @input="validateLastName"/>
					<div class="error-message">{{ lastNameError }}</div>
				</div>

				<div class="flex-1">
					<label for="email">E-mail*</label>
					<input id="email" type="text" v-model="emailAddress" @input="validateEmail"/>
					<div class="error-message">{{ emailError }}</div>
				</div>
			</div>

			<label for="subject">Subject*</label>
			<div id="subject" class="input-grid">
				<div :class="{ 'button--lightgray-active': itIsActive }"
					 class="shadowed-button"
					 @click="toggleClass('it')">
					IT Consulting
				</div>

				<div :class="{ 'button--lightgray-active': frontendIsActive }"
					 class="shadowed-button"
					 @click="toggleClass('frontend')">
					Front-end
				</div>

				<div :class="{ 'button--lightgray-active': backendIsActive }"
					 class="shadowed-button"
					 @click="toggleClass('backend')">
					Back-end
				</div>

				<div :class="{ 'button--lightgray-active': otherIsActive }"
					 class="shadowed-button"
					 @click="toggleClass('other')">
					Other
				</div>
			</div>

			<label for="subject">Message*</label>
			<textarea v-model="message" :maxlength="maxMessageLength" placeholder="Type your message here"
					  @input="validateMessage"/>
			<div class="error-message mb-50">{{ messageError }}</div>
			<div class="text-center">
				<div class="button button--orange" :class="{ 'disabled': isDisabled }" @click="submitForm">submit</div>
			</div>
		</div>
		<Contact/>
	</div>
</template>

<script lang="ts">
import Contact from "@/components/Contact.vue";
import Navbar from "@/components/Navbar.vue";
import {db} from "@/main";
import {defineComponent} from "vue";
import {RouteLocationNormalized, RouteLocationNormalizedLoaded} from "vue-router";
import {Messages, ContactInfo, EmailTemplate} from "@/config/config";


export default defineComponent({
	components: {
		Navbar,
		Contact,
	},
	data() {
		return {
			firstName: '',
			lastName: '',
			emailAddress: '',
			selectedSubject: '',
			message: '',
			itIsActive: true,
			frontendIsActive: false,
			backendIsActive: false,
			otherIsActive: false,
			emailError: '',
			messageError: '',
			firstNameError: '',
			lastNameError: '',
			subject: '',
			maxMessageLength: 500,
			isDisabled: false
		};
	},
	methods: {
		beforeRouteEnter(to: RouteLocationNormalizedLoaded, from: RouteLocationNormalized, next: any) {
			window.scrollTo(0, 0);
			next();
		},
		toggleClass(type: string) {
			this.subject = '';
			switch (type) {
				case 'it':
					this.itIsActive = true;
					this.selectedSubject = type;
					this.frontendIsActive = false;
					this.backendIsActive = false;
					this.otherIsActive = false;
					this.subject = 'IT Consulting';
					break;
				case 'frontend':
					this.frontendIsActive = true;
					this.selectedSubject = type;
					this.itIsActive = false;
					this.backendIsActive = false;
					this.otherIsActive = false;
					this.subject = 'Front-end';
					break;
				case 'backend':
					this.backendIsActive = true;
					this.selectedSubject = type;
					this.itIsActive = false;
					this.frontendIsActive = false;
					this.otherIsActive = false;
					this.subject = 'Back-end';
					break;
				case 'other':
					this.otherIsActive = true;
					this.selectedSubject = type;
					this.itIsActive = false;
					this.frontendIsActive = false;
					this.backendIsActive = false;
					this.subject = 'Other';
					break;
				default:
					this.itIsActive = true;
					this.subject = 'Strategy & Discovery';
					break;
			}
		},
		submitForm() {
			this.firstNameError = '';
			this.lastNameError = '';
			this.emailError = '';
			this.messageError = '';
			let isValid = true;

			if (!this.firstName || !this.firstName.trim()) {
				this.firstNameError = Messages.first_name_required;
				isValid = false;
			}

			if (!this.lastName || !this.lastName.trim()) {
				this.lastNameError = Messages.last_name_required;
				isValid = false;
			}

			if (!this.emailAddress || !this.emailAddress.trim()) {
				this.emailError = Messages.email_required;
				isValid = false;
			}

			if (!this.message || !this.message.trim()) {
				this.messageError = Messages.message_required;
				isValid = false;
			}

			if (!isValid) {
				return;
			}

			let autoId = db.collection("mail").doc().id;
			const htmlContent = EmailTemplate.replace("{{firstName}}", this.firstName)
				.replace("{{lastName}}", this.lastName)
				.replace("{{emailAddress}}", this.emailAddress)
				.replace("{{subject}}", this.subject)
				.replace("{{message}}", this.message);

			db.collection("mail").doc(autoId).set({
				id: autoId,
				to: ContactInfo.email,
				message: {
					subject: `${Messages.subject} ${this.firstName} ${this.lastName}`,
					html: htmlContent,
					text: Messages.received,
				}
			}).then(response => {
				alert(Messages.sent);
				this.firstName = '';
				this.lastName = '';
				this.emailAddress = '';
				this.message = '';
				this.itIsActive = true;
				this.isDisabled = true;
				setTimeout(() => {
					this.isDisabled = false;
				}, 5000);
				console.log(response);
			}).catch(error => {
				alert(Messages.sending_failed);
				console.log(error);
			});
		},

		validateFirstName() {
			if (!this.firstName || !this.firstName.trim()) {
				this.firstNameError = Messages.first_name_required;
			} else if (this.firstName.trim().length < 2 || this.firstName.trim().length > 50) {
				this.firstNameError = Messages.character_restriction;
			} else {
				this.firstNameError = '';
			}
		},
		validateLastName() {
			if (!this.lastName || !this.lastName.trim()) {
				this.lastNameError = Messages.last_name_required;
			} else if (this.lastName.trim().length < 2 || this.lastName.trim().length > 50) {
				this.lastNameError = Messages.character_restriction;
			} else {
				this.lastNameError = '';
			}
		},
		validateEmail() {
			const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

			if (!this.emailAddress || !this.emailAddress.trim()) {
				this.emailError = Messages.email_required;
			} else if (!emailRegex.test(this.emailAddress.trim())) {
				this.emailError = Messages.invalid_email;
			} else {
				this.emailError = '';
			}
		},
		validateMessage() {
			if (!this.message || !this.message.trim()) {
				this.messageError = Messages.message_required;
			} else if (this.message.trim().length > this.maxMessageLength - 1) {
				this.messageError = Messages.message_restriction;
				this.message = this.message.trim().substring(0, this.maxMessageLength);
			} else {
				this.messageError = '';
			}
		}
	}
});
</script>

<style scoped>

</style>
