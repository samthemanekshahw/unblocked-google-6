const dataset = document.currentScript.dataset;
const preferred_width = dataset.width;
const preferred_height = dataset.height;
const preferred_aspect_ratio = preferred_width * 1.0 / preferred_height;
const preferred_window_fit = dataset.windowFit;
const target = dataset.target;

function resizeCanvas() {
  let width = preferred_width;
  let height = preferred_height;
  let window_fit = preferred_window_fit;

  // 固定サイズでもウィンドウをはみ出す場合は縦横比維持モードで表示
  if (window_fit == 'none' &&
    ($(window).width() < preferred_width || $(window).height() < preferred_height)
  ) {
    window_fit = 'contain';
  }

  if (window_fit == 'none') {
    //default
  } else if (window_fit == 'fill') {
    width = $(window).width();
    height = $(window).height();
  } else if (window_fit == 'contain') {
    window_aspect_ratio = $(window).width() * 1.0 / $(window).height();
    if (window_aspect_ratio >= preferred_aspect_ratio) {
      //ゲーム設定より横長のディスプレイ＝左右に黒帯
      width = preferred_width * 1.0 * $(window).height() / preferred_height;
      height = $(window).height();
    } else {
      //ゲーム設定より縦長のディスプレイ＝上下に黒帯
      width = $(window).width();
      height = preferred_height * 1.0 * $(window).width() / preferred_width;
    }
  } else {
    console.log(`unknown window_fit: ${window_fit}`)
  }

  $(target).width(`${width}px`);
  $(target).height(`${height}px`);
}

$(document).ready(function () {
  resizeCanvas();
});
$(window).resize(function () {
  resizeCanvas();
});
