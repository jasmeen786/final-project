// JavaScript Code
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('workspaceForm');

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Gather form data
        const workspace = {
            name: form.name.value,
            category: form.category.value,
            price: parseFloat(form.price.value),
            description: form.description.value,
            location: form.location.value,
            address: form.address.value,
            area: parseFloat(form.area.value),
            capacity: parseInt(form.capacity.value),
            smoking: form.smoking.value,
            parking: form.parking.value,
            distanceToTransport: parseInt(form.distanceToTransport.value),
            images: []
        };

        // Get image files
        const imageFiles = form.images.files;

        // Process images using FileReader
        let processedImagesCount = 0;

        Array.from(imageFiles).forEach((file, index) => {
            const reader = new FileReader();

            reader.onload = function() {
                workspace.images.push(reader.result);
                processedImagesCount++;

                // If all images have been processed, store the workspace
                if (processedImagesCount === imageFiles.length) {
                    saveWorkspace(workspace);
                    form.reset();
                    alert("Workspace created successfully!");
                }
            };

            reader.readAsDataURL(file);
        });
    });

    // Function to save workspace data to local storage
    function saveWorkspace(workspace) {
        const existingWorkspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
        existingWorkspaces.push(workspace);
        localStorage.setItem('workspaces', JSON.stringify(existingWorkspaces));
    }
});
