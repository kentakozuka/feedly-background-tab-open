{
  let shortcutkey;
  chrome.storage.sync.get({ shortcutkey: 'i' }, function (items) {
    shortcutkey = items.shortcutkey;
  });
  const keyListener = e => {
    if (!e.repeat && e.key === shortcutkey) {
      let targetURL = null;

      if (document.querySelector('.EntryTitleLink--selected') !== null) { // Title-Only View(Select by N - P), Magazine View (Select by N - P & Select by J - K), Cards View(Select by N - P & Select by J - K)
        targetURL = document.querySelector('.EntryTitleLink--selected').href;
      } else if (document.querySelector('.InlineArticle') !== null) { // Title-Only(Select by J - K), Article View (Select by N - P & Select by J - K)
        targetURL = document.querySelector('.InlineArticle').querySelector('.Article__title').href;
      }
      if (targetURL !== null) {
        chrome.runtime.sendMessage({ url: targetURL });
      } else {
        console.log('targetURL is Null');
      }
    }
  };

  window.addEventListener('keydown', keyListener, false);
}
