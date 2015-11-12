window.$ = require('jquery');

function RestaurantData(id, name) {
    this.isError = false;
    this.id = id;
    this.name = name;
    this.items = [];
    this.isLoaded = false;
}

RestaurantData.prototype.parse = function (data) {
    var self = this;
    var nameElem = $(data).find(".res-name a span").text();
    if (name)
        self.name = nameElem;
    var container = $(data).find("#daily-menu-container");
    var today = $(container).find(".tmi-group")[0];

    if (today) {
        var itemselms = $(today).find(".tmi-daily");
        if (itemselms.length) {
            $.each(itemselms, function (index, item) {
                var text = $(item).find(".tmi-text-group").text().trim();
                var price = $(item).find(".tmi-price").text().trim();

                self.items.push({
                    text: text,
                    price: price
                });
            });
        }
    }

    if (self.items.length > 0) this.isLoaded = true;
}