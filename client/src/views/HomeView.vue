<template>
  <div class="bg-dark-purple min-h-screen relative overflow-hidden" style="color: #FBE4D8;">
    <div class="absolute inset-0 opacity-5">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#8B5CF6" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <LandingNavbar />

    <main class="relative z-10 min-h-screen flex items-center">
      <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="text-left">
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-8 animate-fade-in">
              <div class="w-2 h-2 bg-accent rounded-full animate-pulse mr-3"></div>
              <span class="text-sm font-medium" style="color: #FBE4D8;">Plataforma de Gestión #1</span>
            </div>

            <h1 class="text-6xl lg:text-7xl font-black mb-6 leading-tight animate-slide-up" style="color: #FBE4D8;">
              El <span style="color: #FBE4D8;">Futuro</span> del
              <br>Trabajo <span style="color: #FBE4D8;">Remoto</span>
            </h1>

            <p class="text-xl mb-8 max-w-lg leading-relaxed animate-slide-up animation-delay-200" style="color: #FBE4D8;">
              Revoluciona la forma en que tu equipo colabora. TeamFlow combina simplicidad con poder para crear experiencias de trabajo excepcionales.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up animation-delay-400">
              <RouterLink to="/login">
                <button class="group bg-accent hover:bg-accent/90 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-accent/25">
                  <span class="flex items-center justify-center gap-2">
                    Iniciar Sesión
                    <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </div>
                  </span>
                </button>
              </RouterLink>
              
              <a href="https://wa.me/18298143826" target="_blank" rel="noopener noreferrer">
                <button class="group border-2 border-secondary hover:bg-secondary font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300" style="color: #FBE4D8;">
                  <span class="flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    Contactar Desarrolladores
                  </span>
                </button>
              </a>
              </div>

            <div class="flex gap-8 animate-slide-up animation-delay-600">
              <div>
                <div class="text-3xl font-bold" style="color: #FBE4D8;">10K+</div>
                <div class="text-sm" style="color: #FBE4D8;">Equipos activos</div>
              </div>
              <div>
                <div class="text-3xl font-bold" style="color: #FBE4D8;">99.9%</div>
                <div class="text-sm" style="color: #FBE4D8;">Tiempo activo</div>
              </div>
              <div>
                <div class="text-3xl font-bold" style="color: #FBE4D8;">4.9★</div>
                <div class="text-sm" style="color: #FBE4D8;">Calificación</div>
              </div>
            </div>
          </div>

          <div class="relative animate-fade-in animation-delay-800">
            <div class="dashboard-mockup">
              <div class="bg-primary/40 backdrop-blur-xl rounded-3xl p-8 border border-accent/20 shadow-2xl">
                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center gap-3">
                    <div class="w-3 h-3 bg-accent rounded-full"></div>
                    <div class="w-3 h-3 bg-secondary rounded-full"></div>
                    <div class="w-3 h-3 bg-light-accent rounded-full"></div>
                  </div>
                  <div class="text-sm" style="color: #FBE4D8;">TeamFlow Interface</div>
                </div>

                <div class="space-y-4">
                  <div class="bg-dark-purple/50 rounded-xl p-4 border border-accent/10 pulse-card">
                    <div class="flex items-center justify-between mb-2">
                      <div class="text-sm font-medium" style="color: #FBE4D8;">Implementar CRM</div>
                      <div class="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    </div>
                    <div class="w-full bg-dark-purple rounded-full h-2 mb-2">
                      <div class="bg-accent h-2 rounded-full progress-bar" style="width: 75%"></div>
                    </div>
                    <div class="text-xs" style="color: #FBE4D8;">75% completado</div>
                  </div>

                  <div class="bg-dark-purple/50 rounded-xl p-4 border border-secondary/10 pulse-card animation-delay-200">
                    <div class="flex items-center justify-between mb-2">
                      <div class="text-sm font-medium" style="color: #FBE4D8;">Depurar Logs</div>
                      <div class="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                    </div>
                    <div class="w-full bg-dark-purple rounded-full h-2 mb-2">
                      <div class="bg-secondary h-2 rounded-full progress-bar" style="width: 45%"></div>
                    </div>
                    <div class="text-xs" style="color: #FBE4D8;">45% completado</div>
                  </div>

                  <div class="bg-dark-purple/50 rounded-xl p-4 border border-light-accent/10 pulse-card animation-delay-400">
                    <div class="flex items-center justify-between mb-2">
                      <div class="text-sm font-medium" style="color: #FBE4D8;">Configurar Servidor</div>
                      <div class="w-2 h-2 bg-light-accent rounded-full animate-pulse"></div>
                    </div>
                    <div class="w-full bg-dark-purple rounded-full h-2 mb-2">
                      <div class="bg-light-accent h-2 rounded-full progress-bar" style="width: 90%"></div>
                    </div>
                    <div class="text-xs" style="color: #FBE4D8;">90% completado</div>
                  </div>
                </div>

                <div class="flex items-center gap-2 mt-6">
                  <div class="text-xs mr-2" style="color: #FBE4D8;">Equipo:</div>
                  <div class="flex -space-x-2">
                    <div class="w-8 h-8 bg-accent rounded-full border-2 border-dark-purple flex items-center justify-center text-xs font-bold" style="color: #FBE4D8;">A</div>
                    <div class="w-8 h-8 bg-secondary rounded-full border-2 border-dark-purple flex items-center justify-center text-xs font-bold" style="color: #FBE4D8;">B</div>
                    <div class="w-8 h-8 bg-light-accent rounded-full border-2 border-dark-purple flex items-center justify-center text-xs font-bold" style="color: #FBE4D8;">C</div>
                    <div class="w-8 h-8 bg-accent/50 rounded-full border-2 border-dark-purple flex items-center justify-center text-xs" style="color: #FBE4D8;">+5</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <section class="relative py-32 bg-primary/20">
      <div class="container mx-auto px-6">
        <div class="text-center mb-20">
          <div class="inline-flex items-center px-6 py-3 rounded-full bg-secondary/20 border border-secondary/50 mb-6">
            <span class="text-base font-semibold" style="color: #FBE4D8;">¿Por qué TeamFlow?</span>
          </div>
          <h2 class="text-5xl font-bold mb-6" style="color: #FBE4D8;">
            Números que <span style="color: #FBE4D8;">Hablan</span>
          </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div class="text-center group">
            <div class="relative mb-6">
              <div class="w-24 h-24 bg-accent/10 rounded-3xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div class="text-4xl font-black counter" data-target="64" style="color: #FBE4D8;">0</div>
                <div class="text-xl font-bold ml-1" style="color: #FBE4D8;">%</div>
              </div>

            </div>
            <h3 class="text-xl font-bold mb-3" style="color: #FBE4D8;">Proyectos Exitosos</h3>
            <p class="leading-relaxed" style="color: #FBE4D8;">Los proyectos ágiles tienen una tasa de éxito del 64% vs 49% de metodologías tradicionales</p>
          </div>

          <div class="text-center group">
            <div class="relative mb-6">
              <div class="w-24 h-24 bg-secondary/10 rounded-3xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div class="text-4xl font-black counter" data-target="13" style="color: #FBE4D8;">0</div>
                <div class="text-xl font-bold ml-1" style="color: #FBE4D8;">%</div>
              </div>

            </div>
            <h3 class="text-xl font-bold mb-3" style="color: #FBE4D8;">Más Productividad</h3>
            <p class="leading-relaxed" style="color: #FBE4D8;">El trabajo remoto puede aumentar la productividad hasta un 13% según estudios</p>
          </div>

          <div class="text-center group">
            <div class="relative mb-6">
              <div class="w-24 h-24 bg-light-accent/10 rounded-3xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div class="text-4xl font-black counter" data-target="94" style="color: #FBE4D8;">0</div>
                <div class="text-xl font-bold ml-1" style="color: #FBE4D8;">%</div>
              </div>

            </div>
            <h3 class="text-xl font-bold mb-3" style="color: #FBE4D8;">Satisfacción Laboral</h3>
            <p class="leading-relaxed" style="color: #FBE4D8;">De los empleadores creen que la productividad se mantiene o mejora con trabajo remoto</p>
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-32">
      <div class="container mx-auto px-6 text-center">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-6xl font-black mb-8" style="color: #FBE4D8;">
            Únete a la <span style="color: #FBE4D8;">Revolución</span>
          </h2>
          <p class="text-2xl mb-16 leading-relaxed" style="color: #FBE4D8;">
            Miles de equipos ya transformaron su forma de trabajar
          </p>

          <div class="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-2xl flex items-center justify-center">
                <svg class="w-8 h-8" fill="none" stroke="#FBE4D8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div class="text-sm font-medium" style="color: #FBE4D8;">Setup Instantáneo</div>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-2xl flex items-center justify-center">
                <svg class="w-8 h-8" fill="none" stroke="#FBE4D8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <div class="text-sm font-medium" style="color: #FBE4D8;">100% Seguro</div>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-light-accent/10 rounded-2xl flex items-center justify-center">
                <svg class="w-8 h-8" fill="none" stroke="#FBE4D8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 110 19.5 9.75 9.75 0 010-19.5z"></path>
                </svg>
              </div>
              <div class="text-sm font-medium" style="color: #FBE4D8;">Soporte 24/7</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="border-t border-accent/20 py-12">
      <div class="container mx-auto px-6 text-center">
        <div class="flex items-center justify-center gap-4 mb-6">
          <div class="w-12 h-0.5 bg-accent rounded-full"></div>
          <span class="font-medium" style="color: #FBE4D8;">TeamFlow</span>
          <div class="w-12 h-0.5 bg-accent rounded-full"></div>
        </div>
        <p class="text-sm" style="color: #FBE4D8;">&copy; 2025 TeamFlow. El futuro del trabajo remoto.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import LandingNavbar from '@/components/LandingNavbar.vue';
