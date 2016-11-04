$(function() {

    function OrderItem(name, price) {
        this.name = name;
        this.price = price;
        this.quant = 0;
    }

    OrderItem.prototype.totalCost = function() {
        return this.price * this.quant
    }

    var items = {
        'burger': new OrderItem('Royale with Cheese', 8.99),
        'pizza': new OrderItem('Arugula Pie', 11.99),
        'pork': new OrderItem('Smoked Swine', 14.99),
        'iceCream': new OrderItem('Ice Cream Biscuit', 7.99)
    }

    function addToOrder(event) {

        var $targetItem = $(event.target),
            id = $targetItem[0].id,
            $tr = $('<tr>'),
            $tdName = $('<td>'),
            $tdQuant = $('<td>'),
            $tdPrice = $('<td>'),
            item = items[id];

        if (item.quant === 0) {
            item.quant++;
            $tdName.text(item.name)
            $tdQuant.text(item.quant)
            $tdQuant.addClass('right-align')
            $tdQuant.attr('id', `${id}Order`)
            $tdPrice.text(`$${item.price.toFixed(2)}`)
            $tdPrice.addClass('right-align')
            $tr.append($tdName)
            $tr.append($tdQuant)
            $tr.append($tdPrice)
            $('tbody').append($tr)
        } else {
            item.quant++;
            $(`#${id}Order`).text(item.quant)
        }
        updateTotal()
    }

    function updateTotal() {
        var subtotal = tax = total = null;
        for (var foodItem in items) {
            subtotal += items[foodItem].totalCost();
        }

        // assuming tax rate is 8%
        tax = subtotal * .08;
        total = subtotal + tax;

        $('#subtotal').text(`$${subtotal.toFixed(2)}`)
        $('#tax').text(`$${tax.toFixed(2)}`)
        $('#total').text(`$${total.toFixed(2)}`)
        
    }


    $('.orderItems').on('click', '.card-action', addToOrder);




});
