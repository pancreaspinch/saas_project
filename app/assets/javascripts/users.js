/* global $, Stripe */
$(document).on('turbolinks:load', function(){
     var theForm = $('#pro_form');
     var submitBtn = $('#form-submit-btn');
    //Set stripe public key
    Stripe.setPublishableKey($('meta'[name = "stripe-key"]).attr('content'));
    submitBtn.click(function(event){
        //prevent default behavior
        event.preventDefault();
        submitBtn.val("Processing").prop('disabled',true);
        //extract card info
        var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        //error handling 
     var error = false;
    //Validate card number.
    if(!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert('The credit card number appears to be invalid');
    }
    //Validate CVC number.
    if(!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('The CVC number appears to be invalid');
    }
    //Validate expiration date.
    if(!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert('The expiration date appears to be invalid');
    }
    if (error) {
      //If there are card errors, don't send to Stripe.
      submitBtn.prop('disabled', false).val("Sign Up");
    } else {
      //Send the card info to Stripe.
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    return false;
  });
    
    function stripeResponseHandler(status, response){
        //get token from response
        var token = response.id;
        //inject card token into hidden field
        theForm.append($('<input type = "hidden" name = "user[stripe_card_token]">'.val(token)));
        //submit form
        theForm.get(0).submit();
    }
});