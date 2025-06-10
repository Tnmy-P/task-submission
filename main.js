const prices = {
    '1': '$10.00 USD',
    '2': '$18.00 USD',
    '3': '$24.00 USD'
};

const customizationRows = {
    '1': 1,
    '2': 2,
    '3': 0
};

const cards = Array.from(document.querySelectorAll('.option-card'));
const radioButtons = document.querySelectorAll('input[name="units"]');
const totalPriceElement = document.querySelector('.total-price');

function updateCustomizationRows(selectedUnits) {
    cards.forEach(card => {
        const units = card.getAttribute('data-units');
        const rows = card.querySelectorAll('.customization-row');
        rows.forEach((row, idx) => {
            row.style.display = (units === selectedUnits && idx < customizationRows[units]) ? 'flex' : 'none';
        });
    });
}

function setSelectedCard(val) {
    cards.forEach(card => {
        const isSelected = card.getAttribute('data-units') === val;
        card.classList.toggle('selected', isSelected);
        updateCustomizationRows(val);
    });
}

radioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.checked) {
            totalPriceElement.textContent = `Total : ${prices[this.value]}`;
            setSelectedCard(this.value);
        }
    });
});

cards.forEach(card => {
    card.addEventListener('click', function(e) {
        const radio = this.querySelector('input[type="radio"]');
        if (!radio.checked) {
            radio.checked = true;
            radio.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
    card.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.click();
        }
    });
});

setSelectedCard('1');
totalPriceElement.textContent = `Total : ${prices['1']}`;

document.querySelector('.add-to-cart-btn').addEventListener('click', function() {
    const selectedOption = document.querySelector('input[name="units"]:checked');
});