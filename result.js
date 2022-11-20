const createModal = element => {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    const content = document.createElement("div");
    content.classList.add("modal-content");
    content.innerHTML = element;
    modal.appendChild(content);
    document.body.appendChild(modal);
  };
  
  const removeModal = () => {
    const modalElements = document.getElementsByClassName("modal");
    Array.from(modalElements).forEach(el => el.remove());
  };
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message) {
      let timeleft = 20;
      const timerFn = setInterval(() => {
        if (timeleft <= 0) {
          createModal("Nice job! Keep up the good work.");
          clearInterval(timerFn);
          setTimeout(() => {
            removeModal();
          }, 3000);
        } else {
          createModal(timeleft);
        }
        timeleft--;
      }, 1000);
    }
  });