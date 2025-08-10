import { isValidEmail, isValidName, showMessage, saveToLocalStorage } from './utils.js';

export function initForm() {
    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        setupFormValidation();
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    if (validateFormData(data)) {
        submitForm(data);
    }
}

function validateFormData(data) {
    if (!isValidName(data.fullname)) {
        showMessage('Vui lòng nhập họ tên hợp lệ (ít nhất 2 ký tự)!', 'error');
        return false;
    }
    
    if (!isValidEmail(data.email)) {
        showMessage('Vui lòng nhập email hợp lệ!', 'error');
        return false;
    }
    
    if (!data.experience) {
        showMessage('Vui lòng chọn mức độ kinh nghiệm!', 'warning');
        return false;
    }
    
    return true;
}

function submitForm(data) {
    // Simulate API call
    setTimeout(() => {
        // Save to localStorage
        const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
        registrations.push({
            ...data,
            id: Date.now(),
            timestamp: new Date().toISOString()
        });
        
        saveToLocalStorage('registrations', registrations);
        
        showMessage('Đăng ký thành công! Chúng tôi sẽ liên hệ sớm.', 'success');
        document.getElementById('registrationForm').reset();
        
        // Optional: Redirect or update UI
        updateRegistrationCount();
        
    }, 1000);
    
    showMessage('Đang xử lý đăng ký...', 'info');
}

function setupFormValidation() {
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('fullname');
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            if (emailInput.value && !isValidEmail(emailInput.value)) {
                emailInput.style.borderColor = '#f44336';
            } else {
                emailInput.style.borderColor = '#ddd';
            }
        });
    }
    
    if (nameInput) {
        nameInput.addEventListener('blur', () => {
            if (nameInput.value && !isValidName(nameInput.value)) {
                nameInput.style.borderColor = '#f44336';
            } else {
                nameInput.style.borderColor = '#ddd';
            }
        });
    }
}

function updateRegistrationCount() {
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    const count = registrations.length;
    
    // Update UI with new count
    const countElement = document.querySelector('.registration-count');
    if (countElement) {
        countElement.textContent = count;
    }
}

export { updateRegistrationCount };