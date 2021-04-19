$("#haha").click(function () {
  $("div > div").html("");
});

let authe = 0;

getData({});

function auth() {
  authe = $(".auth").val();
  $.ajax({
    type: "GET",
    url: "https://rafsanamin.herokuapp.com/db/",
    headers: { pass: authe },
    success: function (data) {
      let u = data;
      if (data !== "forbidden") {
        u = "connected";
      }
      $(".authc").empty();
      $(".authc").append(`<h5>You are ${u}</h5>`);
    },
  });
  getData({});
}
function getData(clue) {
  let send = clue;
  $.ajax({
    type: "GET",
    url: "https://rafsanamin.herokuapp.com/db/",
    data: send,
    contentType: "application/json",
    headers: { pass: authe },
    success: function (data) {
      $(".data-table").empty();
      data.forEach((elem) => {
        $(".data-table").append(
          `<tr><td class="name">${elem.name}</td><td class="id">${elem._id}</td><td><button onclick="delData($(this).parent().parent())">Delete</button></td></tr>`,
        );
      });
    },
  });
}

function postData() {
  let rama = $("#add").val();
  let send = { name: rama };
  $.ajax({
    type: "POST",
    url: "https://rafsanamin.herokuapp.com/db",
    data: send,
    headers: { pass: authe },
    success: function (data) {
      $(".added").html(`<h5>Your name is ${data.ma}</h5>`);
      $("input").val("");
      getData({});
    },
  });
}

function putData() {
  let old = $("#prev").val();
  let naw = $("#new").val();

  let send = [{ name: old }, { name: naw }];

  $.ajax({
    type: "PUT",
    url: "https://rafsanamin.herokuapp.com/db",
    data: { sent: send },
    headers: { pass: authe },
    success: function (data) {
      if (data == null) {
        $(".change-status").html(`<h5> Data Not found and updated`);
      } else {
        $(".change-status").html(`<h5> Data Updated as ${data.name}`);
      }
      $("input").val("");
      getData({});
    },
  });
}

function delData(elem) {
  let nama = elem.children(".id").text();
  let send = { _id: nama };
  $.ajax({
    type: "DELETE",
    url: "https://rafsanamin.herokuapp.com/db",
    data: send,
    headers: { pass: authe },
    success: function () {
      getData({});
    },
  });
}
