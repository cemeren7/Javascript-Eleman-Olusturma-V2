// Elemanları Seçmek
const frm = document.querySelector("#todoAddForm"); // bu id sahip elemanı Yakala
const addinput = document.querySelector("#todoName"); // Degeri Alacağımız İnput
const listgrp = document.querySelector(".list-group"); // liste elemanlarımızı kapsayan yapı
const clearbtn = document.querySelector("#clearButton"); // arayüze ekledigimiz todoları temizleyegimiz Button
const findtodo = document.querySelector("#todoSearch");

// NodeList  Yapısı Kullanımı
const firstcard = document.querySelectorAll(".card-body")[0];

const secondcard = document.querySelectorAll(".card-body")[1];

runevents(); // İlk Başta runevents isimli fonksiyonu çagır

// Global Tanımlama
let Todos = [];

// Todo Ekle Fonksiyonunu başlat
function runevents() {
  frm.addEventListener("submit", addtodo); // Form Yapısına OLay ekleme Forma Sumbit edildigi zaman addtodo isimli fonskiyonu çagır
  // Dökümana OLay ekleme Sayfa Yenilendiginde bu fonksiyonu çagır
  document.addEventListener("DOMContentLoaded", loadpage);
  // Todo Kaldırma
  secondcard.addEventListener("click", removediv);
  // Todo Silme
  clearbtn.addEventListener("click", todoremovelist);
  // todo filtreleme
  findtodo.addEventListener("keyup", filter); // Klavyeye basmayı bıraktıgı an çalışcak event
}

// Stroge todoları göster
function loadpage() {
  checkStroge(); // Güncel Degerinin Alınması için bu fonkisyon çalıştırılır
  Todos.forEach(function (todo) {
    addTodoUI(todo);
  });
}

// Filtreleme yapma
function filter(e) {
  const ValueFilterTodo = e.target.value.toLowerCase().trim(); //  Mevcut İnputta Girilen Todo degerini küçük harfe çevirererek sagındaki ve solundaki tüm boşlukları temizleyerek alır
  const todolist = document.querySelectorAll(".list-group-item");
  console.log(ValueFilterTodo);

  if (todolist.length > 0) {
    todolist.forEach(function (todo) {
      if (todo.textContent.toLowerCase().trim().includes(ValueFilterTodo)) {
        // yakalanan mevcutta bulunan degerin içerigini ile uyuşma durumunu kontrol eder
        todo.setAttribute("style", "display: block"); // mevcuta bulunan todolara erişerek stilini degiştirir
      } else {
        todo.setAttribute("style", "display: none !important");
      }
    });
  } else {
    AlertsAdd(
      "warning",
      "Ekranda Filtreleme Yapmak için En Az 1 Todo Olmalıdır"
    );
  }
}

function removediv(e) {
  if (e.target.className == "fa fa-remove") {
    const todo = e.target.parentElement.parentElement; // bir üst sıraya çıkmar ve li elemanını yakalar
    todo.remove();
  }
}

function todoremovelist() {
  localStorage.clear();
  const todolistrm = document.querySelectorAll(".list-group-item");
  if (todolistrm.length > 0) {
    todolistrm.forEach(function (todo) {
      todo.remove();
    });
    AlertsAdd("success", "Bütün Todolar Temizlendi");
  } else {
    AlertsAdd("warning", "En Az Bir Todo Olmalıdır");
  }
}

// İputtan deger alma ve kontroller arayüze todo ekleme
function addtodo(e) {
  console.log("Sumbit Event Olayı Çalıştı");
  const textinput = addinput.value.trim(); // başında ve sonunda bulunan boşlukları kaldırarak inputtan gelen degeri alır
  if (textinput == null || textinput == "") {
    AlertsAdd("danger", "Bu Alan Boş Geçilemez"); // Uyarı mesajı ekle 2
  } else {
    addTodoUI(textinput); // Arayüze Todo Ekle
    addStrogeTodo(textinput); // Storage Todo Ekle
    AlertsAdd("success", "Todo Eklendi"); // uyarı mesajı ekle 1
  }
  e.preventDefault(); // Sayfanın Yenilenmesini Engeller
}

// Todo Ekleme eleman yaratma
function addTodoUI(newTodo) {
  // element oluşturma
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between mb-2";
  li.textContent = newTodo; //Text input üzerinden gelen degeri parametre olarak al

  const a = document.createElement("a");
  a.href = "#";
  a.className = "delete-item";

  const i = document.createElement("i");
  i.className = "fa fa-remove";

  a.appendChild(i); // İ etiketi A etiketinin alt elemanıdır
  li.appendChild(a); // A Etiketi Li elemanının alt elemanıdır
  listgrp.appendChild(li); // Lİ elemanı Ul elemanın alt elemanıdır

  addinput.value = ""; // her defasında input içini boşalt

  // her gelen todoyu alma
  const addli = document.querySelectorAll(".list-group-item"); // Bu Classa sahip elemanları yakala

  // renk ayarları
  for (let j = 0; j < addli.length; j++) {
    // addli degişkenin uzulugu kadar çalış ve bütün li elemanlarına eriş
    addli[j].style.color = "#2F4858";
    addli[j].style.backgroundColor = "#DAF7DC";
    addli[j].style.borderRadius = "10px";
    addli[j].style.fontSize = "15px";
  }
}

// Stroge Todo Ekle
function addStrogeTodo(newTodo) {
  checkStroge(); // Eski Kayıtları kontrol eder ve getirir
  Todos.push(newTodo); // Her gelen güncel veriyi Todos adlı dizinin sonuna ekler
  localStorage.setItem("Todos", JSON.stringify(Todos)); // Güncel veriyi tekrar localstroge ekler
}

// Stroge Verilerinin Kontrolü
function checkStroge() {
  if (localStorage.getItem("Todos") == null) {
    // LocalStroge İçinde Todos Adında bir anahtar verisi varmı kontrol edilir
    Todos = []; // Todos adında bir dizi oluşturulur
  } else {
    Todos = JSON.parse(localStorage.getItem("Todos")); // Js Dizisine dönüştürür
  }
}

// Alerts Uyarı Ekle
function AlertsAdd(type, message) {
  //   <div class="alert alert-warning mt-2" role="alert">
  //   A simple warning alert—check it out!
  // </div>

  const div = document.createElement("div");
  div.className = `alert alert-${type} mt-2`;
  div.textContent = message;
  firstcard.appendChild(div);

  // Div elemanını 1.5 saniye sonra kaldırma
  setTimeout(function () {
    div.style.display = "none";
  }, 2500);
}

clearstroge();

// Stroge Todoları Temizleme
function clearstroge() {
  frm.addEventListener("reset", function () {
    localStorage.clear();
    AlertsAdd("danger", "Local Stroge Verileri Temizlendi");
  });
}
