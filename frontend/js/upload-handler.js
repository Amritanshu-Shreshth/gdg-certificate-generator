class FileUploadHandler {
    constructor(dropAreaId, fileInputId) {
        this.dropArea = document.getElementById(dropAreaId);
        this.fileInput = document.getElementById(fileInputId);
        this.initHandlers();
    }

    initHandlers() {
        this.dropArea.addEventListener('dragover', (event) => this.handleDragOver(event));
        this.dropArea.addEventListener('dragleave', (event) => this.handleDragLeave(event));
        this.dropArea.addEventListener('drop', (event) => this.handleFileDrop(event));
        this.fileInput.addEventListener('change', (event) => this.handleFileSelect(event));
    }

    handleDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        this.dropArea.classList.add('drag-over');
    }

    handleDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        this.dropArea.classList.remove('drag-over');
    }

    handleFileDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        this.dropArea.classList.remove('drag-over');
        const files = event.dataTransfer.files;
        this.validateFiles(files);
    }

    handleFileSelect(event) {
        const files = event.target.files;
        this.validateFiles(files);
    }

    validateFiles(files) {
        for (const file of files) {
            if (this.isValidFileType(file) && this.isValidFileSize(file)) {
                this.displayFile(file);
            } else {
                this.handleError(`File ${file.name} is invalid.`);
            }
        }
    }

    isValidFileType(file) {
        const allowedTypes = ['text/csv', 'application/pdf'];
        return allowedTypes.includes(file.type);
    }

    isValidFileSize(file) {
        const maxSize = 5 * 1024 * 1024; // 5MB
        return file.size <= maxSize;
    }

    displayFile(file) {
        const fileDisplay = document.createElement('div');
        fileDisplay.textContent = `Uploaded: ${file.name}`;
        this.dropArea.appendChild(fileDisplay);
    }

    handleError(message) {
        console.error(message);
        const errorDisplay = document.createElement('div');
        errorDisplay.classList.add('error');
        errorDisplay.textContent = message;
        this.dropArea.appendChild(errorDisplay);
    }
}

// Usage example:
// const uploader = new FileUploadHandler('drop-area', 'file-upload-input');