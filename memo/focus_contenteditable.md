# contenteditable要素へのフォーカスがpointerdownイベント時に思うようにできなかった問題

## 解決

　なぜかclickイベントだと成功した。

　そのせいか、`pointerdown`イベント時に`click`イベントを発火させることでフォーカスをセットできた。

```javascript
this.shadowRoot.getElementById('toot-button').addEventListener('click', (event)=>{ console.log('click', event.target); this.#show(event.target) });
this.shadowRoot.getElementById('toot-button').addEventListener('pointerdown', (event) => {
    this.shadowRoot.getElementById('status').dispatchEvent(new Event('click'))
});
```

## 問題

　以下だと`pointerdown`時にフォーカスが当たらない。`click`時と同じ`#show()`メソッドを実行しているのに。なぜ？

```javascript
this.shadowRoot.getElementById('toot-button').addEventListener('click', (event)=>{ console.log('click', event.target); this.#show(event.target) });
this.shadowRoot.getElementById('toot-button').addEventListener('pointerdown', (event) => {this.#show(event.target)});
    this.shadowRoot.getElementById('status').dispatchEvent(new Event('click'))
});
```

　`target`を渡しているが、これはアニメ用にクラス属性値をセットしているだけ。フォーカスとは関係ないと思う。一応`event.target`を探ってみると、`click`と`pointerdown`では違いがあった。

```javascript
this.shadowRoot.getElementById('toot-button').addEventListener('click', (event)=>{ console.log('click', event.target); this.#show(event.target) });
this.shadowRoot.getElementById('toot-button').addEventListener('pointerdown', (event) => { console.log('click', event.target); this.#show(event.target) });
```

イベント|`event.target`
--------|--------------
`click`|`button`
`pointerdown`|`img`

　`click`イベントの発火方法はキーボードでTABキーを押し、ボタンにフォーカスを当てて、スペースキーを押すと発火する。

　`pointerdown`イベントはマウスでクリックすると発火する。

イベント|対応デバイス
--------|--------------
`click`|マウス、キーボード
`pointerdown`|マウス、タブレット（指タッチ、ペン）

　スマホにはキーボードがないため`pointerdown`でOK。でもPCにはキーボードがあるため`click`であるべき。スマホとPCに対応するためには`click`と`pointerdown`が必要。

## フォーカス

```javascrpit
const status = this.shadowRoot.getElementById('status');
...
status.focus();
```

　上記でいけた。

　ネットには以下のようにキャレット位置を変えるコードもあった。が、べつになくてもフォーカスはセットできた。

```javascrpit
    #setCaretStart(target) {
        target.focus();
        //status.setSelectionRange(0, 0);
        var range = document.createRange()
        var sel = window.getSelection()
        range.setStart(target.childNodes[0], 0)
        //range.setEnd(target.childNodes[0], 0)
        range.collapse(true)
        sel.removeAllRanges()
        sel.addRange(range)
        console.log('キャレットを先頭にセットした。', target, sel, range, target.childNodes[0])
    }
```

