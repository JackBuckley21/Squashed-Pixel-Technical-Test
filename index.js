$(document).ready(function() {
    const directoryPath = 'data'; // Path to the JSON directory relative to the HTML file
  
    $.getJSON(directoryPath)
      .done(function(files) {
        files.forEach(function(file) {
          const filePath = directoryPath + '/' + file;
  
          $.getJSON(filePath)
            .done(function(jsonData) {
        
              displayJSONData(jsonData);
            })
            .fail(function(error) {
              console.error('Error reading JSON:', filePath, error);
            });
        });
      })
      .fail(function(error) {
        console.error('Error reading directory:', error);
      });
  });
  
  
function displayJSONData(jsonData) {
    const jsonContainer = $('#information-listing');

    // Create an unordered list element
    const list = $('<ul>').addClass('custom-list');
  
    // Get the keys from the JSON data

    
    const keys = Object.keys(jsonData);
  
    // Create a list item for each data entry
    keys.forEach(key => {
        const formattedKey = key.replace(/[_]/gi, ' ');
        const listItem = $('<li>')

        const keySpan = $('<span>').addClass('key').text(formattedKey.charAt(0).toLocaleUpperCase() + formattedKey.slice(1) + ': ');
    
        // Create a span element for the JSON data value
        const valueSpan = $('<span>').addClass('value').text(jsonData[key]);
        
        listItem.append(keySpan, valueSpan);
        
        list.append(listItem)
    });
  
    // Append the list to the container
    jsonContainer.append(list);
  }
  