// メッセージを受信し、ポップアップのJavaScriptファイルに送信する
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'streamInfo') {
    // コンテンツスクリプトから送信された配信情報を受信し、ポップアップのJavaScriptファイルに送信する
    chrome.runtime.sendMessage({ action: 'streamInfo', data: message.data });
  }
});
