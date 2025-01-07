(function () {
  function generateArrayWithTwoDuplicates() {
    const uniqueNumbers = [];
    // Генерируем 15 уникальных чисел
    while (uniqueNumbers.length < 15) {
      const number = Math.floor(Math.random() * 100); // Случайное число от 0 до 99
      if (!uniqueNumbers.includes(number)) {
        uniqueNumbers.push(number);
      }
    }
    // Выбираем случайное число из уникальных, чтобы создать дубликат
    const duplicate =
      uniqueNumbers[Math.floor(Math.random() * uniqueNumbers.length)];

    // Добавляем дубликат в массив
    const resultArray = [...uniqueNumbers, duplicate];

    // Перемешиваем массив для случайного распределения чисел
    for (let i = resultArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [resultArray[i], resultArray[j]] = [resultArray[j], resultArray[i]];
    }

    return resultArray;
  }

  const randomArray = generateArrayWithTwoDuplicates();
  //console.log("randomArray", randomArray);

  function showCelebration() {
    // Создаем затемненный полупрозрачный фон
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = 9999;
  
    // Создаем контейнер для фанфар и конфетти
    const celebrationContainer = document.createElement("div");
    celebrationContainer.style.textAlign = "center";
  
    // Добавляем текст "Поздравляем!"
    const message = document.createElement("h1");
    message.textContent = "🎉 Поздравляем! Вы нашли пару! 🎉";
    message.style.color = "white";
    message.style.fontSize = "4rem";
    message.style.textShadow = "2px 2px 10px rgba(0, 0, 0, 0.8)";
    celebrationContainer.appendChild(message);
  
    // Добавляем анимацию конфетти (смайлики)
    const emojiArray = ["🎆", "🎇", "🎉", "✨", "🎊", "🌟", "🥳"];
    for (let i = 0; i < 50; i++) {
      const emoji = document.createElement("div");
      emoji.textContent = emojiArray[Math.floor(Math.random() * emojiArray.length)];
      emoji.style.position = "absolute";
      emoji.style.fontSize = "2rem";
      emoji.style.animation = "falling 2s linear infinite";
      emoji.style.left = Math.random() * 100 + "%";
      emoji.style.top = Math.random() * 100 + "%";
      emoji.style.animationDelay = Math.random() + "s";
      celebrationContainer.appendChild(emoji);
    }
  
    // Добавляем стили для анимации
    const style = document.createElement("style");
    style.textContent = `
      @keyframes falling {
        0% {
          transform: translateY(-100vh) rotate(0deg);
        }
        100% {
          transform: translateY(100vh) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);
  
    overlay.appendChild(celebrationContainer);
    document.body.appendChild(overlay);
  
    // Убираем фанфары через 5 секунд
    setTimeout(() => {
      overlay.remove();
      style.remove();
    }, 5000);
  }

  const createItemCart = (backNumber) => {
    const elementCard = document.createElement("div");
    elementCard.classList.add(
      "flex",
      "group",
      "relative",
      "w-36",
      "h-36",
      "rounded-lg",
      "bg-red-800/40",
      "cursor-pointer",
      "justify-center",
      "hover:bg-red-800/60",
      "items-center",
      "shadow-md",
      "perspective"
    );
    // Передняя сторона карточки
    const front = document.createElement("div");
    front.classList.add(
      "absolute",
      "w-full",
      "h-full",
      "rounded-lg",
      "flex",
      "justify-center",
      "items-center",
      "backface-hidden",
      "transition-transform",
      "duration-700"
    );
    const back = document.createElement("div");
    back.classList.add(
      "back",
      "absolute",
      "w-full",
      "h-full",
      "rounded-lg",
      "flex",
      "bg-red-800/50",
      "justify-center",
      "items-center",
      "text-white",
      "text-3xl",
      "font-bold",
      "rotate-x-180",
      "backface-hidden",
      "transition-transform",
      "duration-700"
    );
    back.textContent = backNumber;

    const img = document.createElement("img");
    img.src = "img/star.svg";
    img.alt = "star";
    img.style.opacity = "0.4"; // Устанавливаем 40% прозрачности
    img.classList.add("p-3");
    elementCard.append(front, back);
    front.appendChild(img);

    return elementCard;
  };

  const createButtonRestart = () => {
    const gamerestart = document.createElement("div");
    gamerestart.classList.add("gamerestart");
    gamerestart.id = "gamerestartbutton";
    const button = document.createElement("button");
    button.classList.add(
      "flex",
      "justify-center",
      "items-center",
      "text-white",
      "text-2xl",
      "font-normal",
      "bg-indigo-800/70",
      "rounded-2xl",
      "px-6",
      "py-3",
      "shadow-md",
      "hover:bg-indigo-700/70",
      "hover:scale-y-105"
    );
    button.textContent = "Сыграть еще";
    gamerestart.append(button);
    button.onclick = () => {
      history.go(0);
    };

    return gamerestart;
  };

  const createCardsApp = (cardsclass, gamebutton) => {
    let openCards = [];
    let lockBoard = false;

    for (let i = 0; i < 16; i++) {
      const itemCard = createItemCart(randomArray[i]);

      itemCard.addEventListener("click", () => {
        if (lockBoard || itemCard.classList.contains("flipped")) return;

        itemCard.classList.add("flipped");
        openCards.push(itemCard);
        //console.log("openCards", openCards);

        if (openCards.length === 2) {
          const [firstCard, secondCard] = openCards;
          const firstNumber = firstCard.querySelector(".back").textContent;
          const secondNumber = secondCard.querySelector(".back").textContent;

          if (firstNumber !== secondNumber) {
            lockBoard = true; // Блокируем доску
            //console.log("lockBoard", lockBoard);
            setTimeout(() => {
              firstCard.classList.remove("flipped");
              secondCard.classList.remove("flipped");
              openCards = [];
              lockBoard = false; // Разблокируем доску
            }, 3000);
          } else {
            gamebutton.append(buttonRestart);
            showCelebration();
            console.log("вы нашли пару!");
            return;
          }
        }
      });

      cardsclass.append(itemCard);
    }

    const buttonRestart = createButtonRestart();
  };

  window.createCardsApp = createCardsApp;
})();
