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
				this.firstNameError = 'First name is required';
				isValid = false;
			}

			if (!this.lastName || !this.lastName.trim()) {
				this.lastNameError = 'Last name is required';
				isValid = false;
			}

			if (!this.emailAddress || !this.emailAddress.trim()) {
				this.emailError = 'Email is required';
				isValid = false;
			}

			if (!this.message || !this.message.trim()) {
				this.messageError = 'Message is required';
				isValid = false;
			}

			if (!isValid) {
				return;
			}

			let autoId = db.collection("mail").doc().id;
			let htmlContent =
				`<div style="font-size: 16px;">
				 <div style="display: flex;">
					<div style="font-size: 16px; font-weight: bold; margin-right: 10px;">Full Name:</div>
					<div style="font-size: 16px;">${this.firstName} ${this.lastName}</div>
				</div>
				<div style="display: flex;">
					<div style="font-size: 16px; font-weight: bold; margin-right: 10px;">Email:</div>
					<div style="font-size: 16px;">${this.emailAddress}</div>
				</div>
				 <div style="display: flex;">
					<div style="font-size: 16px; font-weight: bold; margin-right: 10px;">Subject:</div>
					<div style="font-size: 16px;">${this.subject}</div>
				</div>
				 <div style="display: flex;">
					<div style="font-size: 16px; font-weight: bold; margin-right: 10px;">Message:</div>
					<p style="margin: 0">${this.message}</p>
				</div>
		  	</div>`;

			db.collection("mail").doc(autoId).set({
				id: autoId,
				to: 'szakaliarpi@gmail.com',
				message: {
					subject: `Hello, I'm ${this.firstName} ${this.lastName}`,
					html: htmlContent,
					text: 'Message received',
				}
			}).then(response => {
				alert('Your message has been sent!');
				console.log(response);
				this.firstName = '';
				this.lastName = '';
				this.emailAddress = '';
				this.message = '';
				this.itIsActive = true;
				this.isDisabled = true;
				setTimeout(() => {
					this.isDisabled = false;
				}, 5000);
			}).catch(error => {
				alert('Sending message failed! try again later');
				console.log(error);
			});
		},

		validateFirstName() {
			if (!this.firstName || !this.firstName.trim()) {
				console.log('alma')
				this.firstNameError = 'First name is required';
			} else if (this.firstName.trim().length < 2 || this.firstName.trim().length > 50) {
				this.firstNameError = 'First name must be between 2 and 50 characters';
			} else {
				this.firstNameError = '';
			}
		},
		validateLastName() {
			if (!this.lastName || !this.lastName.trim()) {
				this.lastNameError = 'Last name is required';
			} else if (this.lastName.trim().length < 2 || this.lastName.trim().length > 50) {
				this.lastNameError = 'Last name must be between 2 and 50 characters';
			} else {
				this.lastNameError = '';
			}
		},
		validateEmail() {
			const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

			if (!this.emailAddress || !this.emailAddress.trim()) {
				this.emailError = 'Email is required';
			} else if (!emailRegex.test(this.emailAddress.trim())) {
				this.emailError = 'Invalid email address';
			} else {
				this.emailError = '';
			}
		},
		validateMessage() {
			if (!this.message || !this.message.trim()) {
				this.messageError = 'Message is required';
			} else if (this.message.trim().length > this.maxMessageLength - 1) {
				this.messageError = 'Message cannot exceed 500 characters';
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
