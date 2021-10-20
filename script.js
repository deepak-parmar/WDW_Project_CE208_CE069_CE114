var qa;

const getQA = async (amount, category, difficulty) => {
    let response = await fetch(`https://opentdb.com/api.php?amount=${amount}&categoty=${category}&difficulty=${difficulty}&type=multiple`)
    let result = await response.json()

    const {results: questions} = result

    let fil = []
    questions.map((element) => {
        element.incorrect_answers.splice(
            Math.floor(Math.random() * (0 - 4) + 4), 0,
            element.correct_answer
        )

        fil.push({
            "question": element.question,
            "options": element.incorrect_answers,
            "ans": element.correct_answer
        })
    })
    qa = fil
    // populate quiz carousel
    $("#main-container").empty()
    $("#main-container").append(quizCarousel(carouselItem(fil)))
    $(".carousel-item").eq(0).addClass("active")
}


const quizForm = `<div class="container-fluid bg-light rounded-3 px-5 py-5 d-flex justify-content-center align-self-center">
<form id="quiz-form" class="w-100">
    <div class="form-floating mb-3">
        <select name="category" id="difficulty-dropdown" class="form-select fw-bold text-uppercase" required>
            <option selected disabled value="">SELECT DIFFICULTY</option>
        </select>
        <label for="difficulty-dropdown">Difficulty</label>
    </div>
    
    <div class="form-floating mb-3">
        <select name="category" id="category-dropdown" class="form-select fw-bold text-uppercase" required>
            <option selected disabled value="">SELECT A CATEGORY</option>
        </select>
        <label for="category-dropdown">Category</label>
    </div>

    <div class="form-floating mb-3">
        <select name="que-timing" id="que-timing-dropdown" class="form-select fw-bold text-uppercase" required>
            <option selected disabled value="">SELECT NUMBER OF QUESTIONS</option>
        </select>
        <label for="que-timing-dropdown">Number of Questions</label>
    </div>

    <div class="row" id="custom-options">
    </div>

    <div class="col-auto">
        <button type="submit" id="submit-btn" class="btn btn-primary mt-4 btn-lg w-100 p-3 fs-3" disabled>
            <!-- <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="width: 3rem; height: 3rem; border-width: .4rem;"></span></button> -->
            START QUIZ
    </div>
</form>
</div>`

const quizCarousel = (carouselItems) => `<div class="container-fluid bg-light rounded-3 p-3 d-flex justify-content-center align-self-center">
<div class="container-fluid w-100 p-0">
    <div class="d-flex justify-content-between fw-bold">
        <div id="queNo">
            <div id="currentQue" class="d-inline">1</div>/<div id="totalQue" class="d-inline">${queNumbers}</div>
        </div>

        <!-- clock -->
        <!--<div class="d-flex flex-row justify-content-between align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16">
            <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
            <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/>
          </svg>&nbsp;&nbsp;
          <div>25:30</div>
        </div>-->


        <!-- score -->
        <div class="d-flex flex-row justify-content-between align-items-center" id="score">
            <div id="currentScore" class="d-inline">0</div>/
            <div id="totalScore" class="d-inline">${queNumbers}</div>
        </div>

        <!-- close btn -->
        <div id="quiz-cls-btn" style="cursor: pointer">
            <a href="http://127.0.0.1:5500">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" fill="#000"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" fill="#000"/>
          </svg></a>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <div id="quizCarousel" class="carousel carousel-dark slide w-100" data-interval="false">
                <div class="carousel-inner">
                ${carouselItems}
                </div>

                <!-- previous btn -->
                <button class="carousel-control-prev" id="prev-btn" style="width: auto;" type="button" data-bs-target="#quizCarousel" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>

                <script>
                    $("#next-btn").click(() => {
                        if (Number($("#currentQue").text()) == Number($("#totalQue").text())) {
                            $("#currentQue").text(1)
                        } else {
                            $("#currentQue").text(Number($("#currentQue").text())+1)
                        }
                    })

                    $("#prev-btn").click(() => {
                        if (Number($("#currentQue").text()) === 1) {
                            $("#currentQue").text($("#totalQue").text())
                        } else {
                            $("#currentQue").text(Number($("#currentQue").text())-1)
                        }
                    })
                </script>

                <!-- next btn -->
                <button class="carousel-control-next" id="next-btn" style="width: auto;" type="button" data-bs-target="#quizCarousel" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
        </div>
    </div>
</div>
</div>
<script>$('.carousel').carousel('pause');</script>`

