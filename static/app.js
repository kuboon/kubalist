const server = location.origin;
const e = (id) => document.getElementById(id);
if (typeof fetch !== "function") {
  e("message").innerText =
    "Internet Exproler は対応しておりません。 Edgeブラウザをご利用ください。";
}
function message(text) {
  const el = e("message");
  el.innerText = text;
  el.classList.add("show");
  setTimeout((_) => {
    el.classList.remove("show");
  }, 5000);
}

const tags = new Tagify(e("cards"), { duplicates: true });

let reset_url, list;
async function create() {
  const cards = tags.value.map((_) => _.value);
  const json = await fetch(`${server}/api/create?cards=${cards}`, {
    method: "POST",
  }).then((r) => r.json());
  e("room_url").value = `${server}/room.html#${json.id}`;
  e("room").style.display = "block";
  e("list").style.display = "block";
  e("table").hidden = true;
  reset_url = `${server}/api/reset?key=${json.key}&room=${json.id}`;
  list = json.cards.map((c, i) => ({ card: c, number: json.numbers[i] }));
  message("ルームを作成しました");
}
function view() {
  e("table").innerHTML = list.sort((a, b) => a.number - b.number).map((l) =>
    `<tr>
    <th>${l.number}</th><td>${l.card}</td>
    </tr>`
  ).join("");
  e("table").hidden = false;
}
async function reset(button) {
  button.disabled = true;
  const json = await fetch(reset_url, { method: "POST" }).then((r) => r.json())
    .catch((_) => {});
  if (json) {
    message("カードを配りなおしました。各自リロードしてください。");
    list = json.cards.map((c, i) => ({ card: c, number: json.numbers[i] }));
    e("table").hidden = true;
  } else {
    message("カードの配りなおし失敗");
  }
  button.disabled = false;
}
async function save() {
  const cards = tags.value.map((_) => _.value);
  const name = e("name").value;
  //history.pushState({name, cards}, name, )
  location.href = `${server}/saved/${name}/${cards}`;
}
