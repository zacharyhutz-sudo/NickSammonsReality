# Mitosis Animation Archive (2026-02-11)

This file preserves the "Mitosis" / "Gooey" navigation animation code before it was simplified to a standard sticky pill.

## SVG Filter
```html
<svg style="visibility: hidden; position: absolute;" width="0" height="0">
    <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 60 -20" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
    </filter>
</svg>
```

## HTML Structure
```html
<div id="goo-wrapper" class="relative w-14 h-14">
    <div class="absolute top-0 right-0 w-14 h-[300px] pointer-events-none" style="filter: url('#goo');">
        <div id="mitosis-stub" class="absolute top-0 left-0 w-14 h-14 bg-white rounded-full origin-top"></div>
        <div id="mitosis-bridge" class="absolute top-7 left-1/2 -translate-x-1/2 w-8 bg-white opacity-0 origin-top" style="will-change: transform, height;"></div>
        
        <button id="nav-mother" class="nav-toggle absolute top-0 left-0 w-14 h-14 bg-white text-stone-900 rounded-full border border-stone-200 shadow-sm pointer-events-auto flex items-center justify-center transition-transform duration-75" style="will-change: transform;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>
    </div>
</div>
```

## Logic
```javascript
function updateMitosis() {
    const scrollY = window.scrollY;
    const breakDistance = 140;   

    if (scrollY > 0 && scrollY < breakDistance) {
        isSnapped = false;
        const tension = scrollY / breakDistance;
        const lagFactor = 0.85; 
        const visualY = scrollY * lagFactor;
        
        if (mother) {
            mother.style.opacity = '1';
            mother.style.transform = `translateY(${visualY}px)`;
        }
        if (stub) {
            stub.style.transform = 'scaleY(1)';
            stub.style.transition = 'none';
            stub.style.opacity = '1';
        }
        if (bridge) {
            bridge.style.opacity = '1';
            bridge.style.height = `${visualY}px`;
            bridge.style.width = `${32 * (1 - (tension * 0.5))}px`;
        }
        if (floatingNav) {
            floatingNav.style.opacity = '0';
            floatingNav.style.pointerEvents = 'none';
        }
    } else if (scrollY >= breakDistance) {
        if (!isSnapped) {
            isSnapped = true;
            if (bridge) bridge.style.opacity = '0';
            if (stub) {
                stub.style.transform = 'scaleY(0)';
                stub.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }
            if (floatingNav) {
                floatingNav.style.opacity = '1';
                floatingNav.style.pointerEvents = 'auto';
                floatingNav.animate([...], { duration: 400, easing: '...' });
            }
        }
        if (mother) mother.style.opacity = '0';
    } else {
        isSnapped = false;
        // ... Reset logic
    }
}
```
