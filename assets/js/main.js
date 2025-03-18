// モバイルメニュー
class MobileMenu {
    constructor() {
      this.DOM = {};
      this.DOM.btn = document.querySelector(".header__hamburger");
      this.DOM.cover = document.querySelector(".header__mobile-menu--cover");
      this.DOM.container = document.querySelector("#header");
      this.eventType = this._getEventType();
      this._addEvent();
    }
  
    _getEventType() {
      const isTouchCapable = "ontouchstart" in window;
  
      return isTouchCapable ? "touchstart" : "click";
    }
  
    _toggle() {
      this.DOM.container.classList.toggle("menu-open");
    }
  
    _addEvent() {
      this.DOM.btn.addEventListener(this.eventType, this._toggle.bind(this));
      this.DOM.cover.addEventListener(this.eventType, this._toggle.bind(this));
    }
}
  
new MobileMenu();
  
// アコーディオンメニュー
document.querySelectorAll('.accordion-header').forEach(button => {
  button.addEventListener('click',function(){
    this.classList.toggle('active');
  });
});


// contactページのタブ切り替え

// 任意のタブにURLからリンクするための設定
function getHashID(hashIDName) {
  if (hashIDName) {
    // タブ設定
    document.querySelectorAll('.contact__tab-list li a').forEach(function (anchor) {
      const idName = anchor.getAttribute('href'); // 例: #lunch
      
      if (idName === hashIDName) {
        const parentElm = anchor.parentElement; // liタグ
        
        // タブ内のliからactiveクラスを全削除
        document.querySelectorAll('.contact__tab-list li').forEach(function (li) {
          li.classList.remove('active');
        });

        // クリックしたタブにactiveクラスを追加
        parentElm.classList.add('active');

        // 表示エリアの設定
        document.querySelectorAll('.contact__form-area').forEach(function (area) {
          area.classList.remove('is-active');
        });

        // 該当の表示エリアにis-activeクラスを追加
        const targetArea = document.querySelector(hashIDName);
        if (targetArea) {
          targetArea.classList.add('is-active');
        }
      }
    });
  }
}

// タブをクリックしたときの動作
document.querySelectorAll('.contact__tab-list a').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    
    const idName = this.getAttribute('href');
    getHashID(idName); // タブ切り替え処理
  });
});

// ページが読み込まれたら最初のタブとエリアをアクティブにし、URLハッシュをチェック
window.addEventListener('load', function () {
  // 最初のタブをactiveに
  const firstTab = document.querySelector('.contact__tab:first-of-type');
  if (firstTab) {
    firstTab.classList.add('active');
  }

  // 最初の表示エリアをis-activeに
  const firstArea = document.querySelector('.contact__form-area:first-of-type');
  if (firstArea) {
    firstArea.classList.add('is-active');
  }

  // URLにハッシュがある場合は、そのタブをアクティブにする
  const hashName = window.location.hash;
  getHashID(hashName);
});


// スクロールフェードイン

document.addEventListener('DOMContentLoaded', function() {
  const fadeInElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-active');
      } else {
        entry.target.classList.remove('is-active');
      }
    });
  }, {
    threshold: 0.3
  });

  fadeInElements.forEach(element => {
    observer.observe(element);
  });
});
