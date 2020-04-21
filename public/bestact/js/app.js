const server = "https://kubalist.kbn.one"
const box1 = document.getElementById("box1")
if(typeof fetch !== 'function'){
  box1.innerText = "Internet Exproler は対応しておりません。 Edgeブラウザをご利用ください。"
}
async function main(){
  //console.log(location.pathname);
  switch(location.pathname){
  case '/bestact/':
    document.getElementById("create").addEventListener('click', async _=>{
      const json = await fetch(`${server}/api/create?cards=a,b,c,d,e,f,g,h`, {method: 'POST'}).then(r=>r.json())
      document.getElementById("url").value = `${location.href}room.html#${json.id}`
      var room_url = document.getElementById("url").value;
      
      var room_url_encode = room_url.replace( '#', '%23' );
      //console.log(room_url);
      $(".room_url").show();
      $(".room_url_text").text(room_url);
      $(".room_url_qr").html('<img src="https://chart.apis.google.com/chart?chs=120x120&chld=l|0&cht=qr&chl='+room_url_encode+'" alt="QR" />');
      $(".room_url_link").html('<a href="'+room_url+'">このルームにアクセスする</a>');
      const {key, id} = json
      const reload = document.getElementById("reset")
      reload.addEventListener("click", async e=>{
        e.preventDefault()
        reload.disabled = true
        const ret = await fetch(`${server}/api/reset?key=${key}&room=${id}`, {method: 'POST'}).then(r=>r.json())
        reload.disabled = false      
      })
      
      
    })
      
    break;
  case '/bestact/room.html':
    const res = await fetch(`${server}/api/join?room=${location.hash.slice(1)}`)
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
      document.getElementById("card_face").attributes['src'].value = `img/${json.card}.png`
      $('#card_back').on('click', function() {
        $('.card').toggleClass('is-surface').toggleClass('is-reverse');
      box1.innerText = "カードを配りました！"
      });
    }
  }
}
main();
