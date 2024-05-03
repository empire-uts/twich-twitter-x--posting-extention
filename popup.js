// popup.js

const streamInfoTextarea = document.getElementById('streamInfo');
const getStreamInfoButton = document.getElementById('getStreamInfoButton');
const openTwitterButton = document.getElementById('openTwitterButton');

getStreamInfoButton.addEventListener('click', getStreamInfo);
openTwitterButton.addEventListener('click', openTwitter);

function getStreamInfo() {
  // コンテンツスクリプトにメッセージを送信
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'getStreamInfo' }, function(response) {
      if (response && response.success) {
        // 配信情報が正常に取得された場合、テキストエリアに表示
        streamInfoTextarea.value = response.streamInfo;
      } else {
        alert('配信情報の取得に失敗しました');
      }
    });
  });
}

function openTwitter() {
  // 現在のタブのURLを取得
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const streamUrl = tabs[0].url;
    const streamInfo = streamInfoTextarea.value;
    if (!streamInfo) {
      alert('配信情報がありません');
      return;
    }

    const tweetText = `\n${streamInfo}\n${streamUrl}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
  });
}
