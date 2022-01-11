document.addEventListener('DOMContentLoaded', function () {
	const btnNext = document.querySelector('.next-btn')
	const btnPrev = document.querySelector('.prev-btn')
	const slides = document.querySelectorAll('.slide-item')
	const slideIcons = document.querySelectorAll('.slide-icon')
	const slider = document.querySelector('.slider')

	const numberOfSlide = slides.length
	var slideNumber = 0

	//image slide next button
	btnNext.addEventListener('click', function () {
		slideNumber++

		if (slideNumber > numberOfSlide - 1) {
			slideNumber = 0
		}

		slides.forEach((slide) => {
			slide.classList.remove('active')
		})

		slideIcons.forEach((slideIcon) => {
			slideIcon.classList.remove('active')
		})

		slides[slideNumber].classList.add('active')
		slideIcons[slideNumber].classList.add('active')
	})

	//image slide pre button
	btnPrev.addEventListener('click', function () {
		slideNumber--

		if (slideNumber < 0) {
			slideNumber = numberOfSlide - 1
		}

		slides.forEach((slide) => {
			slide.classList.remove('active')
		})

		slideIcons.forEach((slideIcon) => {
			slideIcon.classList.remove('active')
		})

		slides[slideNumber].classList.add('active')
		slideIcons[slideNumber].classList.add('active')
	})
	//image slider autoplay
	var playSlider

	var repeater = () => {
		playSlider = setInterval(function () {
			slides.forEach((slide) => {
				slide.classList.remove('active')
			})
			slideIcons.forEach((slideIcon) => {
				slideIcon.classList.remove('active')
			})

			slideNumber++

			if (slideNumber > numberOfSlide - 1) {
				slideNumber = 0
			}

			slides[slideNumber].classList.add('active')
			slideIcons[slideNumber].classList.add('active')
		}, 4000)
	}
	repeater()

	//stop the image slider autoplay on mouseover
	slider.addEventListener('mouseover', () => {
		clearInterval(playSlider)
	})

	//start the image slider autoplay again on mouseout
	slider.addEventListener('mouseout', () => {
		repeater()
	})
})
