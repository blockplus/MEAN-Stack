jQuery ->
  $('#card_number').payment 'formatCardNumber'
  $('#card_cvc').payment 'formatCardCVC'
  $('#payment_form').submit (e) ->
    console.log 'submitting'
    $(@).find('input.required').each (i, input) ->
      if $(input).val().length < 1
        $(input).parents('.control-group').removeClass("success").addClass("error")
        e.preventDefault()
      else
        $(input).parents('.control-group').removeClass("error").addClass("success")
    if $('#card_number').length > 0
      if $.payment.validateCardNumber $('#card_number').val()
        $('#card_number').parents('.control-group').removeClass("error").addClass("success")
      else
        $('#card_number').parents('.control-group').removeClass("success").addClass("error")
        e.preventDefault()
      if $.payment.validateCardExpiry $('#card_month').val(), $('#card_year').val()
        $('#card_month').parents('.control-group').removeClass("error").addClass("success")
      else
        e.preventDefault()
        $('#card_month').parents('.control-group').removeClass("success").addClass("error")
  $('.fee_type').change ->
    fee_type = @options[@selectedIndex].value
    fee = $(this)
    form = fee.closest("form")
    line_item = form.find "#line_item_id"
    line_item_id = line_item.val()

    form.attr "action", "/line_items/fee_type/"+line_item_id+"/"+ fee_type
    form.submit();





