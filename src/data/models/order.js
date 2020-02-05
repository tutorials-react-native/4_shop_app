import moment from "moment";
import "moment/locale/ko";

class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }
  get readableDate() {
    return moment(this.data)
      .locale("ko")
      .format("MMMM Do YYYY, h:mm A");
  }
}

export default Order;
