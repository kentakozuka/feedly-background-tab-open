{
  const receiveRequest = (message, sender, response) => {
    chrome.tabs.create({ url: message.url, active: false });
  };
  chrome.runtime.onMessage.addListener(receiveRequest);
}
