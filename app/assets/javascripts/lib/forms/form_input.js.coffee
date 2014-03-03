define ["jquery", "lib/forms/input_validator"], ($, InputValidator) ->

  class FieldInput

    constructor: (input, label) ->
      @input = $(input)
      @label = @input.data('label') || label
      @_initialize() if @input.length is 1

    isValid: (triggerErrors) ->
      @_clearInput() if triggerErrors
      valid = true

      for validator in @validators
        unless validator.isValid()
          @_showError validator.getErrorMessage() if triggerErrors
          valid = false
          break

      valid

    _initialize: ->
      @inputParent = @input.closest('.js-input')
      @validators = []
      rules = if @input.data('rules') then @input.data('rules').split(' ') else []

      for validator in rules
        @validators.push(new InputValidator(@input, @label, validator)) unless /username_check/.test(validator)

      @_listen()

    _listen: ->
      @input.on 'blur', (e) =>
        @isValid()

      if @input.nodeName is 'SELECT'
        @input.on 'change', (e) =>
          @isValid()

      # Because the validators are all synchronous and expect an immediate true/false
      # response we need to handle this separately.
      if /username_check/.test(@input.data('rules'))
        validator = @input.data('rules').match(/(username_check\(.*?\))/)[1]
        inputValidator = new InputValidator(@input, @label, validator)
        timer = false
        validator_rules = inputValidator.get_validation_rules()

        @input.on "keyup", (e) =>
          clearTimeout(timer) if timer

          timer = setTimeout =>
            @_usernameCheck(validator_rules[2])
          , 250

    _clearInput: (extra_classes) ->
      @inputParent.removeClass "field__input--error #{extra_classes}"
      @inputParent.find('.js-error').remove()

    _showError: (message) ->
      @inputParent.addClass 'field__input--error'
      @inputParent.append $("<div class='field__error js-error'>#{message}</div>")

    _showValid: ->
      @inputParent.addClass 'field__input--valid'

    _usernameCheck: (url) ->
      if (@input.val().length > 3)
        $.ajax url + "/" + @input.val(),
          success: (data) =>
            @_indicate_username_validity(data)

      @_clearInput("field__input--valid")
    _indicateUsernameValidity: (data) ->
      if data.unique
        @_showValid()
      else
        @_showError("That username is taken.")
