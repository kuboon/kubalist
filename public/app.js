const server = location.origin
const e = id => document.getElementById(id);
if(typeof fetch !== 'function'){
  e("message").innerText = "Internet Exproler は対応しておりません。 Edgeブラウザをご利用ください。"
}
function message(text){
  e("message").innerText = text
  setTimeout(_=>{
    e("message").innerText = ""
  }, 5000)
}

const tags = new Tagify(e("cards"), {duplicates: true});

let reset_url
async function create(){
  const cards = tags.value.map(_=>_.value)
  const json = await fetch(`${server}/api/create?cards=${cards}`, {method: 'POST'}).then(r=>r.json())
  e("room_url").value = `${server}/room.html#${json.id}`
  e("room").style.display = "block"
  reset_url = `${server}/api/reset?key=${json.key}&room=${json.id}`
  message("ルームを作成しました")
}
async function reset(){
  const json = await fetch(reset_url, {method: 'POST'}).then(r=>r.json())
  if(json.ok){
    message("カードを配りなおしました。各自リロードしてください。")
  }else{
    message("カードの配りなおし失敗")
  }
}
