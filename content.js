{
  const hotkey = 'i';

  const keyListener = e => {
    if (!e.repeat && e.key === hotkey) {
      let targetURL = null;

      if (document.getElementById('EntryTitleLink-selected') !== null) {
        targetURL = document.getElementById('EntryTitleLink-selected').href;
      } else if (e.target.classList.contains('InlineArticle')) {
        targetURL = e.target.querySelector('.Article__title').href;
      } else if (document.querySelector('.InlineArticle') !== null) {
        targetURL = document.querySelector('.InlineArticle').querySelector('.Article__title').href;
      }
      if (targetURL !== null) {
        chrome.runtime.sendMessage({ url: targetURL });
      }
    }
  };

  window.addEventListener('keydown', keyListener, false);
}
