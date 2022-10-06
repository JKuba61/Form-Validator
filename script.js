const username = document.querySelector(`#username`)
const password = document.querySelector(`#password`)
const password2 = document.querySelector(`#password2`)
const email = document.querySelector(`#email`)
const clearBtn = document.querySelector(`.clear`)
const sendBtn = document.querySelector(`.send`)
const closeBtn = document.querySelector(`.close`)
const popup = document.querySelector(`.popup`)

const showError = (input, msg) => {
	const formBox = input.parentElement
	const errorField = formBox.querySelector(`.error-text`)
	formBox.classList.add(`error`)
	errorField.textContent = msg
}
const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove(`error`)
}
const checkForm = input => {
	input.forEach(el => {
		if (el.value === ``) {
			showError(el, `This field can't be empty!`)
		} else {
			clearError(el)
		}
	})
}
const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} has to be min. ${min} characters long`)
	}
}
const checkPass = (password, password2) => {
	const formBox = password2.parentElement
	if (password.value !== password2.value) {
		showError(password2, 'Passwords are not identical!')
	}
}
const checkMail = email => {
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

	if (!re.test(email.value)) {
		showError(email, `Email adress is not valid`)
	}
}

const checkError = () => {
	const allInputs = document.querySelectorAll(`.form-box`)
	let errorCount = 0

	allInputs.forEach(el => {
		if (el.classList.contains(`error`)) {
			errorCount++
		}
	})

	if (errorCount === 0) {
		popup.classList.add(`showPopup`)
	}
}

sendBtn.addEventListener(`click`, e => {
	e.preventDefault()
	checkForm([username, password, password2, email])
	checkLength(username, 3)
	checkLength(password, 8)
	checkPass(password, password2)
	checkMail(email)
	checkError()
})

clearBtn.addEventListener(`click`, e => {
	e.preventDefault()
	;[username, password, password2, email].forEach(el => {
		el.value = ``
		clearError(el)
	})
})
