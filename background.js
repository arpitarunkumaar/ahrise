document.getElementById("sampleAlarm").addEventListener("click", function () {
  alert("Time to rest your eyes for 20 seconds!");
});

//Background javascript
const message = {
  type: "basic",
  iconUrl: "break.png",
  title: "It's time for a break",
  message: "Focus your eyes on something 10 metres away.",
  buttons: [{ title: "Relax your eyes!" }],
};

chrome.alarms.onAlarm.addListener((alarm) => {
  console.log(`${alarm.name} Break Triggered`);
  alert("Rest your eyes for 20 seconds.");
  chrome.notifications.create(message);
  //Msg to result.js
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { message: "alarm" });
  });
});

//Optional: Alarm system (sets the actual timer for next alert)
chrome.notifications.onClosed.addListener(() => {
  chrome.storage.sync.get(["minutes"], (item) => {
    if (item.minutes) {
      chrome.browserAction.setBadgeText({ text: "ON" });
      chrome.alarms.create({ delayInMinutes: item.minutes });
    }
  });
});

//Optional: Ensures program runs without stoppage
chrome.webNavigation.onHistoryStateUpdated.addListener(() => {
  chrome.tabs.executeScript(null, { file: "result.js" });
});
