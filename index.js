// All below is in regard to the banner if the shop is open or not
const statusSpan = document.getElementById('status');

const isClosed = () => {
  statusSpan.classList.add('bg-danger');
  statusSpan.innerText = 'Stengt';
};

const checkTime = () => {
  const today = new Date();
  const hour = today.getHours();
  const minute = today.getMinutes();
  const second = today.getSeconds();

  const formattedHour = hour < 10 ? '0' + hour : hour;
  const formattedMinute = minute < 10 ? '0' + minute : minute;
  const formattedSecond = second < 10 ? '0' + second : second;

  return formattedHour + ':' + formattedMinute + ':' + formattedSecond;
};
checkTime();

const isOpen = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const hour = today.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    statusSpan.classList.add('bg-primary');
    statusSpan.innerHTML = `Åpent`;
  } else {
    isClosed();
  }
};
isOpen();

const isBankHoliday = () => {
  const today = new Date();
  const year = today.getFullYear();

  // Dates of Norwegian bank holidays
  const bankHolidays = [
    new Date(year, 0, 1), // New Year's Day
    new Date(year, 3, 1), // Maundy Thursday
    new Date(year, 3, 2), // Good Friday
    new Date(year, 3, 5), // Easter Monday
    new Date(year, 4, 17), // Norwegian Constitution Day
    new Date(year, 4, 30), // Ascension Day
    new Date(year, 5, 6), // Whit Monday
    new Date(year, 11, 25), // Christmas Day
    new Date(year, 11, 26), // Boxing Day
  ];

  // Check if today is a bank holiday
  const isBankHoliday = bankHolidays.some((holiday) => {
    return holiday.getDate() === today.getDate() && holiday.getMonth() === today.getMonth();
  });

  if (isBankHoliday) {
    isClosed();
  }
};
isBankHoliday();

// All below is in regard to contact form
document.addEventListener("DOMContentLoaded", function() {
  // Get the form element
  var form = document.getElementById("contactForm");

  // Attach a submit handler to the form
  form.addEventListener("submit", function(event) {
    // Stop form from submitting normally
    event.preventDefault();

    // Get form data
    var formData = {
      navn: document.getElementById("navn").value,
      epost: document.getElementById("epost").value,
      melding: document.getElementById("melding").value
    };

    // Send the form data to the server using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./src/php/sendEmail.php");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Display a success message to the user
        form.innerHTML = `<h4 class="text-center">Takk for din melding</h4>
        <p class="text-center">Vi kommer tilbake til deg så fort som mulig.</p>`;

        // Log the response to the console
        console.log(xhr.response);
      } else {
        console.error(xhr.statusText);
      }
    };
    xhr.onerror = function() {
      console.error("Network error");
    };
    xhr.send(JSON.stringify(formData));
  });
});