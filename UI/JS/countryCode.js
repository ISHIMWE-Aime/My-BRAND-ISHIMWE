document.cookie = "witcher=Geralt; SameSite=None; Secure"
var input = document.querySelector("#phone");
window.intlTelInput(input, {
  separateDialCode: true
});