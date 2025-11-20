const dailyOption = document.querySelector('.dailyOption');
const weeklyOption = document.querySelector('.weeklyOption');
const monthlyOption = document.querySelector('.monthlyOption');

// Tüm kartlar
const cards = document.querySelectorAll('.all');

let timeData = [];

// JSON'dan veriyi çekiyoruz
fetch("/dashbord/data.json")
  .then(response => response.json())
  .then(data => {
    timeData = data;          // Veriyi kaydediyoruz
    updateUI("weekly");       // Varsayılan olarak weekly çalışsın
  })
  .catch(err => console.error("Hata:", err));

// UI güncelleyen fonksiyon
function updateUI(type) {
  cards.forEach(card => {
    const title = card.querySelector("p").textContent.trim();
    const current = card.querySelector(".current");
    const previous = card.querySelector(".previous");

    // JSON'daki ilgili objeyi bul
    const item = timeData.find(d => d.title === title);

    if (item) {
      current.textContent = `${item.timeframes[type].current}hrs`;
      previous.textContent = `Last ${label(type)} - ${item.timeframes[type].previous}hrs`;
    }
  });
}

// "Last Week / Last Day" gibi yazılar için
function label(type) {
  if (type === "daily") return "Day";
  if (type === "weekly") return "Week";
  if (type === "monthly") return "Month";
}

// Tıklama eventleri
dailyOption.addEventListener("click", () => updateUI("daily"));
weeklyOption.addEventListener("click", () => updateUI("weekly"));
monthlyOption.addEventListener("click", () => updateUI("monthly"));
