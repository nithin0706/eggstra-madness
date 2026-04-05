document.addEventListener('DOMContentLoaded', () => {
    initLandingPage();
    initMagneticButtons();
    
    // Phase 2 additions
    initParallax();
    
    // Phase 3 additions
    initCalendar();
    initRecipes();
    
    // Phase 4 additions
    initShop();
    
    // Phase 5 additions
    initGames();
    
    // Phase 6 additions
    initRewards();
    initCards();

    // Dark Mode
    initDarkMode();
});

/* ========================================================================= */
/* Landing Page Generative Effects                                             */
/* ========================================================================= */

function initLandingPage() {
    const landingPage = document.querySelector('.landing-page');
    if (!landingPage) return; // Only run on landing page

    createFloatingEggs();
    createParticles();
}

function createFloatingEggs() {
    const container = document.querySelector('.floating-eggs');
    if (!container) return;
    
    const eggCount = 8;
    const colors = [
        'rgba(230, 225, 250, 0.6)', // lavender
        'rgba(247, 208, 112, 0.4)', // gold
        'rgba(163, 228, 215, 0.4)'  // mint
    ];

    for (let i = 0; i < eggCount; i++) {
        const egg = document.createElement('div');
        egg.classList.add('bg-egg');
        
        // Randomize size between 60px and 180px
        const size = Math.random() * 120 + 60;
        egg.style.width = `${size}px`;
        egg.style.height = `${size * 1.3}px`; // Proper egg ratio
        
        // Randomize position
        egg.style.left = `${Math.random() * 100}vw`;
        egg.style.top = `${Math.random() * 100}vh`;
        
        // Randomize color
        const color = colors[Math.floor(Math.random() * colors.length)];
        egg.style.background = `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), ${color})`;
        
        // Randomize animation delay and duration to make them out of sync
        egg.style.animationDelay = `${Math.random() * 5}s`;
        egg.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        container.appendChild(egg);
    }
}

function createParticles() {
    const container = document.querySelector('.particles');
    if (!container) return;

    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        // Use basic inline styling for particles to keep it dynamic
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(255, 255, 255, 0.8)';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
        
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // Animation
        particle.style.transition = 'transform 3s ease-out, opacity 3s ease-out';
        
        // Drift animation mimicking dust/pollen
        setInterval(() => {
            const x = (Math.random() - 0.5) * 50;
            const y = (Math.random() - 0.5) * 50;
            const opacity = Math.random() * 0.5 + 0.2;
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = opacity;
        }, 3000 + Math.random() * 2000);

        container.appendChild(particle);
    }
}

/* ========================================================================= */
/* Magnetic Button Interactions                                                  */
/* ========================================================================= */

function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        const glow = btn.querySelector('.glow');
        
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Magnetic Pull
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const pullX = (x - centerX) * 0.2;
            const pullY = (y - centerY) * 0.2;
            
            btn.style.transform = `translate(${pullX}px, ${pullY}px)`;
            
            // Glow effect tracking mouse
            if (glow) {
                glow.style.left = `${x}px`;
                glow.style.top = `${y}px`;
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            // Reset magnetic pull
            btn.style.transform = 'translate(0px, 0px) scale(1)';
        });
        
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'translate(0px, 0px) scale(0.95)';
        });
        
        btn.addEventListener('mouseup', () => {
            btn.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });
}

/* ========================================================================= */
/* Phase 2: Parallax Scrolling                                                 */
/* ========================================================================= */

function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed') || 0.05;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

/* ========================================================================= */
/* Phase 3: Fasting Calendar Logic                                             */
/* ========================================================================= */

const proverbs = [
    "Reflection brings clarity to the soul.", "Patience is the companion of wisdom.", 
    "A renewed mind sees a renewed world.", "Fasting empties the body to fill the spirit.",
    "True wealth is found in gratitude.", "Light shines brightest in the dark.",
    "Every new sunrise is a new beginning.", "Silence speaks louder than words.",
    "Forgiveness is the key to inner peace.", "Joy is a choice made every day.",
    "Faith is the bird that feels the light.", "Hope anchors the soul.",
    "Love bears all things, believes all things.", "Grace is given, not earned.",
    "Strength grows in the moments you think you can't go on."
];
// Generate 50 proverbs by repeating the thematic ones
const fullProverbs = Array.from({length: 50}, (_, i) => proverbs[i % proverbs.length]);

function initCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return; // Only run on calendar page

    const totalDays = 50;
    
    // Set Start Date if not exists
    if (!localStorage.getItem('eggstra_start_date')) {
        localStorage.setItem('eggstra_start_date', new Date().getTime());
    }
    
    const startDate = parseInt(localStorage.getItem('eggstra_start_date'));
    const now = new Date().getTime();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // Day 1 is the first day
    
    // Get completed days
    const completedDays = JSON.parse(localStorage.getItem('eggstra_completed_days') || '[]');

    renderCalendar(totalDays, diffDays, completedDays);
    updateCalendarStats(totalDays, completedDays);
}

