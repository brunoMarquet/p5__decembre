let tab_prop = [];
let Un_client = "";

init_cart();

function init_cart() {
  let info_cli = [];
  url = "http://localhost:3000/api/teddies/order";
  edit_titre("votre panier");

  info_cli = localStorage.getItem("contact");
  if (info_cli != "") {
    Un_client = JSON.parse(info_cli);

    for (let key in Un_client) {
      if (Un_client.hasOwnProperty(key)) {
        valeur = Un_client[key];
        tab_prop.push(key);
        console.log(key, valeur);
        document.getElementById(key).value = valeur;
      }
    }
    //document.getElementById("order").addEventListener("click", order_panier);
    //if(){'<input type="checkbox" id="condtions_acept" name="vehicle1" value="accepter nos conditions'/>}
  }

  document.getElementById("header").innerHTML = ecrire_header();
  document.getElementById("footer").innerHTML = ecrire_footer();
}
function test_order() {
  vm = tab_prop.length;
  for (i = 0; i < vm; i++) {
    key = tab_prop[i];
    valeur = document.getElementById(key).value;
    console.log(valeur);
    if (Un_client.hasOwnProperty(key)) {
      Un_client[key] = valeur;
    }
  }
  localStorage.setItem("contact", JSON.stringify(Un_client));
}
//event.stopPropagation();
/*  console.log("panier");
  vm = tab_prop.length;
  for (i = 0; i < vm; i++) {
    console.log(i);
  }
} */