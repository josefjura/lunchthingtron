function RestaurantError() {
    this.isError = true;
}

RestaurantError.prototype.parse = function (data) {
    console.log(data);
}