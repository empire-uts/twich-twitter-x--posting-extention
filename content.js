// content.js

// メッセージを受信したときの処理
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === 'getStreamInfo') {
    // 現在のタブのURLを取得
    const streamUrl = window.location.href;
    
    // タイトル要素を取得
    const titleElement = document.querySelector('#live-channel-stream-information > div > div > div.Layout-sc-1xcs6mc-0.dRGOOY > div > div.Layout-sc-1xcs6mc-0.evfzyg > div.Layout-sc-1xcs6mc-0.iStNQt > div.Layout-sc-1xcs6mc-0.fxsRRM > div > div.Layout-sc-1xcs6mc-0.fAVISI > h2');

    // 取得した要素が存在するかを確認してから取得
    if (titleElement) {
      const title = titleElement.textContent.trim();
      sendResponse({ success: true, streamInfo: `${title}` });
    } else {
      sendResponse({ success: false, error: 'タイトル要素が見つかりませんでした' });
    }
  }
  // 非同期処理が終了するまでtrueを返す
  return true;
});
