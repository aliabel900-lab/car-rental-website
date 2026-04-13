// Smooth scrolling for navigation links
document.querySelectorAll('header nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        if(this.hash !== '') {
            e.preventDefault();
            const target = document.querySelector(this.hash);
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Back-to-top button
const backToTop = document.createElement('button');
backToTop.textContent = '↑';
backToTop.style.position = 'fixed';
backToTop.style.bottom = '20px';
backToTop.style.right = '20px';
backToTop.style.padding = '10px 15px';
backToTop.style.fontSize = '20px';
backToTop.style.background = '#ff6b6b';
backToTop.style.color = '#fff';
backToTop.style.border = 'none';
backToTop.style.borderRadius = '5px';
backToTop.style.cursor = 'pointer';
backToTop.style.display = 'none';
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if(window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

// Booking form interaction
const bookingForm = document.querySelector('#booking form');
const carSelect = bookingForm.querySelector('select');

// Add event to all "Book Now" buttons
document.querySelectorAll('.car button').forEach(button => {
    button.addEventListener('click', (e) => {
        const carName = e.target.closest('.car').querySelector('h3').textContent;
        carSelect.value = carName;
        // Scroll to booking form
        document.querySelector('#booking').scrollIntoView({ behavior: 'smooth' });
    });
});

// Booking form validation
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = bookingForm.querySelector('input[type="text"]').value.trim();
    const email = bookingForm.querySelector('input[type="email"]').value.trim();
    const pickup = bookingForm.querySelector('input[type="date"]:nth-of-type(1)').value;
    const drop = bookingForm.querySelector('input[type="date"]:nth-of-type(2)').value;
    const car = carSelect.value;

    if(name === '' || email === '' || pickup === '' || drop === '' || car === '') {
        alert('Please fill in all fields.');
        return;
    }

    if(new Date(drop) < new Date(pickup)) {
        alert('Return date cannot be before pick-up date.');
        return;
    }

    alert(`Thank you ${name}! Your booking for ${car} from ${pickup} to ${drop} has been received.`);
    bookingForm.reset();
});