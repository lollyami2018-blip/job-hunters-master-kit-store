// Configuration
const SERVER_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : window.location.origin;

const PLAN_PRICE = 20.00;
let customerEmail = null;

// Scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Get email and validate
function getCustomerEmail() {
    const emailInput = document.getElementById('email');
    const email = emailInput ? emailInput.value.trim() : null;
    
    if (!email) {
        alert('Please enter your email address');
        return null;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return null;
    }
    
    return email;
}

// Email validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Start checkout
function startCheckout() {
    scrollToSection('pricing');
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.focus();
    }
}

// Proceed to checkout with PayPal
async function proceedToCheckout() {
    const email = getCustomerEmail();
    if (!email) return;
    
    customerEmail = email;
    
    try {
        // Create PayPal order
        const response = await fetch(`${SERVER_URL}/api/create-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                plan: 'professional'
            })
        });
        
        const data = await response.json();
        
        if (data.success && data.approvalUrl) {
            // Redirect to PayPal approval
            window.location.href = data.approvalUrl;
        } else {
            alert('Error creating payment order. Please try again.');
            console.error('Order creation error:', data);
        }
        
    } catch (error) {
        alert('Error processing checkout. Please try again.');
        console.error('Checkout error:', error);
    }
}

// Handle PayPal return (after successful payment)
async function handlePaymentReturn() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('token'); // PayPal returns token as order ID
    
    if (orderId && customerEmail) {
        try {
            const response = await fetch(`${SERVER_URL}/api/capture-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: orderId,
                    email: customerEmail,
                    plan: 'professional'
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Store download token and redirect to download page
                localStorage.setItem('downloadToken', data.downloadToken);
                localStorage.setItem('customerEmail', customerEmail);
                localStorage.setItem('planType', 'professional');
                
                // Redirect to success page or trigger download
                window.location.href = `/success.html?token=${data.downloadToken}`;
            }
            
        } catch (error) {
            console.error('Payment capture error:', error);
        }
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Job Hunters Master Kit Store loaded');
    
    // Check if returning from PayPal
    if (window.location.search.includes('token=')) {
        handlePaymentReturn();
    }
});

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Log analytics
function logEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    // In production, send to analytics service
}
