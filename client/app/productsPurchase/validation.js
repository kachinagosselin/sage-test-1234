// Stripe.setPublishableKey(  process.env.STRIPE_PUBLISHABLE_KEY);

// $('#charge-error').hide();

// $(document).ready(() => {

//   $('#payment-form').submit(function(event) {
//     $('#charge-error').hide();
//     const $form = $(this);
//     $form.find('button').prop('disabled', true);
//     Stripe.card.createToken($form, stripeResponseHandler);
//     return false;
//   });

// });

// function stripeResponseHandler(status, response) {
//   if (response.error) {
//     $('#charge-error').show();
//     $('.payment-errors').text(response.error.message);
//     $('.submit-button').removeAttr('disabled');
//   } else {
//     const $form = $('#payment-form');
//     const token = response.id;
//     $form.append('<input type="hidden" name="stripeToken" value="' + token + '"/>');
//     $form.get(0).submit();
//   }
// }


// $(function() {

//   $('[data-numeric]').payment('restrictNumeric');
//   $('.cc-number').payment('formatCardNumber');
//   $('.cc-exp').payment('formatCardExpiry');
//   $('.cc-cvc').payment('formatCardCVC');
//   $.fn.toggleInputError = function(erred) {
//     this.parent('.form-group').toggleClass('has-error', erred);
//     return this;
//   };
//   $('form').submit((e) => {
//     e.preventDefault();
//     const cardType = $.payment.cardType($('.cc-number').val());
//     $('.cc-number').toggleInputError(!$.payment.validateCardNumber($('.cc-number').val()));
//     $('.cc-exp').toggleInputError(!$.payment.validateCardExpiry($('.cc-exp').payment('cardExpiryVal')));
//     $('.cc-cvc').toggleInputError(!$.payment.validateCardCVC($('.cc-cvc').val(), cardType));
//     $('.cc-brand').text(cardType);
//     $('.validation').removeClass('text-danger text-success');
//     $('.validation').addClass($('.has-error').length ? 'text-danger' : 'text-success');
//   });

// });
