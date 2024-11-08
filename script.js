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
    
            artDiv.querySelector('.like-button').addEventListener('click', function() {
                const likeCount = artDiv.querySelector('.like-count');
                likeCount.textContent = parseInt(likeCount.textContent) + 1;

                this.style.color = '#ffcc00'; 
                this.disabled = true; 
                this.innerHTML += ' (Liked!)'; 
            });
        };
        
        reader.readAsDataURL(file);
        alert("Your artwork is being uploaded!");
        
        document.querySelector('#gallery').scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => { document.getElementById('uploadForm').reset(); }, 2000);
        
      }
});