// returns slide of quiz carousel
function carouselItem(qrr) {
    let items = ''
    qrr.forEach((element, index) => {
        items += `<div class="carousel-item px-5"> <!--active-->
        <div class="que p-5">
            <div class="row mb-5">
                <div class="col text-start fw-bold fs-5" id="q${index}" data-attempted="false">
                    ${element.question}
                </div>
            </div>
        
            <div class="row">
                <label class="col mx-2 my-2 rounded-3 form-check-label w-75" style="background-color: #dee2e6;" for="q${index}o1" >
                    <div class="form-check p-2 ms-4">
                        <input class="form-check-input" name="q${index}" type="radio" onclick="checkAns(${index}, '${element.options[0]}', 1)" id="q${index}o1" value="${element.options[0]}">
                        <div class="text-start ms-2">${element.options[0]}</div>
                    </div>
                </label>
        
                <label class="col mx-2 my-2 rounded-3 form-check-label w-75" style="background-color: #dee2e6;" for="q${index}o2">
                    <div class="form-check p-2 ms-4">
                        <input class="form-check-input" type="radio" onclick="checkAns(${index}, '${element.options[1]}', 2)" name="q${index}" id="q${index}o2" value="${element.options[1]}" data-que-no=${index}>
                        <div class="text-start ms-2">${element.options[1]}</div>
                    </div>
                </label>
            </div>
            
            <div class="row">
                <label class="col mx-2 my-2 rounded-3 form-check-label w-75" style="background-color: #dee2e6;" for="q${index}o3">
                    <div class="form-check p-2 ms-4">
                        <input class="form-check-input" type="radio" onclick="checkAns(${index}, '${element.options[2]}', 3)" name="q${index}" id="q${index}o3" value="${element.options[2]}" data-que-no=${index}>
                        <div class="text-start ms-2">${element.options[2]}</div>
                    </div>
                </label>
        
                <label class="col mx-2 my-2 rounded-3 form-check-label w-75" style="background-color: #dee2e6;" for="q${index}o4">
                    <div class="form-check p-2 ms-4">
                        <input class="form-check-input" type="radio" onclick="checkAns(${index}, '${element.options[3]}', 4)" name="q${index}" id="q${index}o4" value="${element.options[3]}" data-que-no=${index}>
                        <div class="text-start ms-2">${element.options[3]}</div>
                    </div>
                </label>
            </div>
        </div>
        </div>`
    })
    return items
}

// populate quiz form on load
$("#main-container").append(quizForm)

const metadata =
{
    "difficulties": ["easy", "medium", "hard"],

    "durations": [
        {questions: "10", timing: null},
        {questions: "15", timing: null},
        {questions: "20", timing: null},
        {questions: "30", timing: null},
        {questions: "40", timing: null},
        {questions: "50", timing: null},
    ],

    "categories": [
        {"no": "any", "name": "Random"},
        {"no": 9, "name": "General Knowledge"},
        {"no": 10, "name": "Books"},
        {"no": 11, "name": "Film"},
        {"no": 12, "name": "Music"},
        {"no": 13, "name": "Musicals & Theatres"},
        {"no": 14, "name": "Television"},
        {"no": 15, "name": "Video Games"},
        {"no": 16, "name": "Board Games"},
        {"no": 17, "name": "Science & Nature"},
        {"no": 18, "name": "Computers"},
        {"no": 19, "name": "Mathematics"},
        {"no": 20, "name": "Mythology"},
        {"no": 21, "name": "Sports"},
        {"no": 22, "name": "Geography"},
        {"no": 23, "name": "History"},
        {"no": 24, "name": "Politics"},
        {"no": 25, "name": "Art"},
        {"no": 26, "name": "Celebrities"},
        {"no": 27, "name": "Animals"},
        {"no": 28, "name": "Vehicles"},
        {"no": 29, "name": "Comics"},
        {"no": 30, "name": "Gadgets"},
        {"no": 31, "name": "Anime & Manga"},
        {"no": 32, "name": "Cartoon & Animations"}
    ]
}

