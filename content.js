{
  let shortcutkey;
  chrome.storage.sync.get({ shortcutkey: 'i' }, function (items) {
    shortcutkey = items.shortcutkey;
  });
  const keyListener = async (e) => {
    if (!e.repeat && e.key === shortcutkey) {
      let targetURL = null;

      if (document.querySelector('.EntryTitleLink--selected') !== null) {
        // ETLS: Title-Only View(Select by N - P), Magazine View, Cards View
        targetURL = document.querySelector('.EntryTitleLink--selected').href;
      } else if (e.target.classList.contains('InlineArticle')) {
        // AT: Article View
        targetURL = e.target.querySelector('.Article__title').href;
      } else if (document.querySelector('.InlineArticle') !== null) {
        // IA: Title-Only View(Select by J - K)
        targetURL = document.querySelector('.InlineArticle').querySelector('.Article__title').href;
      }
      if (targetURL !== null) {
        await chrome.runtime.sendMessage({ url: targetURL });
        const xKeyEvent = new KeyboardEvent('keydown', {
          key: 'x',
          code: 'KeyX',
          bubbles: true,
          cancelable: true
        });
        document.body.dispatchEvent(xKeyEvent);
      } else {
        console.log('targetURL is Null');
      }
    }
  };

  window.addEventListener('keydown', keyListener, false);
}
