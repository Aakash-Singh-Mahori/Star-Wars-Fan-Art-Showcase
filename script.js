document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('artTitle').value.trim();
    
    const fileInput = document.getElementById('artFile');
    
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const gallery = document.getElementById('artGallery');
            const artDiv = document.createElement('div');
            
            artDiv.innerHTML = `
                <div class="art-item">
                    <h3>${title}</h3>
                    <img src="${e.target.result}" alt="${title}">
                    <p><button class="like-button"><i class="fas fa-thumbs-up"></i> Like</button> (<span class="like-count">0</span>)</p>
                </div>`;
            
            gallery.appendChild(artDiv);
            document.getElementById('uploadForm').reset();
            
            // Add like functionality
            artDiv.querySelector('.like-button').addEventListener('click', function() {
                const likeCount = artDiv.querySelector('.like-count');
                likeCount.textContent = parseInt(likeCount.textContent) + 1;

                // Optional visual feedback
                this.style.color = '#ffcc00'; // Change button color on like
                this.disabled = true; // Disable button after liking
                this.innerHTML += ' (Liked!)'; // Update button text
            });
        };
        
        reader.readAsDataURL(file);
        
        // Optional feedback for users
        alert("Your artwork is being uploaded!");
        
        // Smooth scroll to gallery after upload
        document.querySelector('#gallery').scrollIntoView({ behavior: 'smooth' });
        
        // Reset form after a short delay to allow user to see the alert
        setTimeout(() => { document.getElementById('uploadForm').reset(); }, 2000);
        
      }
});