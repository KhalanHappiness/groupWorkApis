document.addEventListener("DOMContentLoaded", function() {

    let form = document.getElementById("jobSearch");
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      //retrieves the value entered in the search input field
      let search = document.getElementById("search").value;
      //finds the html element where the search results will be displayed
      let resultsContainer = document.getElementById("results");

      
      
      // Show loading indicator while waiting for API response
      resultsContainer.innerHTML = "<p>Loading jobs...</p>";
      
      // Call the local proxy instead
      fetch(`http://localhost:3000/proxy/jobs?search=${encodeURIComponent(search)}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          //Clears any previous search results or loading message
          resultsContainer.innerHTML = "";
          
          // handles the API results and falls back to an empty array if no results are fiund
          const jobs = data.results || [];
          
          if (jobs.length === 0) {
            resultsContainer.innerHTML = "<p>No jobs found matching your search.</p>";
            return;
            //Displays a message if no jobs are found and exits the function
          }
          
          //loops through each job in the results and creates html for each job and fallback
          jobs.forEach(job => {
            resultsContainer.innerHTML += `
              <div class="job-item" style="margin-bottom: 20px; border-bottom: 2px solid #eee; padding-bottom: 15px;">
                <h3 style="color: #333;">${job.role || job.title || 'Untitled Position'}</h3>
                <p><strong>Company:</strong> ${job.company_name || 'Not specified'}</p>
                <p><strong>Location:</strong> ${job.location || 'Remote/Not specified'}</p>
                <p>${job.description || job.text || 'No description available.'}</p>
                ${job.url ? `<button><a href="${job.url}" target="_blank">View Job</a></button>` : ''}
                
              </div>
            `;
          });
        })
        //Catches and handles any errors that occur during the fetch process
        .catch(error => {
          console.error('Error:', error);
          resultsContainer.innerHTML = 
            `<p>Error fetching jobs: ${error.message}</p>`;
        });
    });
  });