import { cart } from "../../data/cart";
import { getProduct } from "../../data/products";
import { getDeliveryOption } from "../../data/deliveryOptions";
import { formatCurrency } from "../utils/money.js"

export function renderPaymentSummary(){

   let productPriceCents = 0;
   let shippingPriceCents = 0;

   cart.forEach((cartItem) => {
      const product = getProduct(cartItem.product);
     productPriceCents += product.priceCents * cartItem.quantity;

     const deliveryOption = getDeliveryOption(cartItem.getDeliveryOptionId);
     shippingPriceCents += deliveryOption.priceCents
   });


   const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
   const taxCets = totalBeforeTaxCents * 0.1;
   const totalCents = totalBeforeTaxCents + taxCets;


   const paymmentSummaryHTML = `
         <div class="payment-summary-title">
         Order Summary
      </div>

      <div class="payment-summary-row">
         <div>Items (3):</div>
         <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
      </div>

      <div class="payment-summary-row">
         <div>Shipping &amp; handling:</div>
         <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
         <div>Total before tax:</div>
         <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
      </div>

      <div class="payment-summary-row">
         <div>Estimated tax (10%):</div>
         <div class="payment-summary-money">$${formatCurrency(taxCets)}</div>
      </div>

      <div class="payment-summary-row total-row">
         <div>Order total:</div>
         <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
      </div>

      <button class="place-order-button button-primary">
         Place your order
      </button>
   `;

   document.querySelector('.js-payment-summary')
      .innerHTML = paymmentSummaryHTML;
}