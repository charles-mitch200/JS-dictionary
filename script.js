// Get HTML elements to JavaScript as objects
const inputElem = document.querySelector(".js-input");
const infoTextElem = document.getElementById("info-text");
const meaningContainerElem = document.getElementById("meaning-container");
const titleElem = document.getElementById("title");
const meaningElem = document.getElementById("meaning");
const audioElem = document.getElementById("audio");
const exampleElem = document.getElementById("example");

// function to add and remove the info text and meaning elements
const updateUI = () => {
  infoTextElem.style.display = "none";
  meaningContainerElem.style.display = "block";
};

// Get the meaning of the word using the dictionary API
const fetchAPI = async (word) => {
  try {
    meaningContainerElem.style.display = "block";
    infoTextElem.style.display = "block";
    infoTextElem.innerText = `Searching for the meaning of the word "${word}".`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url);
    const wordMeaning = await result.json();

    if (wordMeaning.title) {
      updateUI();
      titleElem.innerText = word;
      meaningElem.innerText = "N/A";
      exampleElem.innerText = "N/A";
      audioElem.style.display = "none";
    } else {
      updateUI();
      titleElem.innerText = wordMeaning[0].word;
      meaningElem.innerText =
        wordMeaning[0].meanings[0].definitions[0].definition;
      exampleElem.innerText = wordMeaning[0].meanings[0].definitions[0].example || "N/A";
      audioElem.style.display = "inline-flex";
      audioElem.src = wordMeaning[0].phonetics[0].audio;
    }
  } catch (error) {
    infoTextElem.innerText = `An error occurred. Try again later!`;
  }
};

// Get the word from the user as an input
inputElem.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});
