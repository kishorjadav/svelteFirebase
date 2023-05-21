<script>
  let selectedImage = null;

  function handleDrop(event) {
    console.log(event);
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      selectedImage = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }
</script>

<div class="dropzone" on:drop={handleDrop} on:dragover={handleDragOver}>
  {#if selectedImage}
    <img class="preview-image" src={selectedImage} alt="Selected Image" />
  {:else}
    <p>Drop an image here</p>
  {/if}
</div>

<style>
  .dropzone {
    width: 300px;
    height: 300px;
    border: 2px dashed gray;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .preview-image {
    max-width: 100%;
    max-height: 100%;
  }
</style>
