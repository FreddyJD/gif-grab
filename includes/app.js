
let presidents = ["Barack Obama", "Clinton", "Donald Trump", "Ronald Reagan", "Nicolas Maduro", "Hugo Chavez", "Nelson Mandela"];
let presidentID = presidents.length;

function init() { 
    for(let i = 0; i < presidents.length; i++) { 
        $("#placeholder").append(`<button data-ids="${presidents[i]}" type="button" class="btn btn-outline-light search">${presidents[i]}</button></a>`)
    }
};
init();

$("#add-arr").on("click", function (event) {
    event.preventDefault();
    raw = $("#txt-arr").val().trim();
    if (raw === "") { 
        console.log("Nope!")
    } else {
        $("#placeholder").append(`<button data-ids="${raw}" type="button" class="btn btn-outline-light search">${raw}</button></a>`)
        searchGo();
    }
});

$("button").on("click", function (event) {
    event.preventDefault();
    raw = $(this).data( "ids" );
    searchGo();
});

function searchGo() {
    let searchQue = raw;
    let urlQue = $.get(`http://api.giphy.com/v1/gifs/search?q=${searchQue}&api_key=5vxImxx9WGAN65BPa4hs1WF4HMIYsYye&limit=5`);
    urlQue.done(function (data) {
        $(".card-columns").empty();
        $("#txt-arr").empty();
        for (let i = 0; i < data.data.length; i++) {
            dirName = $(".card-columns").append(`
            <div class="card">
            <button class="btn btn-light extra">RATING : ${data.data[i].rating.toUpperCase()}</button>
                <img src="${data.data[i].images.fixed_height.url}" class="card-img-top" >
                <div class="card-body">
                    <h4 class="card-title">${data.data[i].title.toLowerCase()} </h4>
                    <a href="${data.data[i].images.fixed_height.url}"><button type="button" class="btn btn-outline-light">Download</button></a>
                    <a href="${data.data[i].source_post_url}"><button type="button" class="btn btn-outline-light">Source</button></a>
                </div>
            </div>`);
        }    
    })
}

