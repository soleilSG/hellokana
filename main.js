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

const kanaCards = []
kanaCards[0] = document.querySelector('#hiragana-card')
kanaCards[1] = document.querySelector('#katakana-card')
kanaCards[2] = document.querySelector('#romaji-card')

// current kana being learned, range from 0 to 75.
// when the page is loaded at the first time, kanaIndex is set to -1 as the default value.
let kanaIndex = -1

// User's selection of kana types
let kanaOptions = ['0', '1', '2']

function toggleCard(event) {
  const btnID = this.id
  const cardID = btnID.substring(0, btnID.indexOf('-'))
  const card = document.getElementById(cardID + '-card')
  if (card.style.display === "none")
    card.style.display = "block"
  else
    card.style.display = "none"
}

/*
 Once an user clicks the kanaCards UI component, this function will be invoked.
 The process logic is as following:
 1. Clean the highlighted kanas (if kanaIndex > 0) in the kanaChart UI part;
 2. Randomly generate an integer ranged from 0 to 74 inclusive to represent the index of the kana to be learned;
 3. Highlight the kanas in kanaChart UI part;
 4. According to user's selection, display kana in one kanaCard UI part;
*/
function showKana() {
  const kanaChartRows = document.querySelector('#kana-chart-tbl').rows

  // 1. Clean highlighted kana cells
  if (kanaIndex > 0) {
    var kanaCells = locateKanaCells()
    kanaCells.forEach(c => {
      kanaChartRows[c.r].cells[c.c].style.border = "1px solid black"
    })
  }

  // 2. Randomly generate a kana index
  const KANANUM = HIRAGANAS.length
  do {
    kanaIndex = Math.floor(Math.random() * KANANUM)
  } while (kanaIndex == 61 || kanaIndex == 63 || kanaIndex == 71 || kanaIndex == 73)

  // 3. Highlight kana cells
  kanaCells = locateKanaCells()
  kanaCells.forEach(c => {
    kanaChartRows[c.r].cells[c.c].style.border = "3px solid red"
  })

  // 4. Display kana card
  // 4.1 Assign hiragana, katakana and romaji to kanaCards accordingly
  const hiragana = KANAS[0][kanaIndex]
  const katakana = KANAS[1][kanaIndex]
  const romaji = KANAS[2][kanaIndex]

  kanaCards[0].innerHTML = hiragana
  kanaCards[1].innerHTML = katakana
  kanaCards[2].innerHTML = romaji

  // 4.2 According to the user's selection, display only one kanaCard
  let kanaType = 0
  const kanaOptionsLength = kanaOptions.length
  switch (kanaOptionsLength) {
    case 0:
      break;
    case 1:
      kanaType = parseInt(kanaOptions[0], 10)
      break;
    case 2:
      kanaType = parseInt(kanaOptions[Math.floor(Math.random() * 2)], 10)
      break;
    case 3:
      kanaType = parseInt(kanaOptions[Math.floor(Math.random() * 3)], 10)
      break;
  }

  for (let i = 0; i < kanaCards.length; i++) {
    if (kanaType === i) {
      kanaCards[i].style.display = "block"
    } else {
      kanaCards[i].style.display = "none"
    }
  }
}

function locateKanaCells() {
  const r = kanaIndex % 5
  const c = Math.trunc(kanaIndex / 5)
  const hiraganaCell = { r: r + 1, c: 14 - c }
  const katakanaCell = { r: r + 1 + 5, c: 14 - c }
  const romajiCell = { r: r + 1 + 10, c: 14 - c }

  const kanaCells = [hiraganaCell, katakanaCell, romajiCell]

  return kanaCells
}

function selectKanaTypes(event) {
  // console.log(`id:${event.target.id}, value:${event.target.value}, checked:${event.target.checked}`)

  const v = event.target.value
  const c = event.target.checked
  if (c) {
    if (kanaOptions.indexOf(v) === -1) {
      kanaOptions.push(v)
    }
  } else {
    let i = kanaOptions.indexOf(v)
    if (i !== -1) {
      kanaOptions.splice(i, 1)
    }
  }

  // console.log(kanaOptions)
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

document.querySelector('#hiraganaOption').addEventListener('input', selectKanaTypes)
document.querySelector('#katakanaOption').addEventListener('input', selectKanaTypes)
document.querySelector('#romajiOption').addEventListener('input', selectKanaTypes)