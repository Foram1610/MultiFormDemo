const multiStep = document.querySelector('[data-multi-step]');
const formSteps = [...multiStep.querySelectorAll('[data-step]')];
let currentStep = formSteps.findIndex((step, index) => {
    return step.classList.contains('active')
});
//console.log(currentStep)
if (currentStep < 0) {
    currentStep = 0;
    showCurrentStep();
}
// console.log(currentStep)

multiStep.addEventListener('click', e => {
    let incrementor;
    if (e.target.matches("[data-next]")) {
        incrementor = 1
        // currentStep += 1
    }
    else if (e.target.matches("[data-previous]")) {
        incrementor = -1
        // currentStep -= 1
    }

    if (incrementor == null) return

    const inputs = [...formSteps[currentStep].querySelectorAll('input')];
    const allValid = inputs.every(input =>  input.reportValidity());
    if (allValid) {
        currentStep += incrementor
        showCurrentStep()
    }
})

formSteps.forEach(step => {
    step.addEventListener('animationend', e =>{
        formSteps[currentStep].classList.remove('hide')
        e.target.classList.toggle('hide', !e.target.classList.contains('active'));
    })
})

function showCurrentStep() {
    formSteps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep);
    })
}