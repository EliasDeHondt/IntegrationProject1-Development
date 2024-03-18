import { Step } from "./Step/StepObjects";

let nextStepButton = document.getElementById("butNextStep") as HTMLButtonElement;
let informationContainer = document.getElementById("informationContainer") as HTMLDivElement;
let questionContainer = document.getElementById("questionContainer") as HTMLDivElement;
let currentStepNumber: number = 0;
let flowId: number; // TODO: voor later multiple flows
let userAnswers: string[] = []; // Array to store user answers

function GetNextStep(stepNumber: number, flowId: number) {
    fetch("/api/Steps/GetNextStep/" + flowId + "/" + stepNumber, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => ShowStep(data))
        .catch(error => console.error("Error:", error))
}

function ShowStep(data: Step) {
    informationContainer.innerHTML = "";
    questionContainer.innerHTML = "";
    if (data.informationViewModel != undefined) {
        switch (data.informationViewModel.informationType) {
            case "Text": {
                let p = document.createElement("p");
                p.innerText = data.informationViewModel.information;
                informationContainer.appendChild(p);
                break;
            }
            case "Image": {
                let img = document.createElement("img");
                img.src = "data:image/png;base64," + data.informationViewModel.information;
                informationContainer.appendChild(img);
                break;
            }
            case "Video": {
                let video = document.createElement("video");
                video.src = data.informationViewModel.information;
                video.autoplay = true;
                video.loop = true;
                video.controls = false;
                informationContainer.appendChild(video);
                break;
            }
        }
    }

    if (data.questionViewModel != undefined) {
        let p = document.createElement("p");
        p.innerText = data.questionViewModel.question;
        questionContainer.appendChild(p);
        switch (data.questionViewModel.questionType) {
            case "SingleChoiceQuestion":
                for (let i = 0; i < data.questionViewModel.choices.length; i++) {
                    let choice = document.createElement("input");
                    let label = document.createElement("label");
                    choice.type = 'radio';
                    choice.name = 'choice';
                    choice.value = data.questionViewModel.choices[i].text;
                    label.appendChild(choice);
                    label.append(data.questionViewModel.choices[i].text);
                    label.style.display = 'block';
                    questionContainer.appendChild(label);
                    // Add event listener to capture user input
                    choice.addEventListener('change', function () {
                        userAnswers = [choice.value];
                    });
                }
                break;
            case "MultipleChoiceQuestion":
                for (let i = 0; i < data.questionViewModel.choices.length; i++) {
                    let choice = document.createElement("input");
                    let label = document.createElement("label");
                    choice.type = 'checkbox';
                    choice.name = 'choice';
                    choice.value = data.questionViewModel.choices[i].text;
                    label.appendChild(choice);
                    label.append(data.questionViewModel.choices[i].text);
                    label.style.display = 'block';
                    questionContainer.appendChild(label);
                    // Add event listener to capture user input
                    choice.addEventListener('change', function () {
                        if (choice.checked) {
                            // Add selected choice to userAnswers array
                            userAnswers.push(choice.value);
                        } else {
                            // Remove deselected choice from userAnswers array
                            const index = userAnswers.indexOf(choice.value);
                            if (index !== -1) {
                                userAnswers.splice(index, 1);
                            }
                        }
                    });
                }
                break;
            case "RangeQuestion":
                let slider = document.createElement("input");
                slider.type = 'range';
                slider.min = String(0);
                slider.max = String(data.questionViewModel.choices.length - 1);
                slider.step = String(1);

                slider.addEventListener('input', function () {
                    // Update the label to reflect the current choice
                    userAnswers = [data.questionViewModel.choices[Number(slider.value)].text];
                });

                questionContainer.appendChild(slider);

                let label = document.createElement("label");
                label.innerText = data.questionViewModel.choices[Number(slider.value)].text;
                questionContainer.appendChild(label);
                break;
            case "OpenQuestion":
                let textInput = document.createElement("textarea");
                textInput.name = 'answer';
                textInput.rows = 8;
                textInput.cols = 75;
                textInput.maxLength = 650;
                textInput.placeholder = "Your answer here... (Max 650 characters)"

                // Event listener that ensures the 650 character limit.
                textInput.addEventListener('input', function () {
                    let currentLength = textInput.value.length;
                    if (currentLength > 650) {
                        textInput.value = textInput.value.substring(0, 650);
                    }
                    // Capture user input
                    userAnswers = [textInput.value];
                });

                questionContainer.appendChild(textInput);
                break;
            default:
                console.log("This question type is not currently supported. (QuestionType: " + data.questionViewModel.questionType);
                break;
        }
    }
}

async function saveAnswerToDatabase(answers: string[], flowId: number, stepNumber: number): Promise<void> {
    try {
        const response = await fetch("/api/" + flowId + '/' + stepNumber + "/answers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                answers: answers
            })
        });

        if (response.ok) {
            console.log("Answers saved successfully.");
        } else {
            console.error("Failed to save answers.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

nextStepButton.onclick = async () => {
    if (userAnswers.length > 0) {
        // Save user answers to the database
        console.log("Saving data...")
        for (var i = 0; i < userAnswers.length; i++) {
            console.log(userAnswers[i]);
        }
        await saveAnswerToDatabase(userAnswers, 1, currentStepNumber);
        // Clear the userAnswers array for the next step
        userAnswers = [];
    }
    // Proceed to the next step
    GetNextStep(++currentStepNumber, 1);
}
