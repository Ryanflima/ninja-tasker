// select Element, listening for EventSource, manipulating elements

// when we click on list item
const listItem = document.querySelector("ul");

listItem.addEventListener("click", function(event) {
  console.log(event.target.id);
  fetch("/delete/" + event.target.id, { method: "delete" })
    .then(function(res) {
      res.json();
    })
    .then(function() {
      window.location.href = "/home";
      event.target.parentNode.removeChild(event.target);
    });
});

// fire an event
// the event hits our Server
