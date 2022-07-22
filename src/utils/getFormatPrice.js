export function getFormatPrice(price) {
    return price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
