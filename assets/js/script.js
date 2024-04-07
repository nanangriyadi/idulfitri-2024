function startWriting() {
  setTimeout(() => {
    fetch("./../assets/data/arr_text.json")
      .then((res) => res.json())
      .then((arr_text) => {
        arr_text.unshift(getFirstGreetingText());

        let currentLetter = 0;
        let currentTextIndex = 0;
        let isChangedToNewTextIndex = false;

        writeText(
          arr_text,
          currentLetter,
          currentTextIndex,
          isChangedToNewTextIndex
        );
      });
  }, 1500);
}

function writeText(
  arr_text,
  currentLetter,
  currentTextIndex,
  isChangedToNewTextIndex
) {
  const textWritingElement = document.querySelector(".text-writing");

  if (isChangedToNewTextIndex) {
    textWritingElement.innerHTML = "";
    currentLetter = 0;
    currentTextIndex =
      currentTextIndex == arr_text.length - 1 ? 0 : currentTextIndex + 1;
  }

  isChangedToNewTextIndex = false;

  arr_text.forEach((text, arr_text_index) => {
    if (currentTextIndex == arr_text_index) {
      if (currentLetter < text.length) {
        textWritingElement.innerHTML +=
          text.charAt(currentLetter) == "|"
            ? "<br>"
            : text.charAt(currentLetter);

        if (currentLetter == text.length - 1) {
          isChangedToNewTextIndex = true;
        } else {
          currentLetter++;
        }
      }
    }
  });

  setTimeout(
    () => {
      writeText(
        arr_text,
        currentLetter,
        currentTextIndex,
        isChangedToNewTextIndex
      );
    },
    isChangedToNewTextIndex ? 1200 : 100
  );
}

function getFirstGreetingText() {
  const name = getNameFromParam();
  return name ? `Saya ${name} |Mengucapkan` : "Kami Mengucapkan";
}

function getNameFromParam() {
  const params = new URL(document.location).searchParams;

  return params.get("name");
}

function closeEnvelope() {
  const envelopeWrapperElement = document.getElementById("envelope-wrapper");
  const textWritingElement = document.querySelector(".text-writing");
  const audio = new Audio("./assets/music/1.mp3");

  audio.setAttribute("loop", true);
  audio.play();

  envelopeWrapperElement.classList.add("move-to-top");
  textWritingElement.classList.remove("d-none");

  showKetupat();
  startWriting();
}

function showKetupat() {
  setTimeout(() => {
    const arrKetupatElements =
      document.querySelector(".ketupat-wrapper").children;

    for (let i = 0; i < arrKetupatElements.length; i++) {
      ketupatElement = arrKetupatElements[i];

      ketupatElement.classList.add("show-ketupat");
    }
  }, 1000);
}
