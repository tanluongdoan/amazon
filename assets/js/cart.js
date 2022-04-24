function getCartItems() {	db.collection("cart-items").onSnapshot((snapshot) => {
		let cartItems = [];
		snapshot.docs.forEach((doc) => {
			cartItems.push({
				id: doc.id,
				...doc.data(),
			});
			generateCartItems(cartItems);
            getTotalCost(cartItems)
		});
	});
}
function decreaseCount(itemID) {
	let cartItem = db.collection("cart-items").doc(itemID);
	cartItem.get().then((doc) => {
		if (doc.exists) {
			if (doc.data().quantity > 1) {
				cartItem.update({
					quantity: doc.data().quantity - 1,
				});
			}
		}
	});
}
function  deleteItem(itemID){
    db.collection("cart-items").doc(itemID).delete();
}   
function   increaseCount(itemID){
    let cartItem = db.collection("cart-items").doc(itemID);
    cartItem.get().then((doc) => {
        if (doc.exists) {
            if (doc.data().quantity > 0) {
				cartItem.update({
					quantity: doc.data().quantity +1,
				});
			}
        }
    });
}
function getTotalCost(items){
    let totalCost = 0;
    items.forEach((item) => {
        totalCost += (item.price * item.quantity);
    });
    document.querySelector('.total-cost-number').innerHTML = numeral(totalCost).format('$0,0.00');
}
function generateCartItems(cartItems) {
	let html = "";
	cartItems.forEach((item) => {
		html += `
    <div class="cart-item flex items-center p-4">
        <div class="cart-item-img w-40 h-24 bg-white p-4 rounded-lg">
            <img class="w-full h-full object-contain" src="${item.image}" alt="">
        </div>
        <div class="cart-item-details flex-grow">
            <div class="cart-item-title font-bold text-sm text-gray-600">
                ${item.name}
            </div>
            <div class="cart-item-brand text-sm text-gray-400">
                ${item.make}
            </div>
        </div>
        <div class="cart-item-counter w-48 flex items-center">
            <div data-id="${item.id}" class="arrow-left cart-item-decease cursor-pointer text-gray-left bg-gray-100 p-2 hover:bg-gray-200">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </div>
            <h4 class="text-gray-400 m-2" >x${item.quantity}</h4>
            <div  data-id="${item.id}" class="arrow-right cart-item-increase cursor-pointer text-gray-left bg-gray-100 p-2 hover:bg-gray-200">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
        </div>
        <div class="cart-item-total-cost w-36 font-bold text-gray-400">
            ${numeral(item.price).format('$0,0.00')}
        </div>
        <div  data-id="${item.id}" class="cart-item-delete font-bold w-10 text-gray-500 cursor-pointer hover:text-gray-900">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </div>
    </div>
        `;
	});
	document.querySelector(".cart-items").innerHTML = html;
	createEventListeners();
}
function createEventListeners() {
	let decreaseButtons = document.querySelectorAll(".cart-item-decease");
	let increaseButtons = document.querySelectorAll(".cart-item-increase");
	let deleteButtons = document.querySelectorAll(".cart-item-delete");
	decreaseButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			decreaseCount(button.dataset.id);
		});
	});
    increaseButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            increaseCount(button.dataset.id);
        });
    });
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            deleteItem(button.dataset.id);
        });
    });
}
getCartItems();