const {categories, difficulties, durations} = metadata;


// populate difficulty dropdown
difficulties.forEach(difficulty => {
    $("#difficulty-dropdown").append(`<option value="${difficulty}">${difficulty}</option>`)
})


// populate category dropdown
categories.forEach(category => {
    $("#category-dropdown").append(`<option value="${category.no}">${category.name}</option>`)
})


// populate que-timing dropdown
durations.forEach(duration => {
    if (typeof duration.questions == "number") {
        $("#que-timing-dropdown").append(`<option value="${duration.questions}">${duration.questions} Questions / ${duration.timing} Minutes</option>`)
    } else {
        $("#que-timing-dropdown").append(`<option value="${duration.questions}">${duration.questions}</option>`)
    }
})


$("#que-timing-dropdown").on("change", () => {

    const customElements =`<div class="col mb-2">
<div class="form-floating fw-bold">
    <input type="number" class="form-control fw-bold" id="custom-ques" placeholder="No. of Questions" min=1 max=50 step=1 required>
    <label for="custom-ques" class="fw-normal">Number of Questions</label>
</div>
</div>

<div class="col">
<div class="form-floating">
    <input type="number" class="form-control fw-bold" id="custom-time" placeholder="Minutes per Question" min=0 step=1>
    <label for="custom-time" class="fw-normal">Minutes per Question</label>
</div>
</div>`

    $("#que-timing-dropdown").val().toLowerCase() === "custom"
    ? $("#custom-options").append(customElements)
    : $("#custom-options").html("")
})


$("#quiz-form").on("change", () => {
    if ($("#difficulty-dropdown").val() != null && $("#category-dropdown").val() != null && $("#que-timing-dropdown").val() != null) {
        $("#submit-btn").prop("disabled", false)
    } else {
        $("#submit-btn").prop("disabled", true)
    }
})

let queNumbers;
$("#que-timing-dropdown").on("change", () => queNumbers = $("#que-timing-dropdown").val())

// prevent default submit behaviour
$("#quiz-form").on("submit", (e) => {
    e.preventDefault()
    
    // show loader while quiz is being fetched
    $("#submit-btn").html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="width: 3rem; height: 3rem; border-width: .4rem;"></span>`)

    // disable quiz form inputs
    $("#submit-btn").prop("disabled", true)
    $("#quiz-form select").prop("disabled", true)

    // initiate quiz
    getQA($("#que-timing-dropdown").val(), $("#category-dropdown").val(), $("#difficulty-dropdown").val())
})

// check answer of current question and response accordingly
const checkAns = (index, option, optionNo) => {
    if (option == qa[index].ans){
        $(`input[id="q${index}o${optionNo}"]`).parents().find(`label[for="q${index}o${optionNo}"]`).addClass("bg-success text-light fw-bold")
        $("#currentScore").text(Number($("#currentScore").text())+1)
    } else {
        $(`input[id="q${index}o${optionNo}"]`).parents().find(`label[for="q${index}o${optionNo}"]`).addClass("bg-danger text-light fw-bold")
    }

    // mark current question as attempted
    $(`#q${index}`).attr("data-attempted", true)    // prop didn't work
    
    // disable current question
    $(`input[name=q${index}]`).attr("disabled", true)

    // check if all questions are attempted
    if ($("div[data-attempted=true]").length === Number($("#totalScore").text())) {
        let result = `<p class="fs-5"> YOU SCORED ${$("#currentScore").text()} OUT OF ${$("#totalScore").text()}</p>`
        $("#score").empty()
        $("#score").append(result)
    }
}