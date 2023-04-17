// Saves options to chrome.storage
function save_options() {
  const status = document.getElementById('status');
  const shortcutkey = document.getElementById('shortcutkey').value.trim();
  if (shortcutkey.length !== 1) {
    status.textContent = 'Shortcut key must be single character.';
    status.classList.add('failed')
    setTimeout(function () {
      status.textContent = '';
      status.classList.remove('failed')
    }, 2000);
    return;
  }
  chrome.storage.sync.set({ shortcutkey: shortcutkey }, function () {
    // Update status to let user know options were saved.
    status.textContent = 'Shortcut key saved.';
    setTimeout(function () {
      status.textContent = '';
    }, 2000);
  });
}

function restore_options() {
  // Use default shortcut key 'i'
  chrome.storage.sync.get({ shortcutkey: 'i' }, function (items) {
    document.getElementById('shortcutkey').value = items.shortcutkey;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('set').addEventListener('click', save_options);
