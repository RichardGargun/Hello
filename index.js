(function ($) {
    var $weightInput = $('#weight-input');
    var $errorLable = $('.error-label');
    var $addButton = $('#add-weight');
    var $availableWeightsList = $('#available-weights');
    var $availableWeights = $availableWeightsList.children();
    var $barbell = $('.barbell');

    var validateField = function() {

        if(!$.isNumeric($weightInput.val())) {
            $weightInput.addClass('error');
            $errorLable.text('Please enter a number');
            return false;
        }

        else {
            $weightInput.removeClass('error');
        }

        if ($weightInput.val() > 10) {
            $weightInput.addClass('error');
            $errorLable.text('Slow down! The number must be lower that 10kg');
            return false;
        } else {
            $weightInput.removeClass('error');
        }

        addWeight();
    };

    var addWeight = function () {
        var listItem = createNewTaskElement($weightInput.val());
        $availableWeightsList.append(listItem);

        $weightInput.val(" ");

    };

    var createNewTaskElement = function (kg) {
        var $listItem = $('<li></li>'),
            randomIndex = Math.floor(Math.random() * 100) + 1,
            $weight = $('<div class="weight" id="weight-'+ randomIndex +'"></div>'),
            $label = $('<label>' + kg + '</label>');

        $listItem.append($weight).append($label);
        bindEvents($listItem);

        return $listItem;
    };

    var addRemoveWeightBInding = function($element) {
        $element.on('click', function (event) {
            $availableWeightsList.append($element);
            if (!$barbell.find('.weight').length) {
                $barbell.addClass('empty');
            }
            bindEvents($element);

        });
    };

    var moveWeight = function ($element, placement) {
        var leftEdge = '.collar.left',
            rightEdge = '.collar.right';

        switch (placement) {
            case 'left':

                if ($(leftEdge).nextAll('li').length >= 10) {
                    alert('Sorry! No more weights can be added');
                } else {
                    $element.remove();
                    $barbell.removeClass('empty');
                    $element.insertAfter(leftEdge);
                }
                break;
            case 'right':

                if ($(rightEdge).prevAll('li').length >= 10) {
                    alert('Sorry! No more weights can be added');
                } else {
                    $element.remove();
                    $barbell.removeClass('empty');
                    $element.insertBefore(rightEdge);
                }
                break;
        }

        addRemoveWeightBInding($element);
    };

    var bindEvents = function($element) {
        $element.on('mousedown', function (event) {

            switch (event.which) {
                case 1:
                    moveWeight($element, 'left');
                    break;
                case 2:
                    break;
                case 3:
                    moveWeight($element, 'right');
                    return false;
            }
        });

        //prevent context menu from opening
        $(document).on("contextmenu", $element, function(e){
            return false;
        });
    };

    $addButton.on("click", function () {
        validateField();
    });

    $.each($availableWeights, function( idx, element ) {
        bindEvents(element);
    });

})(jQuery);

