'use strict';

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した HTML要素の子要素をすべて削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0){
        return;
    }

    //診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const result = assessment(userName);
    const paragraph = document.createElement('p');
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
     + encodeURIComponent('あなたのいいところ')
     + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText ='Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);
    twttr.widgets.load();
}

userNameInput.onkeydown = (event) => {
    if(event.key === 'Enter'){
        assessmentButton.onclick();
    }
}

const answers = [
    '{userName}さんのいいところは声です。{userName}さんの特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}さんのいいところはまなざしです。{userName}さんに見つめられた人は、気になって仕方がないでしょう。',
    '{userName}さんのいいところは情熱です。{userName}さんの情熱に周りの人は感化されます。',
    '{userName}さんのいいところは厳しさです。{userName}さんの厳しさがものごとをいつも成功に導きます。',
    '{userName}さんのいいところは知識です。博識な{userName}さんを多くの人が頼りにしています。',
    '{userName}さんのいいところはユニークさです。{userName}さんだけのその特徴が皆を楽しくさせます。',
    '{userName}さんのいいところは用心深さです。{userName}さんの洞察に、多くの人が助けられます。',
    '{userName}さんのいいところは見た目です。内側から溢れ出る{userName}さんの良さに皆が気を惹かれます。',
    '{userName}さんのいいところは決断力です。{userName}さんがする決断にいつも助けられる人がいます。',
    '{userName}さんのいいところは思いやりです。{userName}さんに気をかけてもらった多くの人が感謝しています。',
    '{userName}さんのいいところは感受性です。{userName}さんが感じたことに皆が共感し、わかりあうことができます。',
    '{userName}さんのいいところは節度です。強引すぎない{userName}さんの考えに皆が感謝しています。',
    '{userName}さんのいいところは好奇心です。新しいことに向かっていく{userName}さんの心構えが多くの人に魅力的に映ります。',
    '{userName}さんのいいところは気配りです。{userName}さんの配慮が多くの人を救っています。',
    '{userName}さんのいいところはその全てです。ありのままの{userName}さん自身がいいところなのです。',
    '{userName}さんのいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}さんが皆から評価されています。',
    '{userName}さんのいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す
 * @param {string} userName ユーザー名前
 * @returns {string} 診断結果
 */
function assessment(userName){
    let sumofCharCode = 0;
    for(let i = 0; i < userName.length; i++){
        sumofCharCode += userName.charCodeAt(i);
    }

    let index = sumofCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);
    return result;
}

//テストコード
console.assert(
    assessment('太郎') === assessment('太郎'),
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