import { RouterLink } from 'vue-router';
import { onMounted } from 'vue';

onMounted(() => {
  // Contadores animados
  const counters = document.querySelectorAll('.counter');
  
  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const increment = target / 60;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 30);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  counters.forEach(counter => {
    counter.textContent = '0';
    observer.observe(counter);
  });

  // Animación de las barras de progreso
  const progressBars = document.querySelectorAll('.progress-bar');
  progressBars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.transform = 'scaleX(1)';
    }, (index + 1) * 200);
  });
});
</script>

<style scoped>
/* Animaciones */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
}

/* Clases de animación */
.animate-fade-in { animation: fadeIn 1s ease-out forwards; }
.animate-slide-up { animation: slideUp 0.8s ease-out forwards; }
.pulse-card { animation: pulse 2s ease-in-out infinite; }

/* Delays */
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-300 { animation-delay: 0.3s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-600 { animation-delay: 0.6s; }
.animation-delay-800 { animation-delay: 0.8s; }

/* Efectos especiales */
.progress-bar {
  transform-origin: left;
  transform: scaleX(0);
  transition: transform 1s ease-out;
}

.dashboard-mockup {
  transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
  transition: transform 0.5s ease;
}

.dashboard-mockup:hover {
  transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
}

/* Responsivo */
@media (max-width: 1024px) {
  .text-6xl { font-size: 3.5rem; }
  .text-7xl { font-size: 4rem; }
}

@media (max-width: 768px) {
  .text-6xl { font-size: 2.5rem; }
  .text-7xl { font-size: 3rem; }
  .dashboard-mockup { transform: none; }
}
</style>