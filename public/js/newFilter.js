var $filterCheckboxes = $('.english-filter');
var filterFunc = function() {

  var selectedFilters = {};

  $filterCheckboxes.filter(':checked').each(function() {
    if (!selectedFilters.hasOwnProperty(this.name)) {
      selectedFilters[this.name] = [];
    }

    selectedFilters[this.name].push(this.value);
  });

  // create a collection containing all of the filterable elements
  var $filteredResults = $('.card-notl');
// console.log($filteredResults)
  // loop over the selected filter name -> (array) values pairs
  $.each(selectedFilters, function(name, filterValues) {

    // filter each .flower element
    $filteredResults = $filteredResults.filter(function() {

      var matched = false,

      currentFilterValues = $(this).data('category').split('lmn');

      // loop over each category value in the current .flower's data-category
      $.each(currentFilterValues, function(_, currentFilterValue) {
        // if the current category exists in the selected filters array
        // set matched to true, and stop looping. as we're ORing in each
        // set of filters, we only need to match once
        for(i=0;i<filterValues.length;i++)
        {
          if(currentFilterValue.toLowerCase().indexOf(filterValues[i].toLowerCase())>-1)
          {
            matched = true;
            return false;
          }
          else{
          }
        }
        // if ($.inArray(currentFilterValue, filterValues) != -1) {
        //   matched = true;
        //   return false;
        // }
      });

      // if matched is true the current .flower element is returned
      return matched;

    });
  });

  $('.card-notl').hide().filter($filteredResults).show();
}


$filterCheckboxes.on('change', filterFunc);

//hindi-version

var $filterCheckboxesHindi = $('.hindi-filter');

var filterFuncHindi = function() {
  var selectedFiltersHindi = {};

  $filterCheckboxesHindi.filter(':checked').each(function() {
    if (!selectedFiltersHindi.hasOwnProperty(this.name)) {
      selectedFiltersHindi[this.name] = [];
    }

    selectedFiltersHindi[this.name].push(this.value);
  });

  // create a collection containing all of the filterable elements
  var $filteredResults = $('.card-notl-hindi');
// console.log($filteredResults)
  // loop over the selected filter name -> (array) values pairs
  $.each(selectedFiltersHindi, function(name, filterValues) {

    // filter each .flower element
    $filteredResults = $filteredResults.filter(function() {

      var matched = false,

      currentFilterValues = $(this).data('category').split('lmn');

      // loop over each category value in the current .flower's data-category
      $.each(currentFilterValues, function(_, currentFilterValue) {
        // if the current category exists in the selected filters array
        // set matched to true, and stop looping. as we're ORing in each
        // set of filters, we only need to match once
        for(i=0;i<filterValues.length;i++)
        {
          if(currentFilterValue.indexOf(filterValues[i])>-1)
          {
            matched = true;
            return false;
          }
          else{
          }
        }
        // if ($.inArray(currentFilterValue, filterValues) != -1) {
        //   matched = true;
        //   return false;
        // }
      });

      // if matched is true the current .flower element is returned
      return matched;

    });
  });

  $('.card-notl-hindi').hide().filter($filteredResults).show();
}

$filterCheckboxesHindi.on('change', filterFuncHindi);