function renderCalendar(totalDays, currentDay, completedDays) {
    const calendarGrid = document.getElementById('calendarGrid');
    const proverbText = document.getElementById('proverbText');
    
    calendarGrid.innerHTML = '';
    
    for (let i = 1; i <= totalDays; i++) {
        const dayBox = document.createElement('div');
        dayBox.classList.add('day-box');
        dayBox.innerText = i;
        
        let isCompleted = completedDays.includes(i);
        
        if (isCompleted) {
            dayBox.classList.add('completed');
        } else if (i === currentDay) {
            dayBox.classList.add('current');
        } else if (i > currentDay) {
            dayBox.classList.add('future');
        }

        // Interaction
        dayBox.addEventListener('click', () => {
            // Show Proverb
            proverbText.innerText = `Day ${i}: ${fullProverbs[i-1]}`;
            
            // Toggle completed
            if (isCompleted) {
                const index = completedDays.indexOf(i);
                completedDays.splice(index, 1);
                dayBox.classList.remove('completed');
                if (i === currentDay) dayBox.classList.add('current');
            } else {
                completedDays.push(i);
                dayBox.classList.add('completed');
                dayBox.classList.remove('current');
            }
            
            isCompleted = !isCompleted;
            localStorage.setItem('eggstra_completed_days', JSON.stringify(completedDays));
            updateCalendarStats(totalDays, completedDays);
        });
        
        calendarGrid.appendChild(dayBox);
    }
}

function updateCalendarStats(totalDays, completedDays) {
    const sortedDays = [...completedDays].sort((a,b) => a - b);
    let streak = 0;
    
    // Calculate simple streak (consecutive from end of sorted)
    if (sortedDays.length > 0) {
        streak = 1;
        for (let i = sortedDays.length - 1; i > 0; i--) {
            if (sortedDays[i] - 1 === sortedDays[i-1]) {
                streak++;
            } else {
                break;
            }
        }
    }

    document.getElementById('streakValue').innerText = streak;
    
    // Update Ring
    const percentage = Math.round((completedDays.length / totalDays) * 100);
    document.getElementById('progressPercent').innerText = percentage;
    
    const circle = document.getElementById('progressCircle');
    if (circle) {
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        const offset = circumference - (percentage / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }
}

/* ========================================================================= */
/* Phase 3: Recipes Logic                                                      */
/* ========================================================================= */

const recipesData = {
    'lemon_pancakes': {
        title: "Lemon Ricotta Easter Pancakes",
        desc: "Light, fluffy, and infused with the bright zest of springtime lemons. A refreshing twist on a classic breakfast favorite.",
        image: "assets/lemon_ricotta.png",
        baseServings: 4,
        ingredients: [
            { base: 1, unit: "cup", name: "ricotta cheese" },
            { base: 0.5, unit: "cup", name: "milk" },
            { base: 1, unit: "tbsp", name: "lemon zest" },
            { base: 3, unit: "", name: "eggs" },
            { base: 1, unit: "cup", name: "flour" }
        ],
        steps: [
            { title: "Step 1 of 4", desc: "Whisk together the ricotta, milk, and eggs until perfectly smooth." },
            { title: "Step 2 of 4", desc: "Gently fold in the flour, baking powder, and fresh lemon zest." },
            { title: "Step 3 of 4", desc: "Heat a lightly oiled griddle over medium heat and pour batter." },
            { title: "Step 4 of 4", desc: "Cook until bubbles form, flip, and serve warm with syrup." }
        ]
    },
    'kerala_appam': {
        title: "Kerala Appam & Mutton Stew",
        desc: "A traditional South Indian Christian Easter morning staple. Lacy rice pancakes paired with a rich coconut milk stew.",
        image: "assets/kerala_appam.png",
        baseServings: 4,
        ingredients: [
            { base: 2, unit: "cups", name: "rice flour (for appam base)" },
            { base: 1, unit: "cup", name: "coconut milk" },
            { base: 500, unit: "grams", name: "mutton, cubed" },
            { base: 2, unit: "", name: "potatoes, diced" },
            { base: 1, unit: "tbsp", name: "whole spices (cloves, cardamom, cinnamon)" },
            { base: 2, unit: "cups", name: "thick coconut milk (for stew)" }
        ],
        steps: [
            { title: "Step 1 of 4", desc: "Prepare the appam batter the night before and let it ferment." },
            { title: "Step 2 of 4", desc: "Pressure cook the mutton with salt, turmeric, and ginger-garlic paste." },
            { title: "Step 3 of 4", desc: "Sauté onions and spices, add the cooked mutton and thin coconut milk, let it simmer." },
            { title: "Step 4 of 4", desc: "Add thick coconut milk and serve warm with fresh appams made in an appachatti, a special curved pan." }
        ]
    },
    'goan_eggs': {
        title: "Goan Marzipan Easter Sweets",
        desc: "A colorful, festive Goan tradition! Handcrafted sweet treats shaped into eggs to celebrate the season.",
        image: "assets/goan_eggs.png",
        baseServings: 12,
        ingredients: [
            { base: 250, unit: "grams", name: "cashew nuts (ground)" },
            { base: 250, unit: "grams", name: "icing sugar" },
            { base: 2, unit: "", name: "egg whites" },
            { base: 1, unit: "tsp", name: "rose essence" },
            { base: 0.5, unit: "tsp", name: "food coloring (assorted)" }
        ],
        steps: [
            { title: "Step 1 of 3", desc: "Mix ground cashews and icing sugar thoroughly in a large bowl." },
            { title: "Step 2 of 3", desc: "Slowly bind with egg whites and rose essence until a smooth dough forms." },
            { title: "Step 3 of 3", desc: "Divide, add colors, and mold tightly into egg shapes. Let dry." }
        ]
    },
    'blueberry_pancakes': {
        title: "Blueberry Pancakes",
        desc: "A towering stack of fluffy pancakes bursting with fresh blueberries, drizzled with sweet maple syrup.",
        image: "assets/blueberry_pancakes.jpg",
        baseServings: 4,
        ingredients: [
            { base: 1.5, unit: "cups", name: "flour" },
            { base: 1, unit: "cup", name: "milk" },
            { base: 1, unit: "cup", name: "fresh blueberries" },
            { base: 2, unit: "tbsp", name: "butter" },
            { base: 2, unit: "", name: "eggs" }
        ],
        steps: [
            { title: "Step 1 of 4", desc: "Whisk wet ingredients together in a medium bowl." },
            { title: "Step 2 of 4", desc: "Fold in dry ingredients and the fresh blueberries." },
            { title: "Step 3 of 4", desc: "Cook on a hot griddle until bubbly on top, then flip." },
            { title: "Step 4 of 4", desc: "Serve stacked high with warm maple syrup." }
        ]
    },
    'carrot_cake': {
        title: "Classic Easter Carrot Cake",
        desc: "A moist, spiced carrot cake topped with rich cream cheese frosting and crunchy walnuts. Perfect for a festive Easter dessert.",
        image: "assets/carrot_cake.jpg",
        baseServings: 8,
        ingredients: [
            { base: 2, unit: "cups", name: "grated carrots" },
            { base: 1.5, unit: "cups", name: "flour" },
            { base: 1, unit: "cup", name: "sugar" },
            { base: 3, unit: "", name: "eggs" },
            { base: 0.5, unit: "cup", name: "walnuts" },
            { base: 1, unit: "cup", name: "cream cheese frosting" }
        ],
        steps: [
            { title: "Step 1 of 4", desc: "Mix grated carrots, eggs, and sugar in a large bowl." },
            { title: "Step 2 of 4", desc: "Combine and fold in flour and spices to form the batter." },
            { title: "Step 3 of 4", desc: "Bake at 350°F (175°C) for 35 minutes, or until a toothpick comes out clean." },
            { title: "Step 4 of 4", desc: "Let it cool completely, then spread thick cream cheese frosting and garnish with walnuts." }
        ]
    },
    'easter_cupcakes': {
        title: "Easter Bunny Cupcakes",
        desc: "Deliciously tender vanilla cupcakes adorned with pastel buttercream and playful bunny ears.",
        image: "assets/easter_cupcakes.jpg",
        baseServings: 12,
        ingredients: [
            { base: 1.5, unit: "cups", name: "flour" },
            { base: 1, unit: "cup", name: "sugar" },
            { base: 0.5, unit: "cup", name: "butter" },
            { base: 2, unit: "", name: "eggs" },
            { base: 1, unit: "cup", name: "pastel buttercream" },
            { base: 12, unit: "sets", name: "fondant bunny ears" }
        ],
        steps: [
            { title: "Step 1 of 4", desc: "Cream the butter and sugar together, then beat in the eggs." },
            { title: "Step 2 of 4", desc: "Mix in flour until the batter is smooth, and divide evenly into a lined cupcake tin." },
            { title: "Step 3 of 4", desc: "Bake for 20 minutes until golden, then let cool." },
            { title: "Step 4 of 4", desc: "Swirl pastel frosting on top of each cupcake and place the bunny ears." }
        ]
    },
    'roast_lamb': {
        title: "Rosemary Roast Lamb",
        desc: "A succulent and tender roast lamb infused with fragrant rosemary and garlic, served with golden roasted potatoes.",
        image: "assets/roast_lamb.jpg",
        baseServings: 6,
        ingredients: [
            { base: 1, unit: "leg", name: "of lamb (about 2kg)" },
            { base: 4, unit: "sprigs", name: "fresh rosemary" },
            { base: 6, unit: "cloves", name: "garlic" },
            { base: 1, unit: "kg", name: "potatoes, cubed" },
            { base: 2, unit: "tbsp", name: "olive oil" }
        ],
        steps: [
            { title: "Step 1 of 4", desc: "Pierce the leg of lamb and insert garlic slices and small sprigs of rosemary into the slits." },
            { title: "Step 2 of 4", desc: "Rub the lamb with olive oil, salt, and pepper." },
            { title: "Step 3 of 4", desc: "Arrange cubed potatoes around the lamb and roast in the oven at 375°F (190°C) until cooked to your liking." },
            { title: "Step 4 of 4", desc: "Let the meat rest for 15 minutes before carving, and serve with the roasted potatoes and pan juices." }
        ]
    }
};

function initRecipes() {
    const selectorContainer = document.getElementById('recipeSelector');
    const viewer = document.getElementById('recipeViewer');
    const collectionLayout = document.getElementById('recipeCollectionLayout');
    const viewerContainer = document.getElementById('recipeViewerContainer');
    const backBtn = document.getElementById('backToCollectionBtn');

    if (!selectorContainer || !viewer) return;

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            viewerContainer.classList.add('hidden');
            collectionLayout.classList.remove('hidden');
        });
    }

    // Render image cards
    Object.keys(recipesData).forEach(key => {
        const data = recipesData[key];
        const card = document.createElement('div');
        card.classList.add('recipe-image-card', 'fade-in');
        
        card.innerHTML = `
            <img src="${data.image}" alt="${data.title}">
            <h4>${data.title}</h4>
        `;
        
        card.addEventListener('click', () => {
            collectionLayout.classList.add('hidden');
            viewerContainer.classList.remove('hidden');
            renderRecipe(key);
            window.scrollTo({ top: 300, behavior: 'smooth' });
        });
        
        selectorContainer.appendChild(card);
    });

    function renderRecipe(key) {
        const data = recipesData[key];
        
        let ingredientsHTML = '';
        data.ingredients.forEach(ing => {
            ingredientsHTML += `<li data-base="${ing.base}" data-unit="${ing.unit}" data-name="${ing.name}">
                ${ing.base} ${ing.unit} ${ing.name}
            </li>`;
        });

        viewer.innerHTML = `
            <div class="recipe-card glass-panel fade-in">
                <div class="recipe-image-placeholder" style="background-image: url('${data.image}')">
                </div>
                
                <div class="recipe-content">
                    <h2>${data.title}</h2>
                    <p class="recipe-desc">${data.desc}</p>
                    
                    <div class="scale-servings">
                        <label for="servingsInput">Servings:</label>
                        <input type="number" id="servingsInput" value="${data.baseServings}" min="1" max="50" class="glass-input">
                    </div>

                    <div class="recipe-grid">
                        <div class="ingredients-list">
                            <h3>Ingredients</h3>
                            <ul id="ingredientList">
                                ${ingredientsHTML}
                            </ul>
                        </div>
                        
                        <div class="cook-mode-panel">
                            <div class="cook-mode-header">
                                <h3>Cook Mode</h3>
                                <button id="startCookMode" class="glass-btn small-btn">Start Step-by-Step</button>
                            </div>
                            
                            <div id="cookModeSteps" class="cook-steps hidden">
                                <div class="progress-bar-container">
                                    <div id="recipeProgress" class="progress-bar"></div>
                                </div>
                                
                                <div class="step-card glass-panel">
                                    <h4 id="stepTitle"></h4>
                                    <p id="stepDescription"></p>
                                </div>
                                
                                <div class="step-controls">
                                    <button id="prevStep" class="glass-btn small-btn" disabled>Previous</button>
                                    <button id="nextStep" class="glass-btn small-btn primary-btn">Next Step</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        attachRecipeListeners(data);
    }

    function attachRecipeListeners(data) {
        const servingsInput = document.getElementById('servingsInput');
        const startCookModeBtn = document.getElementById('startCookMode');
        const ingredientItems = document.querySelectorAll('#ingredientList li');
        
        // Scaling
        servingsInput.addEventListener('input', (e) => {
            let servings = parseInt(e.target.value);
            if (isNaN(servings) || servings < 1) servings = 1;

            const ratio = servings / data.baseServings;

            ingredientItems.forEach(li => {
                const baseAmount = parseFloat(li.getAttribute('data-base'));
                const unit = li.getAttribute('data-unit');
                const name = li.getAttribute('data-name');
                
                let newAmount = baseAmount * ratio;
                newAmount = Math.round(newAmount * 10) / 10; // 1 decimal place
                
                li.innerText = `${newAmount} ${unit} ${name}`;
            });
        });

        // Cook Mode
        let currentStepIndex = 0;
        const cookModeSteps = document.getElementById('cookModeSteps');
        const stepTitle = document.getElementById('stepTitle');
        const stepDescription = document.getElementById('stepDescription');
        const prevStepBtn = document.getElementById('prevStep');
        const nextStepBtn = document.getElementById('nextStep');
        const recipeProgress = document.getElementById('recipeProgress');

        function updateCookStep() {
            stepTitle.innerText = data.steps[currentStepIndex].title;
            stepDescription.innerText = data.steps[currentStepIndex].desc;
            
            prevStepBtn.disabled = currentStepIndex === 0;
            
            const progressPercentage = ((currentStepIndex) / (data.steps.length - 1)) * 100;
            recipeProgress.style.width = `${progressPercentage}%`;
        }

        startCookModeBtn.addEventListener('click', () => {
            cookModeSteps.classList.remove('hidden');
            startCookModeBtn.disabled = true;
            updateCookStep();
        });

        nextStepBtn.addEventListener('click', () => {
            if (currentStepIndex < data.steps.length - 1) {
                currentStepIndex++;
                updateCookStep();
            } else {
                stepTitle.innerText = "Enjoy!";
                stepDescription.innerText = "You've completed all steps.";
                nextStepBtn.disabled = true;
                prevStepBtn.disabled = true;
                recipeProgress.style.width = "100%";
            }
        });

        prevStepBtn.addEventListener('click', () => {
            if (currentStepIndex > 0) {
                currentStepIndex--;
                updateCookStep();
                nextStepBtn.disabled = false;
            }
        });
    }
}

/* ========================================================================= */
/* Phase 4: Basket & Shop Logic                                                */
/* ========================================================================= */

function initShop() {
    const coinBalanceEl = document.getElementById('coinBalance');
    const basketCart = document.getElementById('basketCart');
    const basketTotalEl = document.getElementById('basketTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const resetBasketBtn = document.getElementById('resetBasketBtn');
    const coinWarning = document.getElementById('coinWarning');
    const sendModal = document.getElementById('sendModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    if (!coinBalanceEl || !basketCart) return;

    // Load Wallet
    if (!localStorage.getItem('eggstra_coins')) {
        localStorage.setItem('eggstra_coins', 100);
    }
    let currentCoins = parseInt(localStorage.getItem('eggstra_coins'));
    const maxCoins = 300;
    
    // Ensure max limit
    if (currentCoins > maxCoins) {
        currentCoins = maxCoins;
        localStorage.setItem('eggstra_coins', currentCoins);
    }
    
    coinBalanceEl.innerText = currentCoins;

    // Cart state
    let cart = [];
    
    function updateCartUI() {
        basketCart.innerHTML = '';
        let total = 0;
        
        if (cart.length === 0) {
            basketCart.innerHTML = '<p class="empty-basket-msg">Your basket is waiting to be filled.</p>';
            checkoutBtn.disabled = true;
        } else {
            checkoutBtn.disabled = false;
            cart.forEach((item, index) => {
                total += item.price;
                const itemEl = document.createElement('div');
                itemEl.classList.add('cart-item');
                itemEl.innerHTML = `
                    <div class="cart-item-info">
                        <span class="cart-item-icon">${item.icon}</span>
                        <span class="cart-item-name">${item.name}</span>
                    </div>
                    <div class="cart-item-actions">
                        <span class="cart-item-price">${item.price}C</span>
                        <button class="remove-item" data-index="${index}">&times;</button>
                    </div>
                `;
                basketCart.appendChild(itemEl);
            });
        }
        
        basketTotalEl.innerText = `${total} Coins`;
        
        // Remove button events
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'));
                const removedItem = cart[idx];
                
                // Refund
                currentCoins += removedItem.price;
                saveCoins();
                
                // Remove from cart
                cart.splice(idx, 1);
                updateCartUI();
            });
        });
    }
    
    function showWarning() {
        coinWarning.classList.remove('hidden');
        setTimeout(() => coinWarning.classList.add('hidden'), 3000);
    }
    
    function saveCoins() {
        localStorage.setItem('eggstra_coins', currentCoins);
        coinBalanceEl.innerText = currentCoins;
    }

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const name = e.target.getAttribute('data-name');
            const price = parseInt(e.target.getAttribute('data-price'));
            const icon = e.target.getAttribute('data-icon');
            
            if (currentCoins >= price) {
                currentCoins -= price;
                saveCoins();
                
                cart.push({ id, name, price, icon });
                updateCartUI();
            } else {
                showWarning();
            }
        });
    });

    // Reset btn
    resetBasketBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            let totalRefund = cart.reduce((acc, curr) => acc + curr.price, 0);
            currentCoins += totalRefund;
            saveCoins();
            cart = [];
            updateCartUI();
        }
    });

    // Checkout / Send Basket
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            // Success! empty cart. No refund on send.
            cart = [];
            updateCartUI();
            
            // Show modal
            sendModal.classList.remove('hidden');
        }
    });

    closeModalBtn.addEventListener('click', () => {
        sendModal.classList.add('hidden');
    });
}

/* ========================================================================= */
/* Phase 5: Games Hub & 3D Feature                                             */
/* ========================================================================= */

function initGames() {
    const gamesContainer = document.querySelector('.games-container');
    if (!gamesContainer) return;

    // Reward Wallet Logic
    const rewardEggsCount = document.getElementById('rewardEggsCount');
    let rewardEggs = parseInt(localStorage.getItem('eggstra_reward_eggs') || '0');
    
    function addRewardEggs(amount) {
        rewardEggs += amount;
        localStorage.setItem('eggstra_reward_eggs', rewardEggs);
        if(rewardEggsCount) rewardEggsCount.innerText = rewardEggs;
    }
    
    if(rewardEggsCount) rewardEggsCount.innerText = rewardEggs;

    // Tabs Logic
    const tabs = document.querySelectorAll('.game-tab');
    const views = document.querySelectorAll('.game-view');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            views.forEach(v => v.classList.add('hidden', 'active')); // quick trick: add hidden to all, remove active
            
            views.forEach(v => { v.classList.add('hidden'); v.classList.remove('active'); });

            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            const targetView = document.getElementById(targetId);
            if(targetView) {
                targetView.classList.remove('hidden');
                targetView.classList.add('active');
            }
        });
    });

    initThreeJSEgg();
    initMemoryMatch(addRewardEggs);
    initPuzzleGame(addRewardEggs);
    initCatchGame(addRewardEggs);
    initTextAdventure(addRewardEggs);
    initCodingSprint(addRewardEggs);
}

// 1. Three.js 3D Golden Egg
function initThreeJSEgg() {
    const container = document.getElementById('threejs-canvas-container');
    if (!container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Create Egg Geometry (Sphere scaled appropriately)
    const geometry = new THREE.SphereGeometry(1.2, 32, 32);
    geometry.applyMatrix4(new THREE.Matrix4().makeScale(1.0, 1.3, 1.0)); // Stretch vertically

    const material = new THREE.MeshStandardMaterial({ 
        color: 0xF7D070, // Gold
        roughness: 0.2, 
        metalness: 0.8 
    });
    const egg = new THREE.Mesh(geometry, material);
    scene.add(egg);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Interaction (Rotate with mouse dragging)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    container.addEventListener('mousedown', () => { isDragging = true; });
    document.addEventListener('mouseup', () => { isDragging = false; });
    container.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaMove = {
                x: e.offsetX - previousMousePosition.x,
                y: e.offsetY - previousMousePosition.y
            };

            egg.rotation.y += deltaMove.x * 0.01;
            egg.rotation.x += deltaMove.y * 0.01;
        }
        previousMousePosition = { x: e.offsetX, y: e.offsetY };
    });

    // Auto rotate slightly
    function animate() {
        requestAnimationFrame(animate);
        if(!isDragging) {
            egg.rotation.y += 0.005;
        }
        renderer.render(scene, camera);
    }
    animate();
}

// 2. Memory Match
function initMemoryMatch(onWin) {
    const board = document.getElementById('memoryBoard');
    const scoreEl = document.getElementById('memoryScore');
    const winOverlay = document.getElementById('memoryWin');
    const resetBtns = document.querySelectorAll('.reset-game-btn');
    if (!board) return;

    const emojis = ['🐰', '🌸', '🐣', '🍬', '✝️', '🍫'];
    let cards = [...emojis, ...emojis];
    let flippedCards = [];
    let matchedCount = 0;

    function startGame() {
        cards.sort(() => Math.random() - 0.5);
        board.innerHTML = '';
        flippedCards = [];
        matchedCount = 0;
        scoreEl.innerText = '0';
        winOverlay.classList.add('hidden');

        cards.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.emoji = emoji;
            card.dataset.index = index;

            card.innerHTML = `
                <div class="front">${emoji}</div>
                <div class="back">🥚</div>
            `;
            
            card.addEventListener('click', () => {
                if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
                    card.classList.add('flipped');
                    flippedCards.push(card);

                    if (flippedCards.length === 2) {
                        setTimeout(checkMatch, 800);
                    }
                }
            });
            board.appendChild(card);
        });
    }

    function checkMatch() {
        const [c1, c2] = flippedCards;
        if (c1.dataset.emoji === c2.dataset.emoji) {
            matchedCount++;
            scoreEl.innerText = matchedCount;
            if (matchedCount === emojis.length) {
                winOverlay.classList.remove('hidden');
                onWin(5); // Reward 5 eggs
            }
        } else {
            c1.classList.remove('flipped');
            c2.classList.remove('flipped');
        }
        flippedCards = [];
    }

    resetBtns.forEach(btn => {
        if(btn.dataset.game === 'memory') {
            btn.addEventListener('click', startGame);
        }
    });

    startGame();
}

// 3. Puzzle Game (Simon Says style)
function initPuzzleGame(onWin) {
    const btns = document.querySelectorAll('.simon-btn');
    const startBtn = document.getElementById('startPuzzleBtn');
    const status = document.getElementById('puzzleStatus');
    const roundEl = document.getElementById('puzzleRound');
    if (btns.length === 0) return;

    let sequence = [];
    let playerSequence = [];
    let round = 1;
    const maxRounds = 5;
    let isAcceptingInput = false;

    startBtn.addEventListener('click', startSequence);

    function startSequence() {
        startBtn.disabled = true;
        sequence = [];
        playerSequence = [];
        round = 1;
        roundEl.innerText = round;
        status.innerText = "Watch the sequence...";
        status.style.color = "inherit";
        playRound();
    }

    function playRound() {
        sequence.push(Math.floor(Math.random() * 4));
        roundEl.innerText = round;
        isAcceptingInput = false;

        let i = 0;
        const interval = setInterval(() => {
            const btnIdx = sequence[i];
            const btn = btns[btnIdx];
            
            btn.classList.add('active');
            setTimeout(() => btn.classList.remove('active'), 400);

            i++;
            if (i >= sequence.length) {
                clearInterval(interval);
                isAcceptingInput = true;
                status.innerText = "Your turn!";
                playerSequence = [];
            }
        }, 800);
    }

    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!isAcceptingInput) return;
            const colorIdx = parseInt(e.target.dataset.color);
            playerSequence.push(colorIdx);

            const currentIndex = playerSequence.length - 1;
            if (playerSequence[currentIndex] !== sequence[currentIndex]) {
                status.innerText = "Wrong sequence! Game Over.";
                status.style.color = "#e74c3c";
                startBtn.disabled = false;
                isAcceptingInput = false;
                startBtn.innerText = "Try Again";
                return;
            }

            if (playerSequence.length === sequence.length) {
                if (round === maxRounds) {
                    status.innerText = "You Won! +10 Reward Eggs 🎉";
                    status.style.color = "#27ae60";
                    startBtn.disabled = false;
                    isAcceptingInput = false;
                    startBtn.innerText = "Play Again";
                    onWin(10);
                } else {
                    round++;
                    status.innerText = "Good job! Next round...";
                    isAcceptingInput = false;
                    setTimeout(playRound, 1000);
                }
            }
        });
    });
}

// 4. Egg Catch Game
function initCatchGame(onWin) {
    const catchArea = document.getElementById('catchArea');
    const startBtn = document.getElementById('startCatchBtn');
    const scoreEl = document.getElementById('catchScore');
    const missedEl = document.getElementById('catchMissed');
    const status = document.getElementById('catchStatus');
    if (!catchArea) return;

    let score = 0;
    let missed = 0;
    let gameInterval;
    let isPlaying = false;

    startBtn.addEventListener('click', () => {
        score = 0; missed = 0;
        scoreEl.innerText = score;
        missedEl.innerText = missed;
        catchArea.innerHTML = '';
        status.innerText = '';
        startBtn.disabled = true;
        isPlaying = true;

        gameInterval = setInterval(spawnEgg, 800);
    });

    function spawnEgg() {
        if (!isPlaying) return;
        
        const egg = document.createElement('div');
        egg.classList.add('falling-egg');
        egg.innerText = ['🥚', '🐣', '🍬', '🐰'][Math.floor(Math.random()*4)];
        
        const maxLeft = catchArea.clientWidth - 40;
        egg.style.left = Math.random() * maxLeft + 'px';
        catchArea.appendChild(egg);

        let top = -50;
        const fallSpeed = Math.random() * 2 + 2;

        const fallInterval = setInterval(() => {
            if (!isPlaying) {
                clearInterval(fallInterval);
                egg.remove();
                return;
            }
            top += fallSpeed;
            egg.style.top = top + 'px';

            if (top > catchArea.clientHeight) {
                clearInterval(fallInterval);
                egg.remove();
                missed++;
                missedEl.innerText = missed;
                checkGameState();
            }
        }, 20);

        egg.addEventListener('click', () => {
            if(isPlaying) {
                clearInterval(fallInterval);
                egg.remove();
                score++;
                scoreEl.innerText = score;
                checkGameState();
            }
        });
    }

    function checkGameState() {
        if (score >= 10) {
            endGame(true);
        } else if (missed >= 5) {
            endGame(false);
        }
    }

    function endGame(won) {
        isPlaying = false;
        clearInterval(gameInterval);
        startBtn.disabled = false;
        startBtn.innerText = "Play Again";
        if (won) {
            status.innerText = "You Won! Caught 10 eggs. +15 Reward Eggs 🎉";
            status.style.color = "#27ae60";
            onWin(15);
        } else {
            status.innerText = "Game Over. Missed too many eggs.";
            status.style.color = "#e74c3c";
        }
    }
}

// 5. Text Adventure
function initTextAdventure(onWin) {
    const textEl = document.getElementById('storyText');
    const choicesEl = document.getElementById('storyChoices');
    if (!textEl) return;

    let hasWon = false;

    function renderStory(situation) {
        textEl.innerText = situation.text;
        choicesEl.innerHTML = '';
        
        if (situation.win && !hasWon) {
            hasWon = true;
            onWin(15); // Reward 15 eggs
            choicesEl.innerHTML = '<button class="glass-btn story-btn" onclick="document.location.reload()">Reset Adventure</button>';
            return;
        }

        if (situation.fail) {
            choicesEl.innerHTML = '<button class="glass-btn story-btn" onclick="document.location.reload()">Start Over</button>';
            return;
        }

        situation.choices.forEach(c => {
            const btn = document.createElement('button');
            btn.classList.add('glass-btn', 'story-btn');
            btn.innerText = c.label;
            btn.addEventListener('click', () => {
                renderStory(storyData[c.nextId]);
            });
            choicesEl.appendChild(btn);
        });
    }

    const storyData = {
        start: {
            text: "You wake up in a blooming spring meadow. A rabbit path splits into two directions.",
            choices: [
                { label: "Go Left towards the dark forest.", nextId: "forest" },
                { label: "Go Right towards the sparkling river.", nextId: "river" }
            ]
        },
        forest: {
            text: "The forest is dark. A squirrel offers you a shiny acorn. Do you take it?",
            choices: [
                { label: "Take the acorn.", nextId: "squirrelPath" },
                { label: "Ignore the squirrel.", nextId: "forestFail" }
            ]
        },
        river: {
            text: "You reach the river, but the bridge is broken. A frog croaks nearby.",
            choices: [
                { label: "Listen to the frog.", nextId: "frogPath" },
                { label: "Swim across the cold river.", nextId: "swimFail" }
            ]
        },
        squirrelPath: {
            text: "The squirrel points to a hidden cave. Do you enter the cave or keep walking?",
            choices: [
                { label: "Enter the cave.", nextId: "caveWin" },
                { label: "Keep walking.", nextId: "forestFail" }
            ]
        },
        frogPath: {
            text: "The frog asks you a riddle: 'What comes once in a minute, twice in a moment, but never in a thousand years?'",
            choices: [
                { label: "The letter 'M'", nextId: "frogWin" },
                { label: "An egg", nextId: "frogFail" }
            ]
        },
        caveWin: {
            text: "Inside the cave, you find a Golden Egg! The Bunny is pleased. +15 Reward Eggs!",
            win: true
        },
        frogWin: {
            text: "The frog smiles and hops away, revealing a Golden Egg underneath! +15 Reward Eggs!",
            win: true
        },
        forestFail: {
            text: "You got hopelessly lost in the woods. You must go back.",
            fail: true
        },
        swimFail: {
            text: "The current was too strong! You got washed ashore back where you started.",
            fail: true
        },
        frogFail: {
            text: "The frog shakes its head. You fell asleep and missed Easter.",
            fail: true
        }
    };

    renderStory(storyData['start']);
}

// 6. Coding Sprint
function initCodingSprint(onWin) {
    const codeInput = document.getElementById('codeInput');
    const runBtn = document.getElementById('runCodeBtn');
    const feedback = document.getElementById('codeFeedback');
    if (!codeInput) return;

    let hasWon = false;

    runBtn.addEventListener('click', () => {
        if(hasWon) return;

        const codeStr = codeInput.value;
        // Basic static analysis check
        // The bug is 'for(let i=1;' instead of 'let i=0;'
        // We will just do a string check or an eval if it's safe (since it's user input, eval is risky)
        
        // Simulating syntax check via Function constructor safely testing against an array
        try {
            // Creating a safe wrapper
            const testFunc = new Function('items', codeStr + '\nreturn countEggs(items);');
            
            const testItems = ['egg', 'apple', 'egg', 'banana', 'egg'];
            const result = testFunc(testItems);
            
            if (result === 3) {
                feedback.innerText = "Success! The function returned 3 correctly. +20 Reward Eggs! 🎉";
                feedback.className = "code-feedback mt-2 code-success";
                onWin(20);
                hasWon = true;
                runBtn.disabled = true;
            } else {
                feedback.innerText = `Failed! Expected 3, but got ${result}. Hint: arrays are 0-indexed!`;
                feedback.className = "code-feedback mt-2 code-error";
            }
            
        } catch (err) {
            feedback.innerText = "Error: " + err.message;
            feedback.className = "code-feedback mt-2 code-error";
        }
    });
}

/* ========================================================================= */
/* Phase 6: Rewards Vault & Cards Generator                                    */
/* ========================================================================= */

function initRewards() {
    const rewardsGrid = document.getElementById('rewardsGrid');
    const vaultEggsCount = document.getElementById('vaultEggsCount');
    const vaultCoinsCount = document.getElementById('vaultCoinsCount');
    const emptyVaultMsg = document.getElementById('emptyVaultMsg');
    const confettiContainer = document.getElementById('confettiContainer');
    if (!rewardsGrid) return;

    let rewardEggs = parseInt(localStorage.getItem('eggstra_reward_eggs') || '0');
    let coins = parseInt(localStorage.getItem('eggstra_coins') || '100');

    function renderVault() {
        vaultEggsCount.innerText = rewardEggs;
        vaultCoinsCount.innerText = coins;
        
        rewardsGrid.innerHTML = '';
        if (rewardEggs > 0) {
            emptyVaultMsg.classList.add('hidden');
            for (let i = 0; i < rewardEggs; i++) {
                const egg = document.createElement('div');
                egg.classList.add('reward-egg');
                egg.innerText = '🥚';
                
                let clicks = 0;
                egg.addEventListener('click', () => {
                    clicks++;
                    if (clicks === 1) {
                        egg.classList.add('shake');
                        setTimeout(() => egg.classList.remove('shake'), 400);
                    } else if (clicks === 2) {
                        egg.classList.add('shake');
                        egg.innerText = '🐣'; // Almost there
                        setTimeout(() => egg.classList.remove('shake'), 400);
                    } else if (clicks === 3) {
                        // Crack it!
                        crackEgg(egg);
                    }
                });
                
                rewardsGrid.appendChild(egg);
            }
        } else {
            emptyVaultMsg.classList.remove('hidden');
            rewardsGrid.appendChild(emptyVaultMsg);
        }
    }

    function crackEgg(eggElement) {
        eggElement.remove();
        rewardEggs--;
        localStorage.setItem('eggstra_reward_eggs', rewardEggs);
        
        // Convert to coins (random between 5 and 15)
        const gainedCoins = Math.floor(Math.random() * 11) + 5;
        coins += gainedCoins;
        
        // Limit
        if(coins > 300) coins = 300;
        localStorage.setItem('eggstra_coins', coins);

        renderVault();
        fireConfetti(eggElement);
    }

    function fireConfetti(sourceElement) {
        if(!confettiContainer) return;
        
        const rect = sourceElement.getBoundingClientRect() || { left: window.innerWidth/2, top: window.innerHeight/2 };
        
        for (let i = 0; i < 30; i++) {
            const piece = document.createElement('div');
            piece.classList.add('confetti-piece');
            piece.style.left = `${Math.random() * 100}vw`;
            piece.style.top = `-50px`;
            
            const colors = ['#f7d070', '#a3e4d7', '#9b8beb', '#ff9a9e'];
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            const delay = Math.random() * 0.5;
            const duration = Math.random() * 1 + 1;
            piece.style.animationDelay = `${delay}s`;
            piece.style.animationDuration = `${duration}s`;
            
            confettiContainer.appendChild(piece);
            
            setTimeout(() => piece.remove(), (duration + delay) * 1000);
        }
    }

    renderVault();
}

function initCards() {
    const cardRecipient = document.getElementById('cardRecipient');
    const cardMessage = document.getElementById('cardMessage');
    const cardSender = document.getElementById('cardSender');
    const previewTo = document.getElementById('previewTo');
    const previewMsg = document.getElementById('previewMsg');
    const previewFrom = document.getElementById('previewFrom');
    const themeBtns = document.querySelectorAll('.theme-btn');
    const cardOutput = document.getElementById('cardOutput');
    const generateBtn = document.getElementById('generateCardBtn');

    if (!cardRecipient || !cardOutput) return;

    // Live Preview
    cardRecipient.addEventListener('input', (e) => {
        previewTo.innerText = e.target.value ? `Dear ${e.target.value},` : "Dear ...,";
    });

    cardMessage.addEventListener('input', (e) => {
        previewMsg.innerText = e.target.value || "Your message will appear here. Spread the joy of Easter!";
    });

    cardSender.addEventListener('input', (e) => {
        previewFrom.innerText = e.target.value ? `With Love, ${e.target.value}` : "With Love, ...";
    });

    // Theme Switch
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const theme = btn.getAttribute('data-theme');
            // Remove existing themes
            cardOutput.classList.remove('theme-spring', 'theme-elegant', 'theme-playful');
            cardOutput.classList.add(theme);
        });
    });

    // Action
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            alert('Your Easter card has been generated and is ready to print or share!');
        });
    }
}

// Dark Mode Global Utility
function initDarkMode() {
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'darkModeToggle';
    toggleBtn.className = 'glass-btn small-btn';
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.bottom = '20px';
    toggleBtn.style.right = '20px';
    toggleBtn.style.zIndex = '1000';
    toggleBtn.innerText = '🌙 Dark Mode';

    document.body.appendChild(toggleBtn);

    const savedMode = localStorage.getItem('eggstra_darkmode');
    if (savedMode === 'dark') {
        document.body.classList.add('dark-mode');
        toggleBtn.innerText = '☀️ Light Mode';
    }

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('eggstra_darkmode', 'dark');
            toggleBtn.innerText = '☀️ Light Mode';
        } else {
            localStorage.setItem('eggstra_darkmode', 'light');
            toggleBtn.innerText = '🌙 Dark Mode';
        }
    });
}
