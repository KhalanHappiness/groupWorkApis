document.addEventListener("DOMContentLoaded", function() {
    let form = document.getElementById("jobSearch");
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let search = document.getElementById("search").value;
      let resultsContainer = document.getElementById("results");

      
      
      // Show loading indicator
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
          resultsContainer.innerHTML = "";
          
          // Check if data is an array or has a results property
          const jobs = data.results || [];
          
          if (jobs.length === 0) {
            resultsContainer.innerHTML = "<p>No jobs found matching your search.</p>";
            return;
          }
          
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
        .catch(error => {
          console.error('Error:', error);
          resultsContainer.innerHTML = 
            `<p>Error fetching jobs: ${error.message}</p>`;
        });
    });
  });