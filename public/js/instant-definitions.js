(function($) {

    $.fn.instantDefinitions = function(options) {

        // These are the defaults.
        var settings = $.extend({
            underlineColor: "#000000",
            underlineWeight: 0,
            backgroundColor: "#9B613B",
            backgroundOpacity: 0.4,
            highlightText: true,
            boldText: false,
            underlineText: false,
            maxSize: 350,
            noStyle: false,
            showErrors: true,
            showTitles: true,
            hideMobile: true
        }, options);

        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        var terms = [];
        var rgb = hexToRgb(settings.backgroundColor);
        var isMobile = false;

        if (settings.hideMobile == true) {

            if (window.innerWidth < 550) {
                $(this).find("span.idef").css("cursor", "initial");
                return;
            }
        } else {
            if (window.innerWidth < 550) {
                isMobile = true;
            }
        }
        if (settings.showTitles == true) {
            $("body").append('<div id="idef-popup"><h1 id="idef-title"></h1><p id="idef-definition"></p></div>');
        } else {
            $("body").append('<div id="idef-popup" class="no-title"><p id="idef-definition"></p></div>');
        }
        var popup = $("#idef-popup");





        if (settings.noStyle != true) {

            if (settings.maxWidth == false) {
                popup.css({
                    width: "auto"
                });
            } else {
                popup.css({
                    maxWidth: settings.maxSize + "px"
                });
            }

            if (settings.boldText == true) {
                $(this).find("span.idef").css({
                    fontWeight: "bold"
                });
            }

            if (settings.underlineText == true) {
                $(this).find("span.idef").css({
                    borderBottom: "0 px solid" + settings.underlineColor
                });
            }

            if (settings.highlightText == true)
                $(this).find("span.idef").css({
                    backgroundColor: "none",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    textDecoration: "underline"
                });

        }

        //        popup.addClass("animated");

        for (i = 0; i < glossary.items.length; i++) {
            terms.push(glossary.items[i].term);
        }


        $(this).on({
                mouseenter: function() {

                    var searchterm = $(this).attr("data-idef");


                    var topPos = $(this).offset().top;
                    var leftPos = $(this).offset().left;
                    var rightPos = $(this).offset().right;
                    var spanwidth = $(this).width();
                    var rightspace = window.innerWidth - leftPos;


                    if (rightspace < 500) {
                        popup.css({
                            "left": "auto",
                            "right": rightspace - spanwidth,
                            "top": topPos + 30
                        });
                    } else if (isMobile == false) {
                        popup.css({
                            "right": "auto",
                            "left": leftPos,
                            "top": topPos + 30
                        });
                    } else {
                        popup.css({
                            "left": leftPos,
                            transform: "translateX(-50%)",
                            "top": topPos + 60
                        });
                    }

                    popup.show();
                    if (searchterm != undefined) {

                        //check if there is a matching term in the glossary
                        $.each(glossary.items, function(i, v) {
                            if (v.term.toLowerCase() == searchterm.toLowerCase()) {
                                popup.find("#idef-title").html(v.title);
                                popup.find("#idef-definition").html(v.definition);
                                popup.stop().animate({
                                    opacity: 1
                                }, 250);

                                return;
                            }
                        });
                    } else {
                        //if term is undefined or unset, throw an error
                        if (settings.showErrors == true) {
                            popup.find("#idef-title").html("<span style='color: red'>Error</span>");
                            popup.find("#idef-definition").html("<p style='color: red'>The definition is set incorrectly, or could not be found</p>");
                            popup.stop().animate({
                                opacity: 1
                            }, 250);
                        }
                    }
                },
                mouseleave: function() {
                    //fade out the popup
                    popup.stop().animate({
                        opacity: 0
                    }, 250, function() {
                        popup.hide();
                    });
                }
            },
            "span.idef");



    };

}(jQuery));
