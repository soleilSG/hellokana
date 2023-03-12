import './styles.css'

const HIRAGANAS = [
  'あ', 'い', 'う', 'え', 'お',
  'か', 'き', 'く', 'け', 'こ',
  'が', 'ぎ', 'ぐ', 'げ', 'ご',
  'さ', 'し', 'す', 'せ', 'そ',
  'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
  'た', 'ち', 'つ', 'て', 'と',
  'だ', 'ぢ', 'づ', 'で', 'ど',
  'な', 'に', 'ぬ', 'ね', 'の',
  'は', 'ひ', 'ふ', 'へ', 'ほ',
  'ば', 'び', 'ぶ', 'べ', 'ぼ',
  'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ',
  'ま', 'み', 'む', 'め', 'も',
  'や', ' ', 'ゆ', ' ', 'よ',
  'ら', 'り', 'る', 'れ', 'ろ',
  'わ', ' ', 'ん', ' ', 'を'
]
const KATAKANAS = [
  'ア', 'イ', 'ウ', 'エ', 'オ',
  'カ', 'キ', 'ク', 'ケ', 'コ',
  'ガ', 'ギ', 'グ', 'ゲ', 'ゴ',
  'サ', 'シ', 'ス', 'セ', 'ソ',
  'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ',
  'タ', 'チ', 'ツ', 'テ', 'ト',
  'ダ', 'ヂ', 'ヅ', 'デ', 'ド',
  'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
  'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
  'バ', 'ビ', 'ブ', 'ベ', 'ボ',
  'パ', 'ピ', 'プ', 'ペ', 'ポ',
  'マ', 'ミ', 'ム', 'メ', 'モ',
  'ヤ', ' ', 'ユ', ' ', 'ヨ',
  'ラ', 'リ', 'ル', 'レ', 'ロ',
  'ワ', ' ', 'ン', ' ', 'ヲ'
]
const ROMAJIS = [
  'a', 'i', 'u', 'e', 'o',
  'ka', 'ki', 'ku', 'ke', 'ko',
  'ga', 'gi', 'gu', 'ge', 'go',
  'sa', 'shi', 'su', 'se', 'so',
  'za', 'ji', 'zu', 'ze', 'zo',
  'ta', 'chi', 'tsu', 'te', 'to',
  'da', 'ji', 'zu', 'de', 'do',
  'na', 'ni', 'nu', 'ne', 'no',
  'ha', 'hi', 'hu', 'he', 'ho',
  'ba', 'bi', 'bu', 'be', 'bo',
  'pa', 'pi', 'pu', 'pe', 'po',
  'ma', 'mi', 'mu', 'me', 'mo',
  'ya', ' ', 'yu', ' ', 'yo',
  'ra', 'ri', 'ru', 're', 'ro',
  'wa', ' ', 'n', ' ', 'wo'
]

const KANAS = [HIRAGANAS, KATAKANAS, ROMAJIS]

function toggleCard(event) {
  const btnID = this.id
  const cardID = btnID.substring(0, btnID.indexOf('-'))
  const card = document.getElementById(cardID)
  if (card.style.display === "none")
    card.style.display = "block"
  else
    card.style.display = "none"
}

function showKana() {
  const KANANUM = HIRAGANAS.length
  let kanaIndex = 0;
  do {
    kanaIndex = Math.floor(Math.random() * KANANUM)
  } while (kanaIndex == 61 || kanaIndex == 63 || kanaIndex == 71 || kanaIndex == 73)
  const kanaType = Math.floor(Math.random() * 3)
  const hiragana = KANAS[0][kanaIndex]
  const katakana = KANAS[1][kanaIndex]
  const romaji = KANAS[2][kanaIndex]

  const hiraganaCard = document.querySelector('#hiragana')
  const katakanaCard = document.querySelector('#katakana')
  const romajiCard = document.querySelector('#romaji')

  hiraganaCard.innerHTML = hiragana
  katakanaCard.innerHTML = katakana
  romajiCard.innerHTML = romaji

  switch (kanaType) {
    case 0:
      katakanaCard.style.display = "none"
      romajiCard.style.display = "none"
      break;
    case 1:
      hiraganaCard.style.display = "none"
      romajiCard.style.display = "none"
      break;
    case 2:
      hiraganaCard.style.display = "none"
      katakanaCard.style.display = "none"
      break;
  }
}

function generateHiraganaChart() {
  const kanaChartTbl = document.querySelector('#hiragana-chart-tbl')
  const kanaChartTblBody = kanaChartTbl.tBodies[0]

  for (let i = 0; i < 5; i++) {
    let row = kanaChartTblBody.insertRow();
    for (let j = 0; j < 15; j++) {
      row.insertCell()
    }
  }

  const kanaChartTblRows = kanaChartTbl.rows
  for (let k = 0; k < HIRAGANAS.length; k++) {
    let r = Math.trunc(k / 5)
    let c = k % 5
    kanaChartTblRows[c + 1].cells[14 - r].innerHTML = HIRAGANAS[k]
  }
}

function generateKatakanaChart() {
  const kanaChartTbl = document.querySelector('#katakana-chart-tbl')
  const kanaChartTblBody = kanaChartTbl.tBodies[0]

  for (let i = 0; i < 5; i++) {
    let row = kanaChartTblBody.insertRow();
    for (let j = 0; j < 15; j++) {
      row.insertCell()
    }
  }

  const kanaChartTblRows = kanaChartTbl.rows
  for (let k = 0; k < KATAKANAS.length; k++) {
    let r = Math.trunc(k / 5)
    let c = k % 5
    kanaChartTblRows[c].cells[14 - r].innerHTML = KATAKANAS[k]
  }
}



document.querySelector('#hiragana-btn').addEventListener("click", toggleCard)
document.querySelector('#katakana-btn').addEventListener("click", toggleCard)
document.querySelector('#romaji-btn').addEventListener("click", toggleCard)

document.querySelector('#kana-main').addEventListener('click', showKana)

generateHiraganaChart()
generateKatakanaChart()