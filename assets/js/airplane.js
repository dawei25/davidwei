// Standalone paper airplane animation script

document.addEventListener('DOMContentLoaded', () => {
    console.log('Airplane script loaded');
    
    const airplanesContainer = document.getElementById('airplanes-container');
    const plane = document.querySelector('.plane');
    
    if (!airplanesContainer || !plane) {
        console.error('Airplane elements not found!');
        return;
    }
    
    console.log('Airplane elements found:', airplanesContainer, plane);
    
    // Clear any existing styles to start fresh
    airplanesContainer.removeAttribute('style');
    
    // Set initial styles directly
    Object.assign(airplanesContainer.style, {
        position: 'fixed',
        width: '80px',
        height: '80px',
        zIndex: '999',
        pointerEvents: 'none',
        left: '-5vw', // Start off-screen to the left
        top: '30vh',  // Start in the upper section of the screen
        transform: 'translate(-50%, -50%) rotate(15deg)',
        transition: 'none'
    });
    
    // Top section boundaries (where the clouds are)
    const TOP_BOUND = 15;     // vh units - top boundary
    const BOTTOM_BOUND = 45;  // vh units - bottom boundary
    const LEFT_BOUND = 5;     // vw units - left boundary
    const RIGHT_BOUND = 95;   // vw units - right boundary
    
    // Variables for animation
    let posX = -5; // Start off-screen
    let posY = 30; // Start in the upper third of the screen
    let velX = 3;  // Initial right movement
    let velY = 0;  // No vertical movement initially
    let rotation = 15; // Initial rotation pointing right
    let frameCount = 0;
    let timeAlive = 0;
    let isVisible = true;
    
    // Wind simulation with smoother, slower cycles
    let windX = 0.02;
    let windY = 0;
    let windAngle = 0;
    let turbulence = 0;
    
    // Entry animation state
    let isEntryAnimation = true;
    
    function update() {
        // Increment time
        timeAlive += 1/60; // Approximately equivalent to seconds
        
        // Update wind patterns with smooth sinusoidal patterns
        // This creates gentle wave-like motion
        windAngle += 0.005; // Very slow wind changes
        windY = Math.sin(windAngle) * 0.02; // Gentle vertical wind
        windX = Math.cos(windAngle * 0.7) * 0.01; // Even gentler horizontal wind
        
        // Smooth turbulence that changes over time
        turbulence = (Math.sin(timeAlive * 0.8) * 0.3) + 0.1;
        
        // Check if we should hide the airplane based on scroll position
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('.l-header').offsetHeight || 0;
        const homeHeight = document.querySelector('#home').offsetHeight || 0;
        const hideThreshold = headerHeight + homeHeight * 0.7;
        
        // Hide when scrolled past threshold
        if (scrollPosition > hideThreshold && isVisible) {
            airplanesContainer.style.opacity = '0';
            airplanesContainer.style.transition = 'opacity 0.5s ease';
            isVisible = false;
        } 
        // Show when scrolled back to top section
        else if (scrollPosition <= hideThreshold && !isVisible) {
            airplanesContainer.style.opacity = '1';
            isVisible = true;
        }
        
        // If hidden, still update position but don't render
        if (!isVisible) {
            requestAnimationFrame(update);
            return;
        }
        
        // Handle entry animation
        if (isEntryAnimation) {
            if (posX > 20) {
                isEntryAnimation = false;
            } else {
                // Smooth entry with deceleration
                velX = Math.max(1, velX * 0.995);
            }
        }
        
        // Very slight random movement for natural motion (reduced)
        velX += (Math.random() * 0.01 - 0.005) + windX;
        velY += (Math.random() * 0.01 - 0.005) + windY;
        
        // Apply gentle gravity - much softer than before
        velY += 0.008;
        
        // Add slight uplift when moving forward (like a real paper plane)
        if (Math.abs(velX) > 0.5) {
            velY -= Math.abs(velX) * 0.01;
        }
        
        // Update position based on velocity (scaled down for smoother movement)
        posX += velX * 0.06;
        posY += velY * 0.06;
        
        // Bound checking - keep within the top section
        if (posX > RIGHT_BOUND) {
            posX = RIGHT_BOUND;
            velX = -Math.abs(velX) * 0.8; // Bounce off right edge
            velY -= 0.1; // Add slight upward lift
        } else if (posX < LEFT_BOUND) {
            posX = LEFT_BOUND;
            velX = Math.abs(velX) * 0.8; // Bounce off left edge
            velY -= 0.1; // Add slight upward lift
        }
        
        if (posY > BOTTOM_BOUND) {
            posY = BOTTOM_BOUND;
            velY = -Math.abs(velY) * 0.8; // Bounce off bottom with stronger rebound
        } else if (posY < TOP_BOUND) {
            posY = TOP_BOUND;
            velY = Math.abs(velY) * 0.6; // Bounce off top
        }
        
        // Update rotation based on movement direction with smoother transitions
        // This creates a natural tilting motion based on direction
        const targetRotation = velX * 8 + (velY * -3);
        rotation = rotation * 0.95 + targetRotation * 0.05; // Smoother rotation transitions
        
        // Add slight wobble/flutter - very gentle
        rotation += Math.sin(timeAlive * 2) * turbulence;
        
        // Apply air resistance
        velX *= 0.995;
        velY *= 0.995;
        
        // Apply speed limits - reduced for smoother motion
        velX = Math.max(-4, Math.min(4, velX));
        velY = Math.max(-3, Math.min(3, velY));
        
        // If plane gets too slow, give it a gentle nudge
        const speed = Math.sqrt(velX * velX + velY * velY);
        if (speed < 0.5 && !isEntryAnimation && frameCount % 90 === 0) {
            // Nudge primarily in horizontal direction
            velX += (Math.random() * 0.6) + 0.2;
            // Smaller vertical nudge
            velY += (Math.random() * 0.2) - 0.1;
        }
        
        // Apply position to DOM
        airplanesContainer.style.left = `${posX}vw`;
        airplanesContainer.style.top = `${posY}vh`;
        airplanesContainer.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        
        // Log position occasionally for debugging
        frameCount++;
        if (frameCount % 300 === 0) {
            console.log(`Airplane at: X:${posX.toFixed(1)}vw, Y:${posY.toFixed(1)}vh, Rotation:${rotation.toFixed(1)}°`);
        }
        
        // Continue animation
        requestAnimationFrame(update);
    }
    
    // Start animation
    console.log('Starting airplane animation');
    requestAnimationFrame(update);
    
    // Mouse interaction - kept but with reduced effect
    document.addEventListener('mousemove', (e) => {
        if (!isVisible) return; // Skip if airplane is hidden
        
        const mouseX = (e.clientX / window.innerWidth) * 100;
        const mouseY = (e.clientY / window.innerHeight) * 100;
        
        const distX = mouseX - posX;
        const distY = mouseY - posY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance < 15) {
            // Push away from mouse when close (reduced effect)
            velX -= distX * 0.01;
            velY -= distY * 0.01;
        }
    });
}); 