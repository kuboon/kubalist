async function main(){
  switch(location.pathname){
  case '/':
    document.getElementById("create").addEventListener('click', async _=>{
      const json = await fetch("/api/create?cards=a,b,c,d,e,f,g,h", {method: 'POST'}).then(r=>r.json())
      document.getElementById("url").value = `${location.href}room.html#${json.id}`
    })
    break;
  case '/room.html':
    const box1 = document.getElementById("box1")
    const res = await fetch(`/api/join?room=${location.hash.slice(1)}`)
    switch(res.status){
    case 404:
      box1.innerText = "URLをご確認ください。"
      break;
    case 400:
      box1.innerText = "もうカードがありません。"
      break;
    default:
      box1.innerText = "カードをタップしてください。"
      const json = await res.json()
      document.getElementById("card_face").attributes['src'].value = `/img/${json.card}.png`
      $('#card_back').on('click', function() {
        $('.card').toggleClass('is-surface').toggleClass('is-reverse');
      });
    }
  }
}
main();
