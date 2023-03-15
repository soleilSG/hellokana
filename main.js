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

function fillKanaChartTbl(tbl, kanaArray) {
  const rows = []
  for (let i = 0; i < 5; i++) {
    rows[i] = tbl.insertRow()
    for (let j = 0; j < 15; j++) {
      let cell = rows[i].insertCell()
      if (i == 4) {
        cell.style.borderBottom = "2px solid"
      }
    }
  }

  for (let k = 0; k < kanaArray.length; k++) {
    let c = Math.trunc(k / 5)
    let r = k % 5
    rows[r].cells[14 - c].innerHTML = kanaArray[k]
  }
}

function generateKanaChart() {
  const kanaChartTbl = document.querySelector('#kana-chart-tbl')
  const kanaChartTblBody = kanaChartTbl.tBodies[0]

  fillKanaChartTbl(kanaChartTblBody, HIRAGANAS)
  fillKanaChartTbl(kanaChartTblBody, KATAKANAS)
  fillKanaChartTbl(kanaChartTblBody, ROMAJIS)
}

function toggleDakuon(event) {
  let displayValue = "none"
  if (event.target.checked) {
    displayValue = ""
  }

  const dakuonCols = [4, 5, 8, 10, 12]
  const kanaChartRows = document.querySelector('#kana-chart-tbl').rows
  for (let i = 0; i < kanaChartRows.length; i++) {
    let cells = kanaChartRows[i].cells
    dakuonCols.forEach(dc => {
      let cell = cells[dc]
      cell.style.display = displayValue
    })
  }
}

function toggleKanaChart() {
  let kanaChart = document.querySelector('#kana-chart-container')
  let kanaChartVisibility = kanaChart.style.visibility
  if (kanaChartVisibility === "") {
    kanaChartVisibility = "hidden"
  } else {
    kanaChartVisibility = ""
  }
  kanaChart.style.visibility = kanaChartVisibility
}

function playKanaVoice() {
  const kanaVoice = new Audio('https://0.tqn.com/z/g/japanese/library/media/audio/a.mp3')
  kanaVoice.play()
}

document.querySelector('#hiragana-btn').addEventListener('click', toggleCard)
document.querySelector('#katakana-btn').addEventListener('click', toggleCard)
document.querySelector('#romaji-btn').addEventListener('click', toggleCard)
document.querySelector('#kanaChart-btn').addEventListener('click', toggleKanaChart)
document.querySelector('#kanaVoice-btn').addEventListener('click', playKanaVoice)

document.querySelector('#kana-cards-container').addEventListener('click', showKana)

generateKanaChart()
document.querySelector('#dakuonToggle').addEventListener('input', toggleDakuon)